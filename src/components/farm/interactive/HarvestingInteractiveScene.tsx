import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { FarmScene } from '../../../data/farmStoryContent'
import { useInteractionEngine, type ObjectPose } from '../../../hooks/useInteractionEngine'
import { InteractiveText } from './InteractiveText'
import { CustomCursorOverlay } from './CustomCursorOverlay'
import { useInteractiveScene } from './useInteractiveScene'
import { SceneWrapper } from './SceneWrapper'

type HarvestingInteractiveSceneProps = {
  scene: FarmScene
  index: number
  isLast?: boolean
  reduceMotion: boolean
}

function HarvestingInteractiveBody({ scene, reduceMotion }: { scene: FarmScene; reduceMotion: boolean }) {
  const { containerRef } = useInteractiveScene()
  const objectPoseRef = useRef<ObjectPose | null>(null)
  const cursorPoseRef = useRef<ObjectPose | null>(null)
  const [cursorActive, setCursorActive] = useState(false)
  const wordRefsRef = useRef<(HTMLElement | null)[]>([])
  const titleParts = scene.headlineParts?.length ? scene.headlineParts : scene.title.split(' ')
  const captionParts = scene.caption.split(' ')
  const captionStartIndex = titleParts.length

  const engineConfig = useMemo(
    () => ({
      radius: 200,
      maxPush: 44,
      maxScaleDelta: 0.1,
      opacityMin: 0.5,
      skewMaxDeg: 6,
      distortBlurPx: 0.45,
    }),
    [],
  )

  const cursorConfig = useMemo(
    () => ({
      radius: 140,
      maxPush: 24,
      maxScaleDelta: 0.05,
      opacityMin: 0.72,
      skewMaxDeg: 0,
      distortBlurPx: 0.1,
    }),
    [],
  )

  useInteractionEngine({
    containerRef,
    objectPoseRef,
    cursorPoseRef,
    wordRefsRef,
    enabled: !reduceMotion,
    config: engineConfig,
    cursorConfig,
  })

  const setCursorFromEvent = (clientX: number, clientY: number) => {
    const container = containerRef.current
    if (!container) return
    const r = container.getBoundingClientRect()
    cursorPoseRef.current = { cx: clientX - r.left, cy: clientY - r.top }
  }

  return (
    <>
      <div
        className="absolute inset-0 z-[20]"
        onPointerEnter={(e) => {
          setCursorActive(true)
          setCursorFromEvent(e.clientX, e.clientY)
        }}
        onPointerLeave={() => {
          setCursorActive(false)
          cursorPoseRef.current = null
        }}
        onPointerMove={(e) => {
          setCursorFromEvent(e.clientX, e.clientY)
        }}
      />
      <CustomCursorOverlay variant="tractor" active={cursorActive && !reduceMotion} poseRef={cursorPoseRef} />

      <div className="farm-scene-copy">
        <div className="cinematic-heading relative z-10">
          <p className="farm-chapter-label">/ Chapter {scene.chapter}</p>
          <h2 className="cinematic-heading-title" aria-label={scene.title}>
            <InteractiveText parts={titleParts} wordsRef={wordRefsRef} idPrefix={scene.id} startIndex={0} />
          </h2>
          <p className="cinematic-heading-subtitle mt-3 max-w-prose">
            <InteractiveText
              parts={captionParts}
              wordsRef={wordRefsRef}
              idPrefix={`${scene.id}-cap`}
              startIndex={captionStartIndex}
            />
          </p>
        </div>
      </div>
    </>
  )
}

export function HarvestingInteractiveScene({
  scene,
  index,
  isLast = false,
  reduceMotion,
}: HarvestingInteractiveSceneProps) {
  return (
    <section
      className={`farm-scene-shell farm-transition-mask farm-no-overlap${isLast ? ' farm-scene-shell-last' : ''}`}
    >
      <motion.article
        className="farm-scene-card farm-tilt-card"
        style={{ zIndex: 10 + index }}
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="farm-scene-media-wrap farm-parallax-layer"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <img
            className="farm-scene-media"
            src={scene.image}
            alt={scene.imageAlt}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </motion.div>
        <div className="farm-scene-overlay" aria-hidden="true" />
        <SceneWrapper className="interactive-scene-stage">
          <HarvestingInteractiveBody scene={scene} reduceMotion={reduceMotion} />
        </SceneWrapper>
      </motion.article>
    </section>
  )
}
