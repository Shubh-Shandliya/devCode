import { motion } from 'framer-motion'
import { CinematicHeading } from './CinematicHeading'

type MilkProcessTimelineProps = {
  steps: { title: string; text: string }[]
}

export function MilkProcessTimeline({ steps }: MilkProcessTimelineProps) {
  return (
    <section className="farm-milk-shell farm-transition-mask">
      <div className="farm-milk-head">
        <CinematicHeading
          chapter="07"
          title="Milk Process"
          subtitle="From care to kitchen, the journey of milk is a ritual of trust."
          parts={['Milk', 'To', 'Home']}
        />
      </div>
      <div className="farm-milk-track" aria-hidden="true" />
      <div className="farm-milk-list">
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            className="farm-milk-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <span className="farm-milk-dot" aria-hidden="true" />
            <p className="farm-milk-step">0{index + 1}</p>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
