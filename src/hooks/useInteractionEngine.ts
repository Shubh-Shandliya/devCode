import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import type { RefObject } from 'react'

export type ObjectPose = {
  /** Object center X in container-local pixels */
  cx: number
  /** Object center Y in container-local pixels */
  cy: number
}

export type InteractionEngineConfig = {
  /** Distance at which interaction reaches zero (px) */
  radius: number
  /** Max displacement away from object (px) */
  maxPush: number
  /** Scale reduction at full strength (e.g. 0.08 → scale 0.92) */
  maxScaleDelta?: number
  /** Minimum opacity when fully influenced */
  opacityMin?: number
  /** Max skew in degrees for “cut” feel */
  skewMaxDeg?: number
  /** Max blur px when influenced */
  distortBlurPx?: number
}

const defaultConfig: Required<InteractionEngineConfig> = {
  radius: 160,
  maxPush: 32,
  maxScaleDelta: 0.08,
  opacityMin: 0.55,
  skewMaxDeg: 0,
  distortBlurPx: 0,
}

const defaultCursorConfig: Required<InteractionEngineConfig> = {
  radius: 120,
  maxPush: 22,
  maxScaleDelta: 0.06,
  opacityMin: 0.7,
  skewMaxDeg: 0,
  distortBlurPx: 0.0,
}

function smoothstep01(t: number) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

function mergeConfig(c: InteractionEngineConfig): Required<InteractionEngineConfig> {
  return { ...defaultConfig, ...c }
}

/**
 * Distance-based word repulsion driven by a moving object pose.
 * Updates word DOM styles in rAF (no React state per frame).
 * Word centers are cached; remeasure on resize, scroll, and container resize.
 */
