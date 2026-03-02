import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

/* Silver brushed-metal material config */
const SILVER = { color: "#c0c4cc", metalness: 0.85, roughness: 0.28 };
const SILVER_LIGHT = { color: "#d4d7de", metalness: 0.8, roughness: 0.32 };
const SILVER_DARK = { color: "#8a8f99", metalness: 0.9, roughness: 0.22 };
const JOINT = { color: "#6b7280", metalness: 0.92, roughness: 0.18 };
const VISOR = { color: "#1a2744", metalness: 0.3, roughness: 0.1 };
const ACCENT_BLUE = { color: "#3b6fb5", metalness: 0.6, roughness: 0.3 };

function HumanoidRobot() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle idle breathing motion
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.015;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={1.05} position={[0, -0.2, 0]}>
      {/* === HEAD === */}
      {/* Cranium - slightly elongated sphere */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      {/* Forehead panel */}
      <mesh position={[0, 1.65, 0.15]}>
        <boxGeometry args={[0.42, 0.12, 0.25]} />
        <meshStandardMaterial {...SILVER_LIGHT} />
      </mesh>
      {/* Visor / face band */}
      <mesh position={[0, 1.52, 0.28]}>
        <boxGeometry args={[0.48, 0.08, 0.1]} />
        <meshStandardMaterial {...VISOR} />
      </mesh>
      {/* Sensor dots on visor */}
      <mesh position={[-0.12, 1.52, 0.34]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color="#4a90d9" emissive="#4a90d9" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.12, 1.52, 0.34]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color="#4a90d9" emissive="#4a90d9" emissiveIntensity={0.6} />
      </mesh>
      {/* Chin area */}
      <mesh position={[0, 1.4, 0.1]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial {...SILVER_LIGHT} />
      </mesh>

      {/* === NECK === */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.15, 16]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      {/* Neck ring */}
      <mesh position={[0, 1.12, 0]}>
        <torusGeometry args={[0.12, 0.02, 8, 24]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>

      {/* === TORSO === */}
      {/* Upper chest - broad rounded box */}
      <mesh position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.38, 0.3, 16, 32]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      {/* Chest panel detail */}
      <mesh position={[0, 0.9, 0.38]}>
        <boxGeometry args={[0.3, 0.18, 0.04]} />
        <meshStandardMaterial {...SILVER_DARK} />
      </mesh>
      {/* Chest accent stripe */}
      <mesh position={[0, 0.82, 0.39]}>
        <boxGeometry args={[0.22, 0.03, 0.03]} />
        <meshStandardMaterial {...ACCENT_BLUE} />
      </mesh>
      {/* Lower torso / waist */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.28, 0.25, 12, 24]} />
        <meshStandardMaterial {...SILVER_LIGHT} />
      </mesh>
      {/* Waist joint ring */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.025, 8, 24]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>

      {/* === SHOULDERS === */}
      <mesh position={[-0.5, 0.95, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      <mesh position={[0.5, 0.95, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      {/* Shoulder caps */}
      <mesh position={[-0.55, 1.0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      <mesh position={[0.55, 1.0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>

      {/* === ARMS === */}
      {/* Upper arms */}
      <mesh position={[-0.58, 0.65, 0]}>
        <capsuleGeometry args={[0.07, 0.35, 8, 16]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      <mesh position={[0.58, 0.65, 0]}>
        <capsuleGeometry args={[0.07, 0.35, 8, 16]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      {/* Elbow joints */}
      <mesh position={[-0.58, 0.42, 0]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      <mesh position={[0.58, 0.42, 0]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      {/* Forearms */}
      <mesh position={[-0.58, 0.18, 0]}>
        <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
        <meshStandardMaterial {...SILVER_LIGHT} />
      </mesh>
      <mesh position={[0.58, 0.18, 0]}>
        <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
        <meshStandardMaterial {...SILVER_LIGHT} />
      </mesh>
      {/* Hands */}
      <mesh position={[-0.58, -0.02, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial {...SILVER_DARK} />
      </mesh>
      <mesh position={[0.58, -0.02, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial {...SILVER_DARK} />
      </mesh>

      {/* === HIPS === */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.25]} />
        <meshStandardMaterial {...SILVER_DARK} />
      </mesh>

      {/* === LEGS === */}
      {/* Hip joints */}
      <mesh position={[-0.16, 0.15, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      <mesh position={[0.16, 0.15, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      {/* Upper legs */}
      <mesh position={[-0.16, -0.15, 0]}>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      <mesh position={[0.16, -0.15, 0]}>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      {/* Knee joints */}
      <mesh position={[-0.16, -0.4, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      <mesh position={[0.16, -0.4, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial {...JOINT} />
      </mesh>
      {/* Lower legs */}
      <mesh position={[-0.16, -0.68, 0]}>
        <capsuleGeometry args={[0.07, 0.38, 8, 16]} />
        <meshStandardMaterial {...SILVER_LIGHT} />
      </mesh>
      <mesh position={[0.16, -0.68, 0]}>
        <capsuleGeometry args={[0.07, 0.38, 8, 16]} />
        <meshStandardMaterial {...SILVER_LIGHT} />
      </mesh>
      {/* Feet */}
      <mesh position={[-0.16, -0.94, 0.04]}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
        <meshStandardMaterial {...SILVER_DARK} />
      </mesh>
      <mesh position={[0.16, -0.94, 0.04]}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
        <meshStandardMaterial {...SILVER_DARK} />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export const FloatingRobot = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Canvas
      camera={{ position: [0, 0.4, 4.5], fov: 35 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Soft key light from top-left */}
      <directionalLight position={[-3, 5, 4]} intensity={1.2} color="#f0f0f5" />
      {/* Fill light */}
      <ambientLight intensity={0.4} />
      {/* Rim light for metallic edge highlights */}
      <pointLight position={[4, 2, -3]} intensity={0.8} color="#b8c4e0" />
      {/* Subtle warm bounce */}
      <pointLight position={[-2, -1, 3]} intensity={0.25} color="#e8e0d8" />

      <HumanoidRobot />

      {/* Soft ground shadow */}
      <ContactShadows
        position={[0, -0.97, 0]}
        opacity={0.3}
        scale={3}
        blur={2.5}
        far={2}
        color="#1a2744"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={7}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.7}
        autoRotate={false}
      />
    </Canvas>
  </Suspense>
);
