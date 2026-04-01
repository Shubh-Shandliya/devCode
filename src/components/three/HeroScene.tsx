import { Float } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Points as ThreePoints } from 'three'
import * as THREE from 'three'
import { desktopDpr, mobileDpr, canvasGl } from './canvasConfig'

function seededSpread(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return (x - Math.floor(x)) * 2 - 1
}

function ParticleConstellation({ count }: { count: number }) {
  const pointsRef = useRef<ThreePoints>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = seededSpread(i + 1) * 8
      arr[i * 3 + 1] = seededSpread(i + 271) * 4
      arr[i * 3 + 2] = seededSpread(i + 587) * 4
    }
    return arr
  }, [count])

  const { pointer } = useThree()
  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.05
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      pointer.x * 0.25,
      0.03,
    )
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      pointer.y * 0.14,
      0.03,
    )
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#84fdf0"
        transparent
        opacity={0.62}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingTotems() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.1} floatIntensity={0.55} rotationIntensity={0.22}>
        <mesh position={[-2.2, 1.15, -0.8]}>
          <octahedronGeometry args={[0.64, 0]} />
          <meshStandardMaterial
            color="#171d34"
            emissive="#7f7bff"
            emissiveIntensity={0.45}
            roughness={0.42}
            metalness={0.22}
          />
        </mesh>
      </Float>
      <Float speed={0.95} floatIntensity={0.45} rotationIntensity={0.26}>
        <mesh position={[1.95, -0.8, -0.2]}>
          <torusKnotGeometry args={[0.34, 0.1, 160, 26]} />
          <meshStandardMaterial
            color="#171a30"
            emissive="#ff59d9"
            emissiveIntensity={0.38}
            roughness={0.5}
            metalness={0.15}
          />
        </mesh>
      </Float>
      <Float speed={1.2} floatIntensity={0.35} rotationIntensity={0.18}>
        <mesh position={[0.2, 1.75, -1.2]}>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color="#121830"
            emissive="#6cffea"
            emissiveIntensity={0.46}
            roughness={0.47}
            metalness={0.16}
          />
        </mesh>
      </Float>
    </group>
  )
}

export function HeroScene() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[1.4rem]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={isMobile ? mobileDpr : desktopDpr}
        gl={canvasGl}
      >
        <ambientLight intensity={0.33} />
        <pointLight position={[7, 8, 8]} intensity={1.1} color="#a9b2ff" />
        <pointLight position={[-8, -3, 6]} intensity={0.6} color="#7df8ef" />
        <FloatingTotems />
        <ParticleConstellation count={isMobile ? 500 : 1200} />
      </Canvas>
    </div>
  )
}
