import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import { canvasGl, desktopDpr, mobileDpr } from './canvasConfig'

function AccentContent() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.24
    groupRef.current.rotation.x += delta * 0.08
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.28}>
        <mesh position={[-1.2, 0.4, 0]}>
          <torusGeometry args={[0.8, 0.05, 12, 80]} />
          <meshStandardMaterial color="#84fdf0" emissive="#84fdf0" emissiveIntensity={0.35} />
        </mesh>
      </Float>
      <Float speed={1.05} floatIntensity={0.35} rotationIntensity={0.22}>
        <mesh position={[0.9, -0.6, 0.3]}>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#151a31" emissive="#7f7bff" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <ambientLight intensity={0.34} />
      <pointLight position={[3, 4, 5]} intensity={0.8} color="#a5b0ff" />
    </group>
  )
}

export function SectionAccent() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

  return (
    <div className="pointer-events-none absolute top-0 right-0 z-0 h-56 w-56 opacity-65 blur-[0.2px] max-[900px]:h-44 max-[900px]:w-44">
      <Canvas camera={{ position: [0, 0, 4], fov: 48 }} dpr={isMobile ? mobileDpr : desktopDpr} gl={canvasGl}>
        <AccentContent />
      </Canvas>
    </div>
  )
}
