import { motion } from 'framer-motion'
import type { FarmScene } from '../../data/farmStoryContent'
import { CinematicHeading } from './CinematicHeading'

type StorySceneProps = {
  scene: FarmScene
  index: number
  isLast?: boolean
}

export function StoryScene({ scene, index, isLast = false }: StorySceneProps) {
  return (
    <section className={`farm-scene-shell farm-transition-mask${isLast ? ' farm-scene-shell-last' : ''}`}>
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
        <div className="farm-scene-copy">
          <CinematicHeading
            chapter={scene.chapter}
            title={scene.title}
            subtitle={scene.caption}
            parts={scene.headlineParts}
          />
          <div className="farm-scene-hover-caption">
            <p>{scene.caption}</p>
          </div>
        </div>
      </motion.article>
    </section>
  )
}
