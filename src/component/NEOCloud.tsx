import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function NEOCloud() {
  const ref = useRef<THREE.Points>(null)

  const neoCount = 300
  const neoRadius = 30

  // Generate positions for the Near Earth Objects (NEOs)
  const neoPositions = useMemo(() => {
    const positions = new Float32Array(neoCount * 3)
    for (let i = 0; i < neoCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = Math.random() * neoRadius + 15 // Start from Earth's orbit

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [])

  // Animation loop
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005 // Slowly rotate the NEO cloud
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position" // Correct way to attach the attribute
          count={neoCount}
          array={neoPositions} // Use the generated positions array
          itemSize={3} // Each position has x, y, and z
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#f00" sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}
