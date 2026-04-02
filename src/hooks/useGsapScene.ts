import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapScene(
  setup: () => gsap.core.Tween | gsap.core.Timeline | void,
  deps: unknown[] = [],
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return

    const context = gsap.context(() => {
      setup()
    })

    return () => {
      context.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps])
}
