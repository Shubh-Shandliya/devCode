import { motion } from 'framer-motion'
import { CinematicHeading } from './CinematicHeading'

type MachinerySectionProps = {
  chapter: string
  title: string
  caption: string
  cards: { title: string; caption: string; image: string }[]
}

export function MachinerySection({ chapter, title, caption, cards }: MachinerySectionProps) {
  return (
    <section className="farm-machinery-shell">
      <div className="farm-machinery-head">
        <CinematicHeading chapter={chapter} title={title} subtitle={caption} parts={['Tractor', 'Tools', 'Motion']} />
      </div>
      <div className="farm-machinery-stack">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            className="farm-machinery-card farm-tilt-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
          >
            <img src={card.image} alt={card.title} loading="lazy" decoding="async" />
            <div className="farm-machinery-overlay">
              <h3>{card.title}</h3>
              <p>{card.caption}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
