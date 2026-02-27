import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
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
      <group ref={groupRef} scale={1.1} position={[0, -0.1, 0]}>
        {/* Head - rounded */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.35} />
        </mesh>
        {/* Face plate */}
        <mesh position={[0, 1.15, 0.35]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#93c5fd" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.15, 1.22, 0.46]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.15, 1.22, 0.46]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={2} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 1.8, 0]}>
          <capsuleGeometry args={[0.025, 0.2, 8, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.95, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#f87171" emissive="#ef4444" emissiveIntensity={1.5} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.8, 0]}>
          <capsuleGeometry args={[0.08, 0.15, 8, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Body - rounded capsule shape */}
        <mesh position={[0, 0.15, 0]}>
          <capsuleGeometry args={[0.5, 0.6, 16, 32]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.55} roughness={0.35} />
        </mesh>
        {/* Chest plate */}
        <mesh position={[0, 0.3, 0.5]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.8} />
        </mesh>
        {/* Shoulders - rounded */}
        <mesh position={[-0.6, 0.5, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.6, 0.5, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.7, 0.15, 0]}>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.7, 0.15, 0]}>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Hands */}
        <mesh position={[-0.7, -0.2, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#93c5fd" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0.7, -0.2, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#93c5fd" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.22, -0.75, 0]}>
          <capsuleGeometry args={[0.1, 0.45, 8, 16]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.55} roughness={0.35} />
        </mesh>
        <mesh position={[0.22, -0.75, 0]}>
          <capsuleGeometry args={[0.1, 0.45, 8, 16]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.55} roughness={0.35} />
        </mesh>
        {/* Feet */}
        <mesh position={[-0.22, -1.08, 0.05]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#1e40af" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.22, -1.08, 0.05]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#1e40af" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

/* Floating accessories around the robot */
function Gear({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[0.2, 0.06, 8, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>
    </Float>
  );
}

function Bolt({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <dodecahedronGeometry args={[0.1]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.2} emissive="#f59e0b" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

function Chip({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.2}>
      <group position={position} scale={scale}>
        <mesh>
          <boxGeometry args={[0.25, 0.04, 0.25]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Pins */}
        {[-0.1, 0, 0.1].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.15]}>
            <boxGeometry args={[0.02, 0.02, 0.06]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Wrench({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.5}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <capsuleGeometry args={[0.03, 0.35, 4, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <torusGeometry args={[0.06, 0.025, 8, 6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

export const FloatingRobot = () => (
  <Canvas camera={{ position: [0, 0.3, 5.5], fov: 38 }} style={{ width: "100%", height: "100%" }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <pointLight position={[-3, 2, 4]} intensity={0.6} color="#38bdf8" />
    <pointLight position={[3, -1, 3]} intensity={0.3} color="#818cf8" />
    <RobotModel />
    {/* Floating accessories */}
    <Gear position={[1.8, 1.2, -0.5]} scale={0.9} />
    <Gear position={[-1.6, -0.5, 0.3]} scale={0.7} />
    <Bolt position={[1.5, -0.8, 0.5]} />
    <Bolt position={[-1.3, 1.5, -0.3]} scale={0.8} />
    <Chip position={[1.9, 0.2, 0.2]} scale={1.1} />
    <Chip position={[-1.7, 0.6, -0.4]} scale={0.8} />
    <Wrench position={[-1.9, -0.9, 0.1]} scale={0.9} />
  </Canvas>
);
