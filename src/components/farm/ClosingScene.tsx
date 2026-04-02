import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type ClosingSceneProps = {
  chapter: string
  title: string
  text: string
}

export function ClosingScene({ chapter, title, text }: ClosingSceneProps) {
  return (
    <motion.section
      className="farm-closing-shell"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="farm-chapter-label">Chapter {chapter}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="farm-closing-actions">
        <Link to="/projects" className="farm-btn farm-btn-primary">
          View More Work
        </Link>
        <Link to="/contact" className="farm-btn farm-btn-ghost">
          Build a Story Experience
        </Link>
      </div>
    </motion.section>
  )
}
