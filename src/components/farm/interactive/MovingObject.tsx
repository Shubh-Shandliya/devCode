import { useEffect, useRef, type MutableRefObject } from 'react'
import type { ObjectPose } from '../../../hooks/useInteractionEngine'
import { useInteractiveScene } from './useInteractiveScene'

type MovingObjectProps = {
  variant: 'tractor' | 'cow'
  objectPoseRef: MutableRefObject<ObjectPose | null>
  reduceMotion: boolean
  className?: string
}

function TractorGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 40"
      width="72"
      height="45"
      aria-hidden="true"
      focusable="false"
    >
      <title>Tractor</title>
      <path
        fill="currentColor"
        d="M4 28h12l4-10h18v10h8l2-6h10v14H4V28zm8-14l-2 8h10l2-8H12zm20 0v8h14v-8H32z"
        opacity="0.92"
      />
      <circle cx="14" cy="34" r="5" fill="#1a1f26" />
      <circle cx="46" cy="34" r="5" fill="#1a1f26" />
      <circle cx="56" cy="18" r="3" fill="#f2cb15" opacity="0.85" />
    </svg>
  )
}

function CowGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 48"
      width="80"
      height="54"
      aria-hidden="true"
      focusable="false"
    >
      <title>Cow</title>
      <ellipse cx="36" cy="30" rx="22" ry="14" fill="currentColor" opacity="0.9" />
      <circle cx="52" cy="22" r="10" fill="currentColor" opacity="0.92" />
      <ellipse cx="58" cy="18" rx="3" ry="2" fill="#1a1f26" opacity="0.5" />
      <rect x="18" y="38" width="5" height="8" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="30" y="40" width="5" height="8" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="42" y="40" width="5" height="8" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="52" y="38" width="5" height="8" rx="1" fill="currentColor" opacity="0.75" />
    </svg>
  )
}

export function MovingObject({ variant, objectPoseRef, reduceMotion, className }: MovingObjectProps) {
  const { containerRef } = useInteractiveScene()
  const elRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const t0Ref = useRef(0)

  useEffect(() => {
    const el = elRef.current
    const container = containerRef.current
    if (!el || !container) return

    const setPose = (x: number, y: number, w: number, h: number) => {
      el.style.transform = `translate3d(${x}px,${y}px,0)`
      objectPoseRef.current = { cx: x + w / 2, cy: y + h / 2 }
    }

    if (reduceMotion) {
      const place = () => {
        const cw = container.clientWidth
        const ch = container.clientHeight
        const w = el.offsetWidth || 72
        const h = el.offsetHeight || 45
        const x = Math.max(8, cw * 0.35 - w / 2)
        const y = Math.max(8, ch * 0.35 - h / 2)
        setPose(x, y, w, h)
      }
      place()
      const id = requestAnimationFrame(place)
      return () => {
        cancelAnimationFrame(id)
        objectPoseRef.current = null
      }
    }

    t0Ref.current = performance.now()

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick)
      const c = containerRef.current
      const node = elRef.current
      if (!c || !node) return

      const cw = c.clientWidth
      const ch = c.clientHeight
      const w = node.offsetWidth || 1
      const h = node.offsetHeight || 1
      const t = (now - t0Ref.current) / 1000

      if (variant === 'tractor') {
        const period = 12
        const progress = (t / period) % 1
        const margin = 12
        const travel = Math.max(margin * 2, cw - w - margin * 2)
        const x = margin + progress * travel
        const yBase = ch * 0.38 - h * 0.5
        const y = yBase + Math.sin(t * 4.2) * 7 + Math.sin(t * 1.1) * 3
        setPose(x, Math.max(margin, Math.min(ch - h - margin, y)), w, h)
      } else {
        const ox = cw * 0.48 - w / 2
        const oy = ch * 0.42 - h / 2
        const ax = Math.max(40, cw * 0.28)
        const ay = Math.max(30, ch * 0.18)
        const x = ox + Math.sin(t * 0.55) * ax + Math.sin(t * 1.7) * 12
        const y = oy + Math.cos(t * 0.38) * ay + Math.sin(t * 2.1) * 8
        const margin = 8
        setPose(
          Math.max(margin, Math.min(cw - w - margin, x)),
          Math.max(margin, Math.min(ch - h - margin, y)),
          w,
          h,
        )
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      objectPoseRef.current = null
    }
  }, [variant, reduceMotion, containerRef, objectPoseRef])

  return (
    <div
      ref={elRef}
      className={`interactive-moving-object pointer-events-none absolute left-0 top-0 z-[5] text-[#f2cb15] drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] will-change-transform ${className ?? ''}`}
      aria-hidden="true"
    >
      {variant === 'tractor' ? <TractorGlyph /> : <CowGlyph />}
    </div>
  )
}
