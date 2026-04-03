import { useRef, type ReactNode } from 'react'
import { InteractiveSceneContext } from './interactiveSceneContext'

type SceneWrapperProps = {
  children: ReactNode
  className?: string
  'aria-label'?: string
}

export function SceneWrapper({ children, className, 'aria-label': ariaLabel }: SceneWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <InteractiveSceneContext.Provider value={{ containerRef }}>
      <div
        ref={containerRef}
        className={className}
        aria-label={ariaLabel}
        data-interactive-scene
      >
        {children}
      </div>
    </InteractiveSceneContext.Provider>
  )
}
