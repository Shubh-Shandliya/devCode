import { useContext } from 'react'
import { InteractiveSceneContext } from './interactiveSceneContext'

export function useInteractiveScene() {
  const ctx = useContext(InteractiveSceneContext)
  if (!ctx) {
    throw new Error('useInteractiveScene must be used within SceneWrapper')
  }
  return ctx
}
