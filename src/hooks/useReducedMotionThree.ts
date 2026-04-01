import { useReducedMotion } from 'framer-motion'

export function useReducedMotionThree() {
  const reduceMotion = useReducedMotion()
  return Boolean(reduceMotion)
}
