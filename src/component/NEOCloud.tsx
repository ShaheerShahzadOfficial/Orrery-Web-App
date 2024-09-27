import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { apiClient } from '../axios';

// Define the structure of the NEO data
interface NEO {
  date: string;
  diameter: number;
  distance: string;
  id: string;
  name: string;
}

export function NEOCloud() {
  const ref = useRef<THREE.Points>(null);
  const [neoData, setNeoData] = useState<NEO[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get<NEO[]>("/data");
        console.log(data); // Check the data structure here
        setNeoData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Calculate positions for the NEOs and their labels
  const positions = useMemo(() => {
    if (neoData.length === 0) return new Float32Array(0);

    const positions = new Float32Array(neoData.length * 3);
    const namePositions: [number, number, number][] = []; // Store positions for names

    neoData.forEach((neo, index) => {
      const distance = parseFloat(neo.distance);
      const r = distance / 1e6; // Adjust this scale as needed

      // Calculate position
      const x = r * Math.sin(Math.random() * Math.PI * 2) * Math.cos(Math.random() * Math.PI);
      const y = r * Math.sin(Math.random() * Math.PI * 2) * Math.sin(Math.random() * Math.PI);
      const z = r * Math.cos(Math.random() * Math.PI);

      // Store position for points
      positions.set([x, y, z], index * 3);
      // Store position for names (slightly above the NEO)
      namePositions.push([x, y + 1, z]); // Raise the name slightly above the point
    });

    return { positions, namePositions };
  }, [neoData]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
    }
  });

  if (neoData.length === 0) return null;

  return (
    <>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={neoData.length}
            array={positions.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.5} color="#f00" sizeAttenuation transparent opacity={0.8} />
      </points>
      {neoData.map((neo, index) => {
        const [x, y, z] = positions.namePositions[index];

        return (
          <Text
            key={neo.id}
            position={[x, y, z]} // Position the text directly above the NEO
            fontSize={0.5}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {neo.name}
          </Text>
        );
      })}
    </>
  );
}
