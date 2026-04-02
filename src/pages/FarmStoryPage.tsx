import { useMemo, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CinematicHeading } from '../components/farm/CinematicHeading'
import { ClosingScene } from '../components/farm/ClosingScene'
import { FarmHero } from '../components/farm/FarmHero'
import { MachinerySection } from '../components/farm/MachinerySection'
import { MilkProcessTimeline } from '../components/farm/MilkProcessTimeline'
import { StoryScene } from '../components/farm/StoryScene'
import { useGsapScene } from '../hooks/useGsapScene'
import { useLenisScroll } from '../hooks/useLenisScroll'
import { useReducedMotionThree } from '../hooks/useReducedMotionThree'
import { farmClosing, farmScenes, milkProcessSteps, tractorRailCards } from '../data/farmStoryContent'

gsap.registerPlugin(ScrollTrigger)

const chapterTitles = [
  'Intro',
  'Life on Farm',
  'Animals',
  'Harvesting',
  'Machinery',
  'Gardening',
  'Milk Process',
  'Closing',
]

export function FarmStoryPage() {
  const reduceMotion = useReducedMotionThree()
  useLenisScroll(!reduceMotion)
  const rootRef = useRef<HTMLDivElement>(null)
  const [ambientOn, setAmbientOn] = useState(false)
  const [activeChapter, setActiveChapter] = useState(1)
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(8, Math.max(1, Math.ceil(value * 8)))
    setActiveChapter(next)
  })

  const hudLabel = useMemo(() => chapterTitles[activeChapter - 1], [activeChapter])
  const verticalScenes = farmScenes.filter(
    (scene) =>
      scene.layoutType === 'vertical' && scene.id !== 'gardening' && scene.id !== 'machinery',
  )

  useGsapScene(() => {
    if (!rootRef.current) return

    gsap.utils.toArray<HTMLElement>('.farm-transition-mask').forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.8, scale: 0.996 },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            end: 'top 50%',
            scrub: true,
          },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('.farm-parallax-layer').forEach((layer) => {
      gsap.to(layer, {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }, [], !reduceMotion)

  return (
    <div ref={rootRef} className="farm-standalone-shell">
      <header className="farm-page-header">
        <Link to="/" className="farm-brand-link" aria-label="Go to homepage">
          <span className="farm-brand-dot" aria-hidden="true" />
          <span>SHUBHAM SHARMA</span>
        </Link>
      </header>

      <div className="farm-story-root">
        <motion.aside
          className="farm-hud"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p>Chapter {String(activeChapter).padStart(2, '0')}</p>
          <h3>{hudLabel}</h3>
        </motion.aside>

        <button
          type="button"
          className="farm-audio-toggle"
          onClick={() => setAmbientOn((prev) => !prev)}
          aria-pressed={ambientOn}
        >
          {ambientOn ? 'Ambient: On' : 'Ambient: Off'}
        </button>

        <div className="farm-transition-mask farm-parallax-layer">
          <FarmHero />
        </div>

        {verticalScenes.map((scene, index) => (
          <StoryScene
            key={scene.id}
            scene={scene}
            index={index}
            isLast={index === verticalScenes.length - 1}
          />
        ))}

        <MachinerySection
          chapter="05"
          title="Machinery"
          caption="Tools, tractors, and rhythm across the land."
          cards={tractorRailCards}
        />

        <section className="farm-scene-shell farm-garden-shell">
          <div className="farm-garden-intro">
            <CinematicHeading
              chapter="06"
              title="Gardening at Home"
              subtitle="Flowers, fruits, and vegetables flowing into a living home ecosystem."
              parts={['Garden', 'At', 'Home']}
            />
          </div>
          <div className="farm-garden-grid">
            {tractorRailCards.slice(0, 4).map((card) => (
              <article key={`garden-${card.title}`} className="farm-garden-card farm-tilt-card">
                <img src={card.image} alt={card.title} loading="lazy" decoding="async" />
                <div className="farm-garden-overlay">
                  <h3>{card.title}</h3>
                  <p>{card.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <MilkProcessTimeline steps={milkProcessSteps} />
        <ClosingScene chapter={farmClosing.chapter} title={farmClosing.title} text={farmClosing.text} />
      </div>
    </div>
  )
}
