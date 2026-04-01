import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

type Parsed = {
  prefix: string
  num: number
  suffix: string
}

/** Parses common portfolio stat strings for count-up animation. */
function parseStat(value: string): Parsed | null {
  const t = value.trim()
  if (!t) return null

  if (t.startsWith('<')) {
    const m = t.match(/^<(\d+)(.*)$/)
    if (m) return { prefix: '<', num: Number(m[1]), suffix: m[2] }
    return null
  }

  const m = t.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  if (!m) return null
  const [, pre, numStr, suf] = m
  const num = Number(numStr)
  if (!Number.isFinite(num)) return null
  return { prefix: pre, num, suffix: suf }
}

type AnimatedStatProps = {
  value: string
  className?: string
}

/** Counts from 0 to the numeric part when the element scrolls into view (once). */
export function AnimatedStat({ value, className }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.35, margin: '0px 0px -10% 0px' })
  const parsed = useMemo(() => parseStat(value), [value])
  const [display, setDisplay] = useState(0)
  const ran = useRef(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!parsed || ran.current) return
    if (!isInView) return
    ran.current = true
    const controls = animate(0, parsed.num, {
      duration: reduceMotion ? 0 : 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, parsed, reduceMotion])

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  )
}
