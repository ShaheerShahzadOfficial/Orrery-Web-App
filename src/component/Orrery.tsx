import React, { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { SolarSystem } from './SolarSystem'
import { NEOCloud } from './NEOCloud'
import * as THREE from 'three'


const InfiniteStars = () => {
  const starFieldRef = useRef(null);

  // Function to reset star positions based on camera movement
  useFrame(({ camera }) => {
    const { position } = camera;

    // Logic to reposition stars when they move beyond a certain depth
    if (starFieldRef.current) {
      starFieldRef.current.position.z = -Math.floor(position.z / 100) * 100; // Adjust this value as needed
    }
  });

  return (
    <group ref={starFieldRef}>
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
    </group>
  );
};


export default function Orrery() {
  const controlsRef = useRef(null)
  const [selectedBody, setSelectedBody] = useState<THREE.Vector3 | null>(null)

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 50, 100], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={1} />
          <Stars radius={300} depth={60} count={20000} factor={10} saturation={0} fade />
          <SolarSystem setSelectedBody={setSelectedBody} />
          <NEOCloud />
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            target={selectedBody || new THREE.Vector3(0, 0, 0)} // Focus on the selected body
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
