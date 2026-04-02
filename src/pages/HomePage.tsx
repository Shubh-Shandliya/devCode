import { Link } from 'react-router-dom'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { lazy, Suspense, useRef } from 'react'
import { AnimatedStat } from '../components/AnimatedStat'
import { SectionGrid, SectionShell } from '../components/SectionShell'
import { usePageVisible } from '../hooks/usePageVisible'
import { useReducedMotionThree } from '../hooks/useReducedMotionThree'
import {
  collaborationFlow,
  hiringFaq,
  domainHighlights,
  heroContent,
  landingHighlights,
  trustMetrics,
} from '../data/portfolioContent'
import shubhamImg from '../assets/ShubhamSharma.png'
import shubhamResume from '../assets/Shubham Sharma Resume.pdf'

const HeroScene = lazy(() =>
  import('../components/three/HeroScene').then((mod) => ({ default: mod.HeroScene })),
)

const heroStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

const sectionCard =
  'animate-rise-in card-surface-rich rounded-[1.4rem] border border-border p-9 max-[900px]:p-6'

const btnBase =
  'btn-slide-fill inline-block rounded-xl border border-border px-4 py-2.5 font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5'

const btnPrimary = `${btnBase} text-[#0d101a] bg-gradient-to-br from-[#6cffea] via-[#7f7bff] to-[#ff59d9] hover:shadow-hard-glow`

const btnGhost = `${btnBase} bg-surface-glass text-foreground hover:bg-surface-hover`

const eyebrow =
  'mb-4 inline-block w-fit rounded-full border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-[0.65rem] py-1 text-accent'

const infoCard =
  'card-inset-rich grid gap-[0.65rem] rounded-2xl border border-border p-4 transition-all duration-200 hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--accent)_60%,var(--border-color))]'

const chipLi =
  'rounded-full border border-border bg-surface-hover px-4 py-[0.65rem] text-sm max-[900px]:rounded-[0.55rem]'

const proofChip =
  'rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-3 py-1 text-[0.82rem] font-semibold text-foreground'

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotionThree()
  const isPageVisible = usePageVisible()
  const mx = useMotionValue(50)
  const my = useMotionValue(30)
  const glow = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(132,253,240,0.16), rgba(127,123,255,0.1) 36%, rgba(255,89,217,0.06) 56%, transparent 76%)`
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ['start center', 'end center'],
  })
  const firstSectionY = useTransform(stackProgress, [0, 0.6], [0, -72])
  const firstSectionScale = useTransform(stackProgress, [0, 0.6], [1, 0.95])
  const firstSectionOpacity = useTransform(stackProgress, [0, 0.6], [1, 0.58])
  const secondSectionY = useTransform(stackProgress, [0.15, 0.85], [96, 0])
  const secondSectionScale = useTransform(stackProgress, [0.15, 0.85], [0.94, 1])
  const secondSectionOpacity = useTransform(stackProgress, [0.15, 0.85], [0.5, 1])

  return (
    <div className="relative isolate flex flex-col gap-6">
      <motion.section
        ref={heroRef}
        className={`hero-stage ${sectionCard} grid grid-cols-1 gap-5 [perspective:1000px] min-[901px]:grid-cols-[1.2fr_0.8fr] min-[901px]:grid-rows-[auto_1fr]`}
        style={{ y: parallaxY }}
        variants={heroStagger}
        initial="hidden"
        animate="show"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const x = ((event.clientX - rect.left) / rect.width) * 100
          const y = ((event.clientY - rect.top) / rect.height) * 100
          mx.set(x)
          my.set(y)
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-[1.4rem]"
          style={{ background: glow }}
          aria-hidden="true"
        />
        {!reduceMotion && isPageVisible ? (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        ) : null}
        <motion.div
          className="relative z-10 order-1 flex flex-col gap-[0.9rem] min-[901px]:col-start-1 min-[901px]:row-start-1"
          variants={heroStagger}
        >
          <motion.p className={eyebrow} variants={fadeUp}>
            Frontend Portfolio
          </motion.p>
          <motion.h1 variants={fadeUp}>{heroContent.name}</motion.h1>
          <motion.h2 className="-mt-0.5" variants={fadeUp}>
            {heroContent.role}
          </motion.h2>
          <motion.div className="mt-1 flex flex-wrap gap-2" variants={fadeUp}>
            <span className={proofChip}>Hiring Mode: Recruiter-ready</span>
            <span className={proofChip}>Client Mode: Outcome-focused</span>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-photo-frame sticky top-30 z-10 order-2 grid h-[clamp(280px,48vw,380px)] w-full max-w-[360px] justify-self-center place-content-center overflow-hidden rounded-2xl text-center backdrop-blur-md min-[901px]:col-start-2 min-[901px]:row-span-2 min-[901px]:row-start-1 [background:radial-gradient(circle_at_20%_20%,rgba(108,255,234,0.14),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(255,89,217,0.2),transparent_36%),rgba(14,17,34,0.88)]"
          variants={fadeUp}
          initial={{ opacity: 0, rotateY: 8, scale: 0.96 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          whileHover={{ y: -6, rotateX: 2 }}
        >
          <motion.div
            className="pointer-events-none absolute -top-[35px] -right-[35px] size-40 rounded-full bg-[radial-gradient(circle,rgba(132,253,240,0.36)_0%,rgba(127,123,255,0.2)_38%,rgba(255,89,217,0)_75%)]"
            animate={{
              x: [0, 14, -8, 0],
              y: [0, -12, 8, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.img
            className="absolute h-full w-full object-cover saturate-[1.05] contrast-[1.05]"
            src={shubhamImg}
            alt="Shubham Sharma"
            width={420}
            height={420}
            animate={{ scale: [1.02, 1.05, 1.02] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="absolute inset-0 grid content-end gap-1 bg-gradient-to-t from-[rgba(8,9,18,0.9)] from-0% via-[rgba(8,9,18,0.35)] via-55% to-[rgba(8,9,18,0.05)] p-[1.1rem]"
            aria-hidden="true"
          >
            <motion.p
              className="mb-1.5 font-bold text-foreground"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.35 }}
            >
              Shubham Sharma
            </motion.p>
            <motion.p
              className="text-[0.95rem] font-semibold text-muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.35 }}
            >
              Frontend Developer • React • UI/UX
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="relative z-10 order-3 flex flex-col gap-[0.9rem] min-[901px]:col-start-1 min-[901px]:row-start-2"
          variants={heroStagger}
        >
          <motion.p variants={fadeUp}>{heroContent.intro}</motion.p>
          <motion.p variants={fadeUp}>{heroContent.aiLine}</motion.p>
          <motion.p className="text-[1.1rem] font-semibold text-foreground" variants={fadeUp}>
            {heroContent.tagline}
          </motion.p>
          <motion.div className="flex flex-wrap gap-2" variants={fadeUp}>
            <span className={proofChip}>200+ Deliveries</span>
            <span className={proofChip}>45% Faster AI-Assisted Workflow</span>
            <span className={proofChip}>Performance-First Frontend</span>
          </motion.div>
          <motion.ul className="mt-1 mb-0 flex list-none flex-wrap gap-2 p-0" variants={fadeUp}>
            {domainHighlights.map((domain) => (
              <motion.li
                key={domain}
                className={`${chipLi} will-change-transform`}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                {domain}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div className="mt-2 flex flex-wrap gap-3" variants={fadeUp}>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link to="/projects" className={btnPrimary}>
                View Case Studies
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contact" className={btnGhost}>
                Hire Me for Product Work
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <a
                href={shubhamResume}
                className={btnGhost}
                download="Shubham-Sharma-Resume.pdf"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <div ref={stackRef} className="relative min-h-[950px] max-[900px]:min-h-[860px]">
        <motion.section
          className={`${sectionCard} sticky top-24 z-[11]`}
          style={{
            y: firstSectionY,
            scale: firstSectionScale,
            opacity: firstSectionOpacity,
          }}
        >
          <SectionShell className="" eyebrowClassName={eyebrow} eyebrow="What makes my work different">
            <SectionGrid>
            {landingHighlights.map((item) => (
              <article key={item.title} className={infoCard}>
                <h3 className="text-[1.05rem]">{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
            </SectionGrid>
          </SectionShell>
        </motion.section>

        <motion.section
          className={`${sectionCard} sticky top-24 z-[12] mt-6`}
          style={{
            y: secondSectionY,
            scale: secondSectionScale,
            opacity: secondSectionOpacity,
          }}
        >
          <SectionShell className="" eyebrowClassName={eyebrow} eyebrow="Collaboration flow">
            <SectionGrid>
            {collaborationFlow.map((item) => (
              <article key={item.step} className={infoCard}>
                <p className="h-fit w-fit rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] px-2 py-0.5 text-[0.82rem] font-bold text-accent">
                  {item.step}
                </p>
                <h3 className="text-[1.05rem]">{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
            </SectionGrid>
          </SectionShell>
        </motion.section>
      </div>

      <section className={sectionCard}>
        <div className="section-grid-trust">
          {trustMetrics.map((item) => (
            <article
              key={item.label}
              className="card-inset-rich rounded-2xl border border-border p-4 transition-all duration-200 hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--accent)_60%,var(--border-color))]"
            >
              <p className="mb-2 text-3xl font-bold text-foreground">
                <AnimatedStat value={item.value} />
              </p>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
        <div className="card-inset-rich grid gap-3 rounded-2xl border border-border p-4">
          <h3 className="m-0">
            Need a frontend partner who balances speed, quality, and creativity?
          </h3>
          <p>
            Let us build a high-impact product experience with modern design, performance
            focus, and reliable delivery.
          </p>
          <Link to="/contact" className={`${btnPrimary} w-fit`}>
            Start a Conversation
          </Link>
        </div>
      </section>

      {/* <section className={sectionCard}>
        <p className={eyebrow}>What teams say</p>
        <div className="grid grid-cols-1 gap-4 min-[901px]:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.author} className={infoCard}>
              <p className="text-foreground">"{item.quote}"</p>
              <p className="text-sm font-semibold text-accent">{item.author}</p>
            </article>
          ))}
        </div>
      </section> */}

      <SectionShell className={sectionCard} eyebrowClassName={eyebrow} eyebrow="Hiring FAQ">
        <SectionGrid>
          {hiringFaq.map((item) => (
            <article key={item.question} className={infoCard}>
              <h3 className="text-[1.02rem]">{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </SectionGrid>
      </SectionShell>
    </div>
  )
}
