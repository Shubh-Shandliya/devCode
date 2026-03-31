import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  collaborationFlow,
  domainHighlights,
  heroContent,
  landingHighlights,
  trustMetrics,
} from '../data/portfolioContent'
import shubhamImg from '../assets/ShubhamSharma.png'

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

export function HomePage() {
  return (
    <>
      <motion.section
        className="hero-grid section-card hero-stage"
        variants={heroStagger}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-copy" variants={heroStagger}>
          <motion.p className="eyebrow" variants={fadeUp}>
            Frontend Portfolio
          </motion.p>
          <motion.h1 variants={fadeUp}>{heroContent.name}</motion.h1>
          <motion.h2 className="role" variants={fadeUp}>
            {heroContent.role}
          </motion.h2>
          <motion.p variants={fadeUp}>{heroContent.intro}</motion.p>
          <motion.p variants={fadeUp}>{heroContent.aiLine}</motion.p>
          <motion.p className="tagline" variants={fadeUp}>
            {heroContent.tagline}
          </motion.p>
          <motion.ul className="chip-list hero-domain-highlights" variants={fadeUp}>
            {domainHighlights.map((domain) => (
              <motion.li
                key={domain}
                className="hero-chip"
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                {domain}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div className="hero-actions" variants={fadeUp}>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link to="/projects" className="button button-primary">
                View Projects
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contact" className="button button-ghost">
                Hire Me
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-photo-card"
          variants={fadeUp}
          initial={{ opacity: 0, rotateY: 8, scale: 0.96 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          whileHover={{ y: -6, rotateX: 2 }}
        >
          <motion.div
            className="hero-orb"
            animate={{
              x: [0, 14, -8, 0],
              y: [0, -12, 8, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.img
            className="hero-photo"
            src={shubhamImg}
            alt="Shubham Sharma"
            width={420}
            height={420}
            animate={{ scale: [1.02, 1.05, 1.02] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="hero-photo-overlay" aria-hidden="true">
            <motion.p
              className="photo-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.35 }}
            >
              Shubham Sharma
            </motion.p>
            <motion.p
              className="photo-subtitle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.35 }}
            >
              Frontend Developer • React • UI/UX
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="section-card landing-stack"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow">What makes my work different</p>
        <div className="grid three-col">
          {landingHighlights.map((item) => (
            <article key={item.title} className="info-card landing-value-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-card landing-stack"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow">Collaboration flow</p>
        <div className="grid three-col">
          {collaborationFlow.map((item) => (
            <article key={item.step} className="info-card flow-card">
              <p className="flow-step">{item.step}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-card landing-stack final-cta-section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid three-col metrics-grid">
          {trustMetrics.map((item) => (
            <article key={item.label} className="metric-card">
              <p className="metric-value">{item.value}</p>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
        <div className="landing-cta">
          <h3>Need a frontend partner who balances speed, quality, and creativity?</h3>
          <p>
            Let us build a high-impact product experience with modern design, performance
            focus, and reliable delivery.
          </p>
          <Link to="/contact" className="button button-primary">
            Start a Conversation
          </Link>
        </div>
      </motion.section>
    </>
  )
}
