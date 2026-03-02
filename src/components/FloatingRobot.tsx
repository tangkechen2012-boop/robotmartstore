import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

/* ── PBR Materials (Unitree-style white/dark) ── */
function useUnitreeMaterials() {
  return useMemo(() => {
    // Main body — clean white
    const body = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#F0F2F5"),
      metalness: 0.6,
      roughness: 0.22,
      envMapIntensity: 1.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
    });
    // Dark panels (torso front, head sides)
    const dark = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2A2D35"),
      metalness: 0.7,
      roughness: 0.18,
      envMapIntensity: 1.0,
      clearcoat: 0.4,
      clearcoatRoughness: 0.06,
    });
    // Joint / structural gray
    const joint = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#7A7F88"),
      metalness: 0.85,
      roughness: 0.16,
      envMapIntensity: 1.1,
      clearcoat: 0.2,
      clearcoatRoughness: 0.12,
    });
    // Visor — glossy dark
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0a0e18"),
      metalness: 0.5,
      roughness: 0.05,
      envMapIntensity: 1.4,
      clearcoat: 0.9,
      clearcoatRoughness: 0.02,
    });
    // Blue LED accent
    const led = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4FC3F7"),
      emissive: new THREE.Color("#4FC3F7"),
      emissiveIntensity: 0.3,
      metalness: 0.3,
      roughness: 0.4,
    });
    // Light gray connectors
    const conn = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C8CCD2"),
      metalness: 0.75,
      roughness: 0.2,
      envMapIntensity: 1.0,
      clearcoat: 0.15,
      clearcoatRoughness: 0.1,
    });
    return { body, dark, joint, visor, led, conn };
  }, []);
}

/* ── Q-version Unitree Head ── */
function UnitreeHead({ body, dark, visor, led }: Record<string, THREE.Material>) {
  return (
    <group position={[0, 1.65, 0]}>
      {/* Main head shell — large rounded for Q style */}
      <mesh material={body}>
        <sphereGeometry args={[0.38, 48, 48]} />
      </mesh>

      {/* Top helmet ridge */}
      <mesh position={[0, 0.2, 0]} material={body}>
        <capsuleGeometry args={[0.18, 0.2, 12, 24]} />
      </mesh>

      {/* Face plate — Unitree style flat front */}
      <mesh position={[0, -0.04, 0.3]} material={dark}>
        <boxGeometry args={[0.52, 0.28, 0.1]} />
      </mesh>

      {/* Signature wide visor band — Unitree G1 style */}
      <mesh position={[0, 0.0, 0.36]} material={visor}>
        <boxGeometry args={[0.48, 0.06, 0.03]} />
      </mesh>
      {/* Visor rounded caps */}
      <mesh position={[-0.24, 0.0, 0.36]} material={visor} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.03, 14]} />
      </mesh>
      <mesh position={[0.24, 0.0, 0.36]} material={visor} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.03, 14]} />
      </mesh>

      {/* LED status dots in visor */}
      <mesh position={[-0.1, 0.0, 0.38]} material={led}>
        <sphereGeometry args={[0.008, 8, 8]} />
      </mesh>
      <mesh position={[0.1, 0.0, 0.38]} material={led}>
        <sphereGeometry args={[0.008, 8, 8]} />
      </mesh>
      <mesh position={[0, 0.0, 0.38]} material={led}>
        <sphereGeometry args={[0.006, 8, 8]} />
      </mesh>

      {/* Chin — rounded */}
      <mesh position={[0, -0.2, 0.08]} material={body}>
        <sphereGeometry args={[0.22, 24, 24]} />
      </mesh>

      {/* Side vents — Unitree characteristic */}
      <mesh position={[-0.36, -0.04, 0]} material={dark}>
        <boxGeometry args={[0.04, 0.12, 0.14]} />
      </mesh>
      <mesh position={[0.36, -0.04, 0]} material={dark}>
        <boxGeometry args={[0.04, 0.12, 0.14]} />
      </mesh>

      {/* Top LED line */}
      <mesh position={[0, 0.14, 0.36]} material={led}>
        <boxGeometry args={[0.12, 0.005, 0.005]} />
      </mesh>
    </group>
  );
}

