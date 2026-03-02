import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

/* White aluminum body */
const WHITE_BODY = { color: "#e8eaed", metalness: 0.35, roughness: 0.55 };
/* Soft silver joints */
const SILVER_JOINT = { color: "#b0b5be", metalness: 0.7, roughness: 0.35 };
/* Light gray connectors */
const GRAY_CONN = { color: "#c5c9d0", metalness: 0.5, roughness: 0.45 };
/* Visor */
const VISOR = { color: "#2a3a5c", metalness: 0.25, roughness: 0.15 };
/* Cool blue accent — very subtle */
const ACCENT = { color: "#6499cc", metalness: 0.4, roughness: 0.35 };

function HumanoidRobot() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.012;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.015;
    }
  });

  return (
    <group ref={groupRef} scale={0.95} position={[0, -0.15, 0]}>
      {/* HEAD */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      <mesh position={[0, 1.65, 0.15]}>
        <boxGeometry args={[0.42, 0.12, 0.25]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 1.52, 0.28]}>
        <boxGeometry args={[0.48, 0.07, 0.08]} />
        <meshStandardMaterial {...VISOR} />
      </mesh>
      {/* Subtle sensor dots */}
      <mesh position={[-0.12, 1.52, 0.33]}>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshStandardMaterial color="#7ab0dd" emissive="#7ab0dd" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.12, 1.52, 0.33]}>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshStandardMaterial color="#7ab0dd" emissive="#7ab0dd" emissiveIntensity={0.4} />
      </mesh>
      {/* Chin */}
      <mesh position={[0, 1.4, 0.1]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>

      {/* NECK */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.15, 16]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      <mesh position={[0, 1.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.018, 8, 24]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>

      {/* TORSO */}
      <mesh position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.38, 0.3, 16, 32]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      {/* Chest panel */}
      <mesh position={[0, 0.9, 0.38]}>
        <boxGeometry args={[0.28, 0.16, 0.03]} />
        <meshStandardMaterial {...GRAY_CONN} />
      </mesh>
      {/* Accent stripe */}
      <mesh position={[0, 0.82, 0.39]}>
        <boxGeometry args={[0.2, 0.025, 0.025]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
      {/* Lower torso */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.28, 0.25, 12, 24]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      {/* Waist ring */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.02, 8, 24]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>

      {/* SHOULDERS */}
      <mesh position={[-0.5, 0.95, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      <mesh position={[0.5, 0.95, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      <mesh position={[-0.55, 1.0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      <mesh position={[0.55, 1.0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>

      {/* ARMS */}
      <mesh position={[-0.58, 0.65, 0]}>
        <capsuleGeometry args={[0.07, 0.35, 8, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      <mesh position={[0.58, 0.65, 0]}>
        <capsuleGeometry args={[0.07, 0.35, 8, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      {/* Elbows */}
      <mesh position={[-0.58, 0.42, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      <mesh position={[0.58, 0.42, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      {/* Forearms */}
      <mesh position={[-0.58, 0.18, 0]}>
        <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      <mesh position={[0.58, 0.18, 0]}>
        <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      {/* Hands */}
      <mesh position={[-0.58, -0.02, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial {...GRAY_CONN} />
      </mesh>
      <mesh position={[0.58, -0.02, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial {...GRAY_CONN} />
      </mesh>

      {/* HIPS */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.38, 0.1, 0.24]} />
        <meshStandardMaterial {...GRAY_CONN} />
      </mesh>

      {/* LEGS */}
      <mesh position={[-0.16, 0.15, 0]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      <mesh position={[0.16, 0.15, 0]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      <mesh position={[-0.16, -0.15, 0]}>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      <mesh position={[0.16, -0.15, 0]}>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      {/* Knees */}
      <mesh position={[-0.16, -0.4, 0]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      <mesh position={[0.16, -0.4, 0]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial {...SILVER_JOINT} />
      </mesh>
      {/* Shins */}
      <mesh position={[-0.16, -0.68, 0]}>
        <capsuleGeometry args={[0.07, 0.38, 8, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      <mesh position={[0.16, -0.68, 0]}>
        <capsuleGeometry args={[0.07, 0.38, 8, 16]} />
        <meshStandardMaterial {...WHITE_BODY} />
      </mesh>
      {/* Feet */}
      <mesh position={[-0.16, -0.94, 0.04]}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
        <meshStandardMaterial {...GRAY_CONN} />
      </mesh>
      <mesh position={[0.16, -0.94, 0.04]}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
        <meshStandardMaterial {...GRAY_CONN} />
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
      camera={{ position: [1.5, 0.5, 5.5], fov: 32 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Bright soft key light — upper-left */}
      <directionalLight position={[-4, 6, 5]} intensity={1.6} color="#f5f5fa" />
      {/* Generous fill */}
      <ambientLight intensity={0.6} />
      {/* Subtle rim light */}
      <pointLight position={[5, 2, -3]} intensity={0.5} color="#c8d4e8" />
      {/* Warm bounce from below */}
      <pointLight position={[-1, -2, 4]} intensity={0.2} color="#ede8e0" />

      <HumanoidRobot />

      <ContactShadows
        position={[0, -0.97, 0]}
        opacity={0.2}
        scale={3.5}
        blur={3}
        far={2}
        color="#3a5070"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        dampingFactor={0.07}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.72}
        autoRotate={false}
      />
    </Canvas>
  </Suspense>
);
