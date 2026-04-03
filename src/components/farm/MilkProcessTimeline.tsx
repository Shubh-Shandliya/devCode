import { motion } from 'framer-motion'
import { useRef } from 'react'
import { CinematicHeading } from './CinematicHeading'

type MilkProcessTimelineProps = {
  steps: { title: string; text: string }[]
}

export function MilkProcessTimeline({ steps }: MilkProcessTimelineProps) {
  const listRef = useRef<HTMLDivElement>(null)

  const setSpotlightFromPointer = (clientX: number, clientY: number) => {
    const list = listRef.current
    if (!list) return
    const rect = list.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    list.style.setProperty('--spotlight-x', `${x.toFixed(2)}px`)
    list.style.setProperty('--spotlight-y', `${y.toFixed(2)}px`)
  }

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
      <div
        ref={listRef}
        className="farm-milk-list"
        onPointerEnter={(event) => {
          setSpotlightFromPointer(event.clientX, event.clientY)
        }}
        onPointerMove={(event) => {
          setSpotlightFromPointer(event.clientX, event.clientY)
        }}
      >
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
