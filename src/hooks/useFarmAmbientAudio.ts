import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Loops ambient audio when enabled; pauses on disable and on unmount.
 * Play is triggered from user gesture (toggle click) so autoplay policies are satisfied.
 */
export function useFarmAmbientAudio(
  audioRef: RefObject<HTMLAudioElement | null>,
  enabled: boolean,
  volume = 0.28,
) {
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.volume = volume
  }, [audioRef, volume])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    if (enabled) {
      void el.play().catch(() => {
        /* blocked or not ready */
      })
    } else {
      el.pause()
      el.currentTime = 0
    }

    return () => {
      el.pause()
    }
  }, [enabled, audioRef])
}
