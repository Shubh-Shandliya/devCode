import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

type ProjectCardProps = {
  children: ReactNode
}

const springConfig = { damping: 24, stiffness: 220, mass: 0.8 }

export function ProjectCard({ children }: ProjectCardProps) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const springX = useSpring(rotateX, springConfig)
  const springY = useSpring(rotateY, springConfig)

  const sheen = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(132,253,240,0.2), rgba(127,123,255,0.08) 35%, transparent 70%)`

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-border card-inset-rich [transform-style:preserve-3d]"
      style={{ perspective: 1200, rotateX: springX, rotateY: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const px = x / rect.width
        const py = y / rect.height
        rotateY.set((px - 0.5) * 12)
        rotateX.set((0.5 - py) * 12)
        glowX.set(px * 100)
        glowY.set(py * 100)
      }}
      onMouseLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: sheen }} />
      <div className="relative z-10 p-4 [transform:translateZ(20px)]">{children}</div>
    </motion.article>
  )
}
