import { createContext, type RefObject } from 'react'

export type InteractiveSceneContextValue = {
  containerRef: RefObject<HTMLDivElement | null>
}

export const InteractiveSceneContext = createContext<InteractiveSceneContextValue | null>(null)

