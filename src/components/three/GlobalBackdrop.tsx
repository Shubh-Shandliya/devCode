import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Points as ThreePoints } from 'three'
import { desktopDpr, mobileDpr, canvasGl } from './canvasConfig'

function seededSpread(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return (x - Math.floor(x)) * 2 - 1
}

function StarField({ count = 420 }: { count?: number }) {
  const pointsRef = useRef<ThreePoints>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = seededSpread(i + 1) * 11
      arr[i * 3 + 1] = seededSpread(i + 101) * 7
      arr[i * 3 + 2] = seededSpread(i + 401) * 5
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.rotation.x += delta * 0.004
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        transparent
        opacity={0.35}
        color="#87f9ef"
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export function GlobalBackdrop() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 48 }}
        dpr={isMobile ? mobileDpr : desktopDpr}
        gl={canvasGl}
      >
        <StarField count={isMobile ? 190 : 420} />
      </Canvas>
    </div>
  )
}
