import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <group ref={groupRef} scale={1.2}>
        {/* Head */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[1, 0.8, 0.8]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.25, 1.3, 0.41]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.25, 1.3, 0.41]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={2} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 1.75, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.95, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#f87171" emissive="#ef4444" emissiveIntensity={1.5} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.2, 1.2, 0.9]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Chest plate */}
        <mesh position={[0, 0.3, 0.46]}>
          <circleGeometry args={[0.25, 32]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1} />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.85, 0.3, 0]}>
          <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.85, 0.3, 0]}>
          <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.3, -0.8, 0]}>
          <capsuleGeometry args={[0.13, 0.5, 8, 16]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.3, -0.8, 0]}>
          <capsuleGeometry args={[0.13, 0.5, 8, 16]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export const FloatingRobot = () => (
  <Canvas camera={{ position: [0, 0.5, 5], fov: 40 }} style={{ width: "100%", height: "100%" }}>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <pointLight position={[-3, 2, 4]} intensity={0.8} color="#38bdf8" />
    <RobotModel />
  </Canvas>
);
