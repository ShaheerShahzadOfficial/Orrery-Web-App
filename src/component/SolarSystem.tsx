import { CelestialBody } from "./CelestialBody.tsx";

const planets = [
  {
    name: "Mercury",
    radius: 0.383,
    distance: 5.7,
    color: "#7F7F7F",
    rotationSpeed: 0.1,
    orbitSpeed: 0.4,
  },
  {
    name: "Venus",
    radius: 0.949,
    distance: 10.8,
    color: "#E3C8A0",
    rotationSpeed: 0.067,
    orbitSpeed: 0.15,
  },
  {
    name: "Earth",
    radius: 1,
    distance: 15,
    color: "#2E8BC0",
    rotationSpeed: 0.05,
    orbitSpeed: 0.1,
  },
  {
    name: "Mars",
    radius: 0.532,
    distance: 22.8,
    color: "#C1440E",
    rotationSpeed: 0.033,
    orbitSpeed: 0.08,
  },
  {
    name: "Jupiter",
    radius: 11.21,
    distance: 77.8,
    color: "#D89C63",
    rotationSpeed: 0.017,
    orbitSpeed: 0.02,
  },
  {
    name: "Saturn",
    radius: 9.45,
    distance: 143,
    color: "#D9C88D",
    rotationSpeed: 0.01,
    orbitSpeed: 0.009,
  },
  {
    name: "Uranus",
    radius: 4,
    distance: 287,
    color: "#A0D8E6",
    rotationSpeed: 0.007,
    orbitSpeed: 0.004,
  },
  {
    name: "Neptune",
    radius: 3.88,
    distance: 450,
    color: "#4B6BBE",
    rotationSpeed: 0.005,
    orbitSpeed: 0.001,
  },
];

export function SolarSystem({ setSelectedBody }:{setSelectedBody:any}) {
  return (
    <>
      <CelestialBody
        name="Sun"
        radius={5}
        color="#FDB813"
        emissive="#FDB813"
        emissiveIntensity={1}
        setSelectedBody={setSelectedBody}
      />
      {planets.map((planet) => (
        <CelestialBody
          key={planet.name}
          {...planet}
          setSelectedBody={setSelectedBody}
          emissiveIntensity={1}
        />
      ))}
    </>
  );
}