/* ── Q-version Unitree Torso ── */
function UnitreeTorso({ body, dark, joint, led, conn }: Record<string, THREE.Material>) {
  return (
    <group>
      {/* Neck — shorter for Q style */}
      <mesh position={[0, 1.28, 0]} material={joint}>
        <cylinderGeometry args={[0.06, 0.08, 0.1, 20]} />
      </mesh>

      {/* Upper torso */}
      <mesh position={[0, 1.0, 0]} material={body}>
        <capsuleGeometry args={[0.32, 0.22, 20, 36]} />
      </mesh>

      {/* Front chest panel — Unitree dark plate */}
      <mesh position={[0, 1.02, 0.32]} material={dark}>
        <boxGeometry args={[0.28, 0.18, 0.02]} />
      </mesh>
      {/* Chest logo area (small rectangle) */}
      <mesh position={[0, 1.04, 0.34]} material={conn}>
        <boxGeometry args={[0.08, 0.03, 0.01]} />
      </mesh>
      {/* Chest LED strip */}
      <mesh position={[0, 0.94, 0.33]} material={led}>
        <boxGeometry args={[0.16, 0.006, 0.006]} />
      </mesh>

      {/* Back panel */}
      <mesh position={[0, 1.0, -0.32]} material={dark}>
        <boxGeometry args={[0.24, 0.16, 0.02]} />
      </mesh>

      {/* Abdomen — narrower */}
      <mesh position={[0, 0.66, 0]} material={body}>
        <capsuleGeometry args={[0.22, 0.18, 14, 28]} />
      </mesh>

      {/* Abdomen segments */}
      {[0.72, 0.66, 0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
          <torusGeometry args={[0.14 - i * 0.012, 0.006, 8, 24]} />
        </mesh>
      ))}

      {/* Waist */}
      <mesh position={[0, 0.52, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
        <torusGeometry args={[0.13, 0.012, 10, 28]} />
      </mesh>
    </group>
  );
}

/* ── Q-version Unitree Arms ── */
function UnitreeArms({ body, dark, joint, conn }: Record<string, THREE.Material>) {
  const sides = [-1, 1] as const;
  return (
    <group>
      {sides.map((s) => (
        <group key={s}>
          {/* Shoulder joint */}
          <mesh position={[s * 0.42, 1.08, 0]} material={joint}>
            <sphereGeometry args={[0.09, 20, 20]} />
          </mesh>
          {/* Shoulder armor — Unitree style rounded cap */}
          <mesh position={[s * 0.46, 1.12, 0]} material={body}>
            <capsuleGeometry args={[0.07, 0.04, 10, 16]} />
          </mesh>

          {/* Upper arm */}
          <mesh position={[s * 0.48, 0.82, 0]} material={body}>
            <capsuleGeometry args={[0.055, 0.26, 10, 18]} />
          </mesh>
          {/* Upper arm dark panel */}
          <mesh position={[s * 0.48, 0.82, s * 0.05]} material={dark}>
            <boxGeometry args={[0.03, 0.16, 0.03]} />
          </mesh>

          {/* Elbow */}
          <mesh position={[s * 0.48, 0.62, 0]} material={joint}>
            <sphereGeometry args={[0.045, 14, 14]} />
          </mesh>

          {/* Forearm */}
          <mesh position={[s * 0.48, 0.42, 0]} material={body}>
            <capsuleGeometry args={[0.045, 0.2, 10, 18]} />
          </mesh>

          {/* Wrist */}
          <mesh position={[s * 0.48, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
            <torusGeometry args={[0.035, 0.006, 8, 16]} />
          </mesh>

          {/* Hand — Unitree 3-finger */}
          <mesh position={[s * 0.48, 0.24, 0]} material={conn}>
            <sphereGeometry args={[0.035, 14, 14]} />
          </mesh>
          {/* Fingers */}
          <mesh position={[s * 0.48, 0.2, 0.015]} material={conn}>
            <boxGeometry args={[0.035, 0.035, 0.012]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Q-version Unitree Legs ── */
function UnitreeLegs({ body, dark, joint, conn }: Record<string, THREE.Material>) {
  const sides = [-1, 1] as const;
  return (
    <group>
      {/* Hip block */}
      <mesh position={[0, 0.42, 0]} material={conn}>
        <boxGeometry args={[0.3, 0.06, 0.18]} />
      </mesh>

      {sides.map((s) => (
        <group key={s}>
          {/* Hip joint */}
          <mesh position={[s * 0.12, 0.34, 0]} material={joint}>
            <sphereGeometry args={[0.06, 14, 14]} />
          </mesh>

          {/* Upper leg */}
          <mesh position={[s * 0.12, 0.1, 0]} material={body}>
            <capsuleGeometry args={[0.065, 0.28, 10, 18]} />
          </mesh>
          {/* Thigh dark panel — Unitree style */}
          <mesh position={[s * 0.12, 0.1, 0.06]} material={dark}>
            <boxGeometry args={[0.04, 0.14, 0.02]} />
          </mesh>

          {/* Knee */}
          <mesh position={[s * 0.12, -0.1, 0]} material={joint}>
            <sphereGeometry args={[0.05, 14, 14]} />
          </mesh>
          {/* Knee cap */}
          <mesh position={[s * 0.12, -0.1, 0.05]} material={dark}>
            <boxGeometry args={[0.045, 0.035, 0.018]} />
          </mesh>

          {/* Shin */}
          <mesh position={[s * 0.12, -0.34, 0]} material={body}>
            <capsuleGeometry args={[0.055, 0.26, 10, 18]} />
          </mesh>
          {/* Shin guard — Unitree blade style */}
          <mesh position={[s * 0.12, -0.32, 0.055]} material={body}>
            <boxGeometry args={[0.04, 0.14, 0.015]} />
          </mesh>

          {/* Ankle */}
          <mesh position={[s * 0.12, -0.52, 0]} material={joint}>
            <sphereGeometry args={[0.035, 12, 12]} />
          </mesh>

          {/* Foot — Unitree flat style */}
          <mesh position={[s * 0.12, -0.57, 0.02]} material={dark}>
            <boxGeometry args={[0.09, 0.035, 0.15]} />
          </mesh>
          {/* Toe pad */}
          <mesh position={[s * 0.12, -0.57, 0.1]} material={conn}>
            <boxGeometry args={[0.07, 0.025, 0.03]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Full Unitree Q-Robot ── */
function UnitreeRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useUnitreeMaterials();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.7) * 0.008;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.01;
    }
  });

  return (
    <group ref={groupRef} scale={0.9} position={[0, 0.0, 0]}>
      <UnitreeHead {...mats} />
      <UnitreeTorso {...mats} />
      <UnitreeArms {...mats} />
      <UnitreeLegs {...mats} />
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
        position: [1.0, 1.5, 4.2],
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
        toneMappingExposure: 1.1,
      }}
      shadows
    >
      <Environment preset="studio" />

      <ambientLight intensity={0.3} />

      <directionalLight
        position={[4, 6, 4]}
        intensity={2.6}
        color="#f8f9ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      <directionalLight position={[-4, 3, 3]} intensity={1.5} color="#e8edf5" />

      <directionalLight position={[-2, 5, -5]} intensity={1.8} color="#dde4f0" />

      <pointLight position={[0, -1, 3]} intensity={0.2} color="#f0ebe0" />

      <UnitreeRobot />

      <ContactShadows
        position={[0, -0.58, 0]}
        opacity={0.16}
        scale={2.8}
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
        target={[0, 1.1, 0]}
      />
    </Canvas>
  </Suspense>
);
