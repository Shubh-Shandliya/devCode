import { useEffect } from 'react'
import type { MutableRefObject } from 'react'

type InteractiveTextProps = {
  /** Word tokens (e.g. headline parts) */
  parts: string[]
  /** Filled with one ref per word; parent passes stable ref object */
  wordsRef: MutableRefObject<(HTMLElement | null)[]>
  idPrefix: string
  /** Offset into the shared wordsRef array (for combining multiple text blocks). */
  startIndex?: number
  className?: string
}

/**
 * Renders words as inline-block spans so each can receive independent transforms.
 * Refs are registered only via callbacks (no layout reset) so assignments are not cleared.
 */
export function InteractiveText({
  parts,
  wordsRef,
  idPrefix,
  startIndex = 0,
  className,
}: InteractiveTextProps) {
  useEffect(() => {
    const need = startIndex + parts.length
    if (wordsRef.current.length < need) {
      wordsRef.current.length = need
    }
  }, [parts.length, startIndex, wordsRef])

  return (
    <span className={className}>
      {parts.map((word, index) => (
        <span
          key={`${idPrefix}-${word}-${index}`}
          ref={(el) => {
            wordsRef.current[startIndex + index] = el
          }}
          className="interactive-word"
        >
          {word}
        </span>
      ))}
    </span>
  )
}
