import { useMemo, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CinematicHeading } from '../components/farm/CinematicHeading'
import { ClosingScene } from '../components/farm/ClosingScene'
import { FarmHero } from '../components/farm/FarmHero'
import { MachinerySection } from '../components/farm/MachinerySection'
import { MilkProcessTimeline } from '../components/farm/MilkProcessTimeline'
import { AnimalsInteractiveScene } from '../components/farm/interactive/AnimalsInteractiveScene'
import { HarvestingInteractiveScene } from '../components/farm/interactive/HarvestingInteractiveScene'
import { StoryScene } from '../components/farm/StoryScene'
import { useGsapScene } from '../hooks/useGsapScene'
import { useLenisScroll } from '../hooks/useLenisScroll'
import { useReducedMotionThree } from '../hooks/useReducedMotionThree'
import {
  farmAmbientAudio,
  farmClosing,
  farmScenes,
  gardenScrollCards,
  milkProcessSteps,
  tractorRailCards,
} from '../data/farmStoryContent'
import { useFarmAmbientAudio } from '../hooks/useFarmAmbientAudio'
import { useMediaQuery, useViewportInnerWidth } from '../hooks/useMediaQuery'

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
  const isNarrowViewport = useMediaQuery('(max-width: 900px)')
  const viewportWidth = useViewportInnerWidth()
  useLenisScroll(!reduceMotion)
  const rootRef = useRef<HTMLDivElement>(null)
  const gardenScrollRef = useRef<HTMLDivElement>(null)
  const ambientAudioRef = useRef<HTMLAudioElement>(null)
  const [ambientOn, setAmbientOn] = useState(false)

  useFarmAmbientAudio(ambientAudioRef, ambientOn && Boolean(farmAmbientAudio.src), farmAmbientAudio.volume)
  const [activeChapter, setActiveChapter] = useState(1)
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: gardenProgress } = useScroll({
    target: gardenScrollRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(8, Math.max(1, Math.ceil(value * 8)))
    setActiveChapter(next)
  })

  const hudLabel = useMemo(() => chapterTitles[activeChapter - 1], [activeChapter])
  const gardenCards = gardenScrollCards
  const gardenCardWidth = isNarrowViewport ? Math.min(Math.round(viewportWidth * 0.88), 360) : 420
  const gardenGap = isNarrowViewport ? 13 : 20
  const gardenTravel = (gardenCards.length - 1) * (gardenCardWidth + gardenGap)
  const gardenX = useTransform(gardenProgress, [0, 1], [0, -gardenTravel])
  const verticalScenes = farmScenes.filter(
    (scene) =>
      scene.layoutType === 'vertical' && scene.id !== 'gardening' && scene.id !== 'machinery',
  )
  const lifeScene = verticalScenes.find((scene) => scene.id === 'life-on-farm')
  const animalsScene = verticalScenes.find((scene) => scene.id === 'animals')
  const harvestingScene = verticalScenes.find((scene) => scene.id === 'harvesting')

  useGsapScene(() => {
    if (!rootRef.current) return

    ScrollTrigger.matchMedia({
      '(min-width: 901px)': () => {
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
      },
      '(max-width: 900px)': () => {
        gsap.utils.toArray<HTMLElement>('.farm-transition-mask').forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0.92, scale: 0.998 },
            {
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 92%',
                end: 'top 64%',
                scrub: 0.65,
              },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('.farm-parallax-layer').forEach((layer) => {
          gsap.to(layer, {
            yPercent: -1.5,
            ease: 'none',
            scrollTrigger: {
              trigger: layer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      },
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
        <div className="farm-story-controls">
          <button
            type="button"
            className="farm-audio-toggle"
            onClick={() => setAmbientOn((prev) => !prev)}
            aria-pressed={ambientOn}
            aria-label={ambientOn ? 'Turn off ambient background sound' : 'Turn on ambient background sound'}
            title="Background atmosphere audio for this story"
          >
            {ambientOn ? 'Ambient: On' : 'Ambient: Off'}
          </button>

          <motion.aside
            className="farm-hud"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p>Chapter {String(activeChapter).padStart(2, '0')}</p>
            <h3>{hudLabel}</h3>
          </motion.aside>
        </div>

        <audio
          ref={ambientAudioRef}
          src={farmAmbientAudio.src}
          loop
          preload="metadata"
          aria-hidden="true"
          className="farm-ambient-audio"
        />

        <div className="farm-transition-mask farm-parallax-layer">
          <FarmHero />
        </div>

        {lifeScene ? <StoryScene scene={lifeScene} index={0} isLast={false} /> : null}

        {animalsScene && harvestingScene ? (
          <section className="farm-dual-scene-row">
            <div className="farm-dual-scene-item">
              <AnimalsInteractiveScene scene={animalsScene} index={1} isLast={false} reduceMotion={reduceMotion} />
            </div>
            <div className="farm-dual-scene-item">
              <HarvestingInteractiveScene
                scene={harvestingScene}
                index={2}
                isLast={false}
                reduceMotion={reduceMotion}
              />
            </div>
          </section>
        ) : null}

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
          <div ref={gardenScrollRef} className="farm-garden-scroll">
            <div className="farm-garden-sticky">
              <motion.div
                className="farm-garden-track"
                style={reduceMotion ? undefined : { x: gardenX }}
              >
                {gardenCards.map((card, index) => (
                  <article key={`garden-${card.title}`} className="farm-garden-card farm-tilt-card">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="farm-garden-overlay">
                      <h3>{card.title}</h3>
                      <p>{card.caption}</p>
                    </div>
                  </article>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <MilkProcessTimeline steps={milkProcessSteps} />
        <ClosingScene chapter={farmClosing.chapter} title={farmClosing.title} text={farmClosing.text} />
      </div>
    </div>
  )
}
