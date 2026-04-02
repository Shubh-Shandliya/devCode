import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { usePageVisible } from '../../hooks/usePageVisible'
import { useReducedMotionThree } from '../../hooks/useReducedMotionThree'
import { farmHero } from '../../data/farmStoryContent'

const FarmHeroScene = lazy(() =>
  import('../three/FarmHeroScene').then((mod) => ({ default: mod.FarmHeroScene })),
)

export function FarmHero() {
  const reduceMotion = useReducedMotionThree()
  const isPageVisible = usePageVisible()

  return (
    <section className="farm-hero-shell">
      {!reduceMotion && isPageVisible ? (
        <Suspense fallback={null}>
          <FarmHeroScene />
        </Suspense>
      ) : null}
      <div className="farm-film-grain" aria-hidden="true" />
      <motion.div
        className="farm-hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <p className="farm-hero-eyebrow">/ {farmHero.eyebrow}</p>
        <h1>{farmHero.title}</h1>
        <p>{farmHero.subtitle}</p>
        <div className="farm-scroll-indicator" aria-hidden="true">
          <span />
        </div>
      </motion.div>
      <div className="farm-meta-grid farm-meta-strip">
        <article>
          <h3>Role</h3>
          <p>{farmHero.meta.role}</p>
        </article>
        <article>
          <h3>Tools</h3>
          <p>{farmHero.meta.tools}</p>
        </article>
        <article>
          <h3>Challenge</h3>
          <p>{farmHero.meta.challenge}</p>
        </article>
        <article>
          <h3>Narrative Goal</h3>
          <p>{farmHero.meta.goal}</p>
        </article>
      </div>
    </section>
  )
}
