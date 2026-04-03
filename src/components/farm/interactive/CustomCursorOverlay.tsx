import { useEffect, useRef, type MutableRefObject } from 'react'
import type { ObjectPose } from '../../../hooks/useInteractionEngine'

type CursorVariant = 'sheep' | 'tractor'

export function CustomCursorOverlay({
  variant,
  active,
  poseRef,
}: {
  variant: CursorVariant
  active: boolean
  poseRef: MutableRefObject<ObjectPose | null>
}) {
  const elRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      const pos = poseRef.current
      if (!pos) return

      // Deterministic placement: poseRef is container-local.
      // We translate from the stage's top-left and center the icon.
      const size = 56
      el.style.transform = `translate3d(${(pos.cx - size / 2).toFixed(2)}px,${(pos.cy - size / 2).toFixed(
        2,
      )}px,0)`
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [poseRef])

  return (
    <div
      ref={elRef}
      className="pointer-events-none absolute z-[60] text-[#f2cb15] transition-opacity duration-150"
      style={{
        opacity: active ? 1 : 0,
        width: 56,
        height: 56,
        left: 0,
        top: 0,
        transform: 'translate3d(0px,0px,0)',
      }}
      aria-hidden="true"
    >
      {variant === 'sheep' ? <SheepCursor /> : <TractorCursor />}
    </div>
  )
}

function TractorCursor() {
  return (
    <svg viewBox="0 0 64 40" width="56" height="56" aria-hidden="true" focusable="false">
      <path fill="currentColor" opacity="0.95" d="M4 28h12l4-10h18v10h8l2-6h10v14H4V28zm8-14l-2 8h10l2-8H12zm20 0v8h14v-8H32z" />
      <circle cx="14" cy="34" r="5" fill="rgba(4,9,15,0.6)" />
      <circle cx="46" cy="34" r="5" fill="rgba(4,9,15,0.6)" />
      <circle cx="56" cy="18" r="3" fill="#f2cb15" opacity="0.85" />
    </svg>
  )
}

function SheepCursor() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" focusable="false">
      <ellipse cx="28" cy="30" rx="18" ry="14" fill="currentColor" opacity="0.9" />
      <circle cx="36" cy="27" r="4.2" fill="rgba(4,9,15,0.65)" />
      <path
        d="M16 36c-4-8 0-20 10-24 10-4 22 2 26 12 2 6-1 14-8 19-10 7-22 1-28-7z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* wool */}
      <path d="M10 26c2-10 18-18 28-8 8 9-1 23-10 23-8 0-20-6-18-15z" fill="currentColor" opacity="0.6" />
      {/* legs */}
      <path d="M20 48c-2 3-2 8 1 10 3 2 7-1 7-4 0-4-2-8-8-6z" fill="currentColor" opacity="0.55" />
      <path d="M34 47c-2 3-1 8 2 10 3 1 7-2 7-5 0-4-2-7-9-5z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

