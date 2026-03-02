import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

/* ── PBR Materials ── */
function useBodyMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#F2F5F9"),
        metalness: 1.0,
        roughness: 0.16,
        envMapIntensity: 1.35,
        clearcoat: 0.35,
        clearcoatRoughness: 0.08,
      }),
    []
  );
}

function useJointMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#9CA3AF"),
        metalness: 0.95,
        roughness: 0.14,
        envMapIntensity: 1.2,
        clearcoat: 0.25,
        clearcoatRoughness: 0.12,
      }),
    []
  );
}

function useVisorMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1e293b"),
        metalness: 0.6,
        roughness: 0.1,
        envMapIntensity: 0.8,
        clearcoat: 0.6,
        clearcoatRoughness: 0.05,
      }),
    []
  );
}

function useAccentMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#6EC6FF"),
        emissive: new THREE.Color("#6EC6FF"),
        emissiveIntensity: 0.25,
        metalness: 0.5,
        roughness: 0.3,
      }),
    []
  );
}

function useConnectorMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#D1D5DB"),
        metalness: 0.85,
        roughness: 0.2,
        envMapIntensity: 1.1,
        clearcoat: 0.2,
        clearcoatRoughness: 0.1,
      }),
    []
  );
}

/* ── Q-Stylized Robot ── */
function HumanoidRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const body = useBodyMaterial();
  const joint = useJointMaterial();
  const visor = useVisorMaterial();
  const accent = useAccentMaterial();
  const conn = useConnectorMaterial();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.7) * 0.008;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.01;
    }
  });

  return (
    <group ref={groupRef} scale={0.88} position={[0, -0.05, 0]}>
      {/* ── HEAD (proportionally larger ~30%) ── */}
      <mesh position={[0, 1.62, 0]} material={body}>
        <sphereGeometry args={[0.36, 40, 40]} />
      </mesh>
      {/* Top crest */}
      <mesh position={[0, 1.78, 0.08]} material={body}>
        <boxGeometry args={[0.44, 0.1, 0.28]} />
      </mesh>
      {/* Chin */}
      <mesh position={[0, 1.44, 0.08]} material={body}>
        <sphereGeometry args={[0.24, 28, 28]} />
      </mesh>
      {/* Visor slot */}
      <mesh position={[0, 1.58, 0.32]} material={visor}>
        <boxGeometry args={[0.5, 0.065, 0.06]} />
      </mesh>
      {/* Status indicators */}
      <mesh position={[-0.14, 1.58, 0.36]} material={accent}>
        <sphereGeometry args={[0.01, 8, 8]} />
      </mesh>
      <mesh position={[0.14, 1.58, 0.36]} material={accent}>
        <sphereGeometry args={[0.01, 8, 8]} />
      </mesh>
      {/* Thin accent line on forehead */}
      <mesh position={[0, 1.72, 0.34]} material={accent}>
        <boxGeometry args={[0.18, 0.008, 0.008]} />
      </mesh>

      {/* ── NECK ── */}
      <mesh position={[0, 1.28, 0]} material={joint}>
        <cylinderGeometry args={[0.07, 0.09, 0.12, 20]} />
      </mesh>
      <mesh position={[0, 1.22, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
        <torusGeometry args={[0.11, 0.015, 10, 28]} />
      </mesh>

      {/* ── TORSO ── */}
      <mesh position={[0, 0.92, 0]} material={body}>
        <capsuleGeometry args={[0.36, 0.28, 20, 36]} />
      </mesh>
      {/* Chest panel */}
      <mesh position={[0, 0.96, 0.36]} material={conn}>
        <boxGeometry args={[0.24, 0.14, 0.025]} />
      </mesh>
      {/* Accent stripe on chest */}
      <mesh position={[0, 0.88, 0.37]} material={accent}>
        <boxGeometry args={[0.16, 0.012, 0.012]} />
      </mesh>
      {/* Lower torso */}
      <mesh position={[0, 0.56, 0]} material={body}>
        <capsuleGeometry args={[0.26, 0.22, 14, 28]} />
      </mesh>
      {/* Waist ring */}
      <mesh position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
        <torusGeometry args={[0.16, 0.018, 10, 28]} />
      </mesh>

      {/* ── SHOULDERS ── */}
      <mesh position={[-0.48, 1.02, 0]} material={joint}>
        <sphereGeometry args={[0.11, 20, 20]} />
      </mesh>
      <mesh position={[0.48, 1.02, 0]} material={joint}>
        <sphereGeometry args={[0.11, 20, 20]} />
      </mesh>
      <mesh position={[-0.52, 1.06, 0]} material={body}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>
      <mesh position={[0.52, 1.06, 0]} material={body}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>

      {/* ── ARMS (5-10% shorter) ── */}
      {/* Upper arms */}
      <mesh position={[-0.54, 0.74, 0]} material={body}>
        <capsuleGeometry args={[0.065, 0.3, 10, 18]} />
      </mesh>
      <mesh position={[0.54, 0.74, 0]} material={body}>
        <capsuleGeometry args={[0.065, 0.3, 10, 18]} />
      </mesh>
      {/* Elbows */}
      <mesh position={[-0.54, 0.52, 0]} material={joint}>
        <sphereGeometry args={[0.055, 14, 14]} />
      </mesh>
      <mesh position={[0.54, 0.52, 0]} material={joint}>
        <sphereGeometry args={[0.055, 14, 14]} />
      </mesh>
      {/* Forearms */}
      <mesh position={[-0.54, 0.3, 0]} material={body}>
        <capsuleGeometry args={[0.055, 0.26, 10, 18]} />
      </mesh>
      <mesh position={[0.54, 0.3, 0]} material={body}>
        <capsuleGeometry args={[0.055, 0.26, 10, 18]} />
      </mesh>
      {/* Hands */}
      <mesh position={[-0.54, 0.12, 0]} material={conn}>
        <sphereGeometry args={[0.048, 14, 14]} />
      </mesh>
      <mesh position={[0.54, 0.12, 0]} material={conn}>
        <sphereGeometry args={[0.048, 14, 14]} />
      </mesh>

      {/* ── HIPS ── */}
      <mesh position={[0, 0.3, 0]} material={conn}>
        <boxGeometry args={[0.34, 0.09, 0.22]} />
      </mesh>

      {/* ── LEGS (5-10% shorter) ── */}
      {/* Hip joints */}
      <mesh position={[-0.14, 0.22, 0]} material={joint}>
        <sphereGeometry args={[0.07, 14, 14]} />
      </mesh>
      <mesh position={[0.14, 0.22, 0]} material={joint}>
        <sphereGeometry args={[0.07, 14, 14]} />
      </mesh>
      {/* Upper legs */}
      <mesh position={[-0.14, -0.04, 0]} material={body}>
        <capsuleGeometry args={[0.075, 0.34, 10, 18]} />
      </mesh>
      <mesh position={[0.14, -0.04, 0]} material={body}>
        <capsuleGeometry args={[0.075, 0.34, 10, 18]} />
      </mesh>
      {/* Knees */}
      <mesh position={[-0.14, -0.26, 0]} material={joint}>
        <sphereGeometry args={[0.06, 14, 14]} />
      </mesh>
      <mesh position={[0.14, -0.26, 0]} material={joint}>
        <sphereGeometry args={[0.06, 14, 14]} />
      </mesh>
      {/* Shins */}
      <mesh position={[-0.14, -0.52, 0]} material={body}>
        <capsuleGeometry args={[0.065, 0.32, 10, 18]} />
      </mesh>
      <mesh position={[0.14, -0.52, 0]} material={body}>
        <capsuleGeometry args={[0.065, 0.32, 10, 18]} />
      </mesh>
      {/* Ankles */}
      <mesh position={[-0.14, -0.72, 0]} material={joint}>
        <sphereGeometry args={[0.045, 12, 12]} />
      </mesh>
      <mesh position={[0.14, -0.72, 0]} material={joint}>
        <sphereGeometry args={[0.045, 12, 12]} />
      </mesh>
      {/* Feet */}
      <mesh position={[-0.14, -0.78, 0.03]} material={conn}>
        <boxGeometry args={[0.11, 0.05, 0.18]} />
      </mesh>
      <mesh position={[0.14, -0.78, 0.03]} material={conn}>
        <boxGeometry args={[0.11, 0.05, 0.18]} />
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
      camera={{
        position: [1.1, 1.6, 4.4],
        fov: 32,
        near: 0.1,
        far: 100,
      }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      shadows
    >
      {/* Studio HDRI for polished metal reflections */}
      <Environment preset="studio" />

      {/* Ambient fill */}
      <ambientLight intensity={0.25} />

      {/* Key light — upper-right-front */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.8}
        color="#f8f9ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Fill from left */}
      <directionalLight
        position={[-4, 3, 3]}
        intensity={1.4}
        color="#e8edf5"
      />

      {/* Rim light — behind & above */}
      <directionalLight
        position={[-2, 5, -5]}
        intensity={2.0}
        color="#dde4f0"
      />

      {/* Warm bottom bounce */}
      <pointLight position={[0, -1, 3]} intensity={0.15} color="#f0ebe0" />

      <HumanoidRobot />

      <ContactShadows
        position={[0, -0.82, 0]}
        opacity={0.18}
        scale={3}
        blur={2.5}
        far={1.5}
        color="#2a3a5c"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.08}
        rotateSpeed={0.65}
        zoomSpeed={0.9}
        minDistance={3.2}
        maxDistance={6.0}
        minPolarAngle={0.55}
        maxPolarAngle={1.45}
        target={[0, 1.25, 0]}
      />
    </Canvas>
  </Suspense>
);
