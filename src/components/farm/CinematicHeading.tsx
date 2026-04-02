import { motion } from 'framer-motion'

type CinematicHeadingProps = {
  chapter: string
  title: string
  subtitle?: string
  parts?: string[]
}

export function CinematicHeading({ chapter, title, subtitle, parts }: CinematicHeadingProps) {
  const words = parts?.length ? parts : title.split(' ')

  return (
    <div className="cinematic-heading">
      <p className="farm-chapter-label">/ Chapter {chapter}</p>
      <h2 className="cinematic-heading-title" aria-label={title}>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="cinematic-word"
            initial={{ clipPath: 'inset(0 0 100% 0)', y: 32, opacity: 0 }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      {subtitle ? (
        <motion.p
          className="cinematic-heading-subtitle"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}
