import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Points as ThreePoints } from 'three'
import * as THREE from 'three'
import { canvasGl, desktopDpr, mobileDpr } from './canvasConfig'

function seeded(seed: number) {
  const x = Math.sin(seed * 13.31) * 43758.5453123
  return x - Math.floor(x)
}

function GrassParticles({ count }: { count: number }) {
  const pointsRef = useRef<ThreePoints>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const spreadX = seeded(i + 9) * 24 - 12
      const spreadY = seeded(i + 201) * 8 - 4
      const spreadZ = seeded(i + 300) * 8 - 4
      arr[i * 3] = spreadX
      arr[i * 3 + 1] = spreadY
      arr[i * 3 + 2] = spreadZ
    }
    return arr
  }, [count])

  const { pointer } = useThree()
  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.014
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      pointer.y * 0.08,
      0.02,
    )
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      pointer.x * 0.75,
      0.03,
    )
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#95c37f"
        transparent
        opacity={0.46}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function DepthBands() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, -1.6, -1.6]} rotation={[-Math.PI / 2.2, 0, 0]}>
        <planeGeometry args={[26, 18]} />
        <meshStandardMaterial color="#192318" roughness={1} metalness={0.04} />
      </mesh>
      <mesh position={[0, 1.8, -3.8]}>
        <planeGeometry args={[26, 12]} />
        <meshStandardMaterial color="#0f1511" transparent opacity={0.78} roughness={0.95} />
      </mesh>
    </group>
  )
}

export function FarmHeroScene() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[1.6rem]">
      <Canvas camera={{ position: [0, 0.7, 8], fov: 42 }} dpr={isMobile ? mobileDpr : desktopDpr} gl={canvasGl}>
        <fog attach="fog" args={['#070806', 6, 14]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 2]} intensity={0.65} color="#d3b78f" />
        <pointLight position={[-5, 0, 4]} intensity={0.35} color="#95c37f" />
        <DepthBands />
        <GrassParticles count={isMobile ? 240 : 680} />
      </Canvas>
    </div>
  )
}
