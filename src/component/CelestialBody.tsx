import  { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Ring, Text } from '@react-three/drei'
import * as THREE from 'three'

interface CelestialBodyProps {
  name: string
  radius: number
  distance?: number
  color: string
  rotationSpeed?: number
  orbitSpeed?: number
  emissive?: string
  emissiveIntensity?: number
  setSelectedBody?: (position: THREE.Vector3) => void
}

export function CelestialBody({
  name,
  radius,
  distance = 0,
  color,
  rotationSpeed = 0,
  orbitSpeed = 0,
  emissive,
  emissiveIntensity = 0,
  setSelectedBody,
}: CelestialBodyProps) {
  const ref = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current && distance > 0) {
      const angle = state.clock.getElapsedTime() * orbitSpeed
      ref.current.position.x = Math.cos(angle) * distance
      ref.current.position.z = Math.sin(angle) * distance
    }
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed
    }
  })

  return (
    <>
      <Sphere
        ref={ref}
        args={[radius, 36, 36]}
        position={[distance, 0, 0]}
        onClick={() => {
          if (ref.current && setSelectedBody) {
            const position = new THREE.Vector3()
            ref.current.getWorldPosition(position)
            setSelectedBody(position)
          }
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={emissive || color}
          emissiveIntensity={emissiveIntensity}
        />
      </Sphere>
      {distance > 0 && (
        <Ring ref={orbitRef} args={[distance - 0.5, distance + 0.5, 64]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#FFFFFF" opacity={0.3} transparent side={THREE.DoubleSide} />
        </Ring>
      )}
      <Text
        position={[distance, radius + 1, 0]}
        fontSize={0.6}
        font={'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Me5Q.ttf'}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </>
  )
}
