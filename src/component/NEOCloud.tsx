// import { useRef, useMemo, useState, useEffect, useLayoutEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import { Text } from '@react-three/drei';
// import axios from 'axios';

// // Define the structure of the NEO data
// interface NEO {
//   id: string
//   name: string
//   estimated_diameter: {
//     kilometers: {
//       estimated_diameter_min: number
//       estimated_diameter_max: number
//     }
//   }
//   is_potentially_hazardous_asteroid: boolean
//   close_approach_data: Array<{
//     miss_distance: {
//       astronomical: string
//     }
//   }>
// }

// export function NEOCloud() {
//   const ref = useRef<THREE.Points>(null);
//   const [neoData, setNeoData] = useState<NEO[]>([]);

// useLayoutEffect(() => {
  
// (
//   async()=>{
//     await axios.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-07&end_date=2024-10-01&api_key=DEMO_KEY').then(({data})=>{
//       setNeoData([data?.near_earth_objects])

//       // console.log([...data['near_earth_objects']])
//     }).catch((error)=>{
//       console.error(error|| "Nasa API issue")
//     })
//   }
// )()
  
// }, [])


//   const { positions, namePositions, colors } = useMemo(() => {
//     const positions: number[] = []
//     const namePositions: [number, number, number][] = []
//     const colors: number[] = []
//     const validNEOs: NEO[] = []

//     neoData.forEach((neo) => {
//       const distance = parseFloat(neo?.close_approach_data?.[0]?.miss_distance?.astronomical ?? '0')
//       if (!isNaN(distance) && isFinite(distance)) {
//         const r = Math.log(distance + 1) * 10 // Logarithmic scale to handle large distance variations

//         const theta = Math.random() * Math.PI * 2
//         const phi = Math.acos(2 * Math.random() - 1)
        
//         const x = r * Math.sin(phi) * Math.cos(theta)
//         const y = r * Math.sin(phi) * Math.sin(theta)
//         const z = r * Math.cos(phi)

//         positions.push(x, y, z)
//         namePositions.push([x, y + 0.5, z])

//         const color = neo.is_potentially_hazardous_asteroid ? [1, 0, 0] : [0, 1, 0]
//         colors.push(...color)

//         validNEOs.push(neo)
//       }
//     })

//     return {
//       positions: new Float32Array(positions),
//       namePositions,
//       colors: new Float32Array(colors),
//       validNEOs
//     }
//   }, [neoData])
//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.0005
//     }
//   })
//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.0005;
//     }
//   });

//   if (neoData.length === 0) return null;

//   return (
//     <>
// <points ref={ref}>
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             count={neoData.length}
//             array={positions}
//             itemSize={3}
//           />
//           <bufferAttribute
//             attach="attributes-color"
//             count={neoData.length}
//             array={colors}
//             itemSize={3}
//           />
//         </bufferGeometry>
//         <pointsMaterial size={0.5} vertexColors sizeAttenuation transparent opacity={0.8} />
//       </points>
//       {neoData.map((neo, index) => {
//         const [x, y, z] = namePositions[index]
//         const color = neo.is_potentially_hazardous_asteroid ? "#ff0000" : "#00ff00"
//         const label = neo.is_potentially_hazardous_asteroid ? "Hazardous" : "Non-hazardous"

//         return (
//           <group key={index}>
//             <Text
//               position={[x, y, z]}
//               fontSize={0.3}
//               color={color}
//               anchorX="center"
//               anchorY="middle"
//             >
//               {neo.name}
//             </Text>
//             <Text
//               position={[x, y + 0.5, z]}
//               fontSize={0.2}
//               color={color}
//               anchorX="center"
//               anchorY="middle"
//             >
//               {label}
//             </Text>
//           </group>
//         )
//       })}
//     </>
//   );
// }


import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import axios from 'axios'

interface NEO {
  id: string
  name: string
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: Array<{
    miss_distance: {
      astronomical: string
    }
  }>
}

export function NEOCloud() {
  const ref = useRef<THREE.Points>(null)
  const [neoData, setNeoData] = useState<NEO[]>([])

  useEffect(() => {
    const fetchNEOData = async () => {
      try {
        const response = await axios.get(
          'https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-07&api_key=DEMO_KEY'
        )
        const allNeos = Object.values(response.data.near_earth_objects).flat()
        setNeoData(allNeos as NEO[])
      } catch (error) {
        console.error('Error fetching NEO data:', error)
      }
    }

    fetchNEOData()
  }, [])

  const { positions, namePositions, colors, validNEOs } = useMemo(() => {
    const positions: number[] = []
    const namePositions: [number, number, number][] = []
    const colors: number[] = []
    const validNEOs: NEO[] = []

    neoData.forEach((neo) => {
      const distance = parseFloat(neo.close_approach_data?.[0]?.miss_distance?.astronomical ?? '0')
      if (!isNaN(distance) && isFinite(distance)) {
        const scaleFactor = 400 // Adjust this value to scale the NEO cloud
        const r = Math.log(distance + 1) * scaleFactor

        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.sin(phi) * Math.sin(theta)
        const z = r * Math.cos(phi)

        positions.push(x, y, z)
        namePositions.push([x, y + 5, z])

        const color = neo.is_potentially_hazardous_asteroid ? [1, 0, 0] : [0, 1, 0]
        colors.push(...color)

        validNEOs.push(neo)
      }
    })

    return {
      positions: new Float32Array(positions),
      namePositions,
      colors: new Float32Array(colors),
      validNEOs
    }
  }, [neoData])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0001
    }
  })

  if (validNEOs.length === 0) return null

  return (
    <>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={1} vertexColors sizeAttenuation transparent opacity={0.8} />
      </points>
      {validNEOs.map((neo, index) => {
        const [x, y, z] = namePositions[index]
        const color = neo.is_potentially_hazardous_asteroid ? "#ff0000" : "#00ff00"
        const label = neo.is_potentially_hazardous_asteroid ? "Hazardous" : "Non-hazardous"
        const diameter = neo.estimated_diameter?.kilometers?.estimated_diameter_max ?? 0
        const formattedDiameter = diameter.toFixed(2)

        return (
          <group key={neo.id}>
            <Text
              position={[x, y, z]}
              fontSize={0.3}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {neo.name}
            </Text>
            <Text
              position={[x, y + 5, z]}
              fontSize={0.2}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {label.split(' ')[1]}
            </Text>
            <Text
              position={[x, y - 5, z]}
              fontSize={0.1}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {`Diameter: ${formattedDiameter} km`}
            </Text>
          </group>
        )
      })}
    </>
  )
}