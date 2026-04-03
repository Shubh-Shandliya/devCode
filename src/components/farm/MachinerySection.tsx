import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CinematicHeading } from './CinematicHeading'

type MachinerySectionProps = {
  chapter: string
  title: string
  caption: string
  cards: { title: string; caption: string; image: string }[]
}

function MachineryStackCard({
  caption,
  image,
  index,
  total,
  progress,
  isFirst,
}: {
  caption: string
  image: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  isFirst: boolean
}) {
  const slot = 1 / total
  const start = index * slot
  const end = Math.min(1, start + slot * 0.72)
  const y = useTransform(progress, [start, end], index === 0 ? [0, 0] : [150, 0])
  const scale = useTransform(progress, [start, end], index === 0 ? [1, 1] : [0.93, 1])
  const opacity = useTransform(progress, [start, end], index === 0 ? [1, 1] : [0, 1])

  return (
    <motion.article
      className="farm-machinery-card farm-machinery-stack-card farm-tilt-card"
      style={{ y, scale, opacity, zIndex: index + 1 }}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading={isFirst ? 'eager' : 'lazy'}
        fetchPriority={isFirst ? 'high' : 'auto'}
        decoding="async"
      />
      <div className="farm-machinery-overlay">
        <p>{caption}</p>
      </div>
    </motion.article>
  )
}

export function MachinerySection({ chapter, title, caption, cards }: MachinerySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const sectionHeightVh = Math.max(210, cards.length * 72)

  return (
    <section className="farm-machinery-shell">
      <div className="farm-machinery-head">
        <CinematicHeading chapter={chapter} title={title} subtitle={caption} parts={['Tractor', 'Tools', 'Motion']} />
      </div>
      <div
        ref={containerRef}
        className="farm-machinery-scroll"
        style={{ minHeight: `${sectionHeightVh}vh` }}
      >
        <div className="farm-machinery-sticky">
          <div className="farm-machinery-stack">
            {cards.map((card, index) => (
              <MachineryStackCard
                key={card.title}
                caption={card.caption}
                image={card.image}
                index={index}
                total={cards.length}
                progress={scrollYProgress}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