export function useInteractionEngine(options: {
  containerRef: RefObject<HTMLElement | null>
  objectPoseRef: RefObject<ObjectPose | null>
  wordRefsRef: RefObject<(HTMLElement | null)[]>
  enabled: boolean
  config: InteractionEngineConfig
  cursorPoseRef?: RefObject<ObjectPose | null>
  cursorConfig?: InteractionEngineConfig
}) {
  const { containerRef, objectPoseRef, wordRefsRef, enabled, config, cursorPoseRef, cursorConfig } = options
  const fullRef = useRef(mergeConfig(config))
  useLayoutEffect(() => {
    fullRef.current = mergeConfig(config)
  }, [config])

  const fullCursorRef = useRef<Required<InteractionEngineConfig>>(
    mergeConfig({ ...defaultCursorConfig, ...(cursorConfig ?? {}) }),
  )
  useLayoutEffect(() => {
    fullCursorRef.current = mergeConfig({ ...defaultCursorConfig, ...(cursorConfig ?? {}) })
  }, [cursorConfig])

  const centersRef = useRef<{ cx: number; cy: number }[]>([])
  const rafRef = useRef<number>(0)
  const remeasureScheduled = useRef(false)

  const remeasure = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const cr = container.getBoundingClientRect()
    const refs = wordRefsRef.current
    const next: { cx: number; cy: number }[] = []
    for (let i = 0; i < refs.length; i++) {
      const el = refs[i]
      if (!el) {
        next.push({ cx: 0, cy: 0 })
        continue
      }
      const wr = el.getBoundingClientRect()
      next.push({
        cx: wr.left + wr.width / 2 - cr.left,
        cy: wr.top + wr.height / 2 - cr.top,
      })
    }
    centersRef.current = next
  }, [containerRef, wordRefsRef])

  const scheduleRemeasure = useCallback(() => {
    if (remeasureScheduled.current) return
    remeasureScheduled.current = true
    requestAnimationFrame(() => {
      remeasureScheduled.current = false
      remeasure()
    })
  }, [remeasure])

  useEffect(() => {
    if (!enabled) return
    void document.fonts.ready.then(() => scheduleRemeasure())
  }, [enabled, scheduleRemeasure])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ro = new ResizeObserver(() => scheduleRemeasure())
    ro.observe(container)
    window.addEventListener('resize', scheduleRemeasure)
    window.addEventListener('scroll', scheduleRemeasure, { passive: true, capture: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', scheduleRemeasure)
      window.removeEventListener('scroll', scheduleRemeasure, { capture: true })
    }
  }, [containerRef, scheduleRemeasure])

  useEffect(() => {
    const refs = wordRefsRef.current
    const resetWords = () => {
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i]
        if (!el) continue
        el.style.transform = ''
        el.style.opacity = ''
        el.style.filter = ''
      }
    }

    if (!enabled) {
      resetWords()
      return
    }

    scheduleRemeasure()

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      const objectPose = objectPoseRef.current
      const cursorPose = cursorPoseRef?.current ?? null
      const centers = centersRef.current
      const wordEls = wordRefsRef.current
      if (centers.length === 0 || wordEls.length === 0) return

      const objectPoseEnabled = Boolean(objectPose)
      const cursorPoseEnabled = Boolean(cursorPose)
      if (!objectPoseEnabled && !cursorPoseEnabled) {
        resetWords()
        return
      }

      const { radius: oradius, maxPush: oMaxPush, maxScaleDelta: oMaxScaleDelta, opacityMin: oOpacityMin, skewMaxDeg: oSkewMaxDeg, distortBlurPx: oDistortBlurPx } =
        fullRef.current
      const {
        radius: cradius,
        maxPush: cMaxPush,
        maxScaleDelta: cMaxScaleDelta,
        opacityMin: cOpacityMin,
        skewMaxDeg: cSkewMaxDeg,
        distortBlurPx: cDistortBlurPx,
      } = fullCursorRef.current

      for (let i = 0; i < wordEls.length; i++) {
        const el = wordEls[i]
        if (!el) continue
        const c = centers[i]
        if (!c) continue

        let bestT = 0
        let bestNx = 0
        let bestNy = 0

        // Object influence
        if (objectPoseEnabled && objectPose) {
          const ox = objectPose.cx
          const oy = objectPose.cy
          let dx = c.cx - ox
          let dy = c.cy - oy
          let dist = Math.hypot(dx, dy)
          if (dist < 1e-6) {
            dx = 1
            dy = 0
            dist = 1
          }
          const t = dist < oradius ? 1 - smoothstep01(dist / oradius) : 0
          if (t > bestT) {
            bestT = t
            bestNx = dx / dist
            bestNy = dy / dist
          }
        }

        // Cursor influence
        if (cursorPoseEnabled && cursorPose) {
          const cx = cursorPose.cx
          const cy = cursorPose.cy
          let dx = c.cx - cx
          let dy = c.cy - cy
          let dist = Math.hypot(dx, dy)
          if (dist < 1e-6) {
            dx = 1
            dy = 0
            dist = 1
          }
          const t = dist < cradius ? 1 - smoothstep01(dist / cradius) : 0
          if (t > bestT) {
            bestT = t
            bestNx = dx / dist
            bestNy = dy / dist
          }
        }

        if (bestT <= 0) {
          el.style.transform = ''
          el.style.opacity = ''
          el.style.filter = ''
          continue
        }

        // Choose params based on which pose is stronger for this word.
        // We do this by recomputing t for object/cursor with their respective radii.
        let tObj = 0
        let tCursor = 0
        if (objectPoseEnabled && objectPose) {
          const ox = objectPose.cx
          const oy = objectPose.cy
          const dist = Math.hypot(c.cx - ox, c.cy - oy)
          tObj = dist < oradius ? 1 - smoothstep01(dist / oradius) : 0
        }
        if (cursorPoseEnabled && cursorPose) {
          const cx = cursorPose.cx
          const cy = cursorPose.cy
          const dist = Math.hypot(c.cx - cx, c.cy - cy)
          tCursor = dist < cradius ? 1 - smoothstep01(dist / cradius) : 0
        }

        const useCursor = tCursor > tObj
        const maxPush = useCursor ? cMaxPush : oMaxPush
        const maxScaleDelta = useCursor ? cMaxScaleDelta : oMaxScaleDelta
        const opacityMin = useCursor ? cOpacityMin : oOpacityMin
        const skewMaxDeg = useCursor ? cSkewMaxDeg : oSkewMaxDeg
        const distortBlurPx = useCursor ? cDistortBlurPx : oDistortBlurPx

        const push = maxPush * bestT
        const tx = bestNx * push
        const ty = bestNy * push
        const scale = 1 - maxScaleDelta * bestT
        const opacity = 1 - (1 - opacityMin) * bestT
        const skew = skewMaxDeg * bestT * Math.sign(bestNy || 1)
        const blur = distortBlurPx * bestT

        el.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0) scale(${scale.toFixed(4)}) skewX(${skew.toFixed(3)}deg)`
        el.style.opacity = String(opacity)
        el.style.filter = blur > 0 ? `blur(${blur.toFixed(2)}px)` : ''
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      resetWords()
    }
  }, [enabled, objectPoseRef, cursorPoseRef, wordRefsRef, scheduleRemeasure, containerRef])
}
