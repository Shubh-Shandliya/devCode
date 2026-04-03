import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined') return () => {}
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => (typeof window === 'undefined' ? false : window.matchMedia(query).matches),
    () => serverFallback,
  )
}

/** Live inner width for scroll-distance math (e.g. horizontal tracks). */
export function useViewportInnerWidth() {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined') return () => {}
      window.addEventListener('resize', onChange)
      return () => window.removeEventListener('resize', onChange)
    },
    () => (typeof window === 'undefined' ? 1200 : window.innerWidth),
    () => 1200,
  )
}
