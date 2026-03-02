import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

function useG1Materials() {
  return useMemo(() => {
    // Polished silver body
    const body = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#D0D4DA"),
      metalness: 1.0,
      roughness: 0.14,
      envMapIntensity: 1.4,
      clearcoat: 0.4,
      clearcoatRoughness: 0.06,
    });
    // Dark panels / structural
    const dark = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1a1d24"),
      metalness: 0.7,
      roughness: 0.2,
      envMapIntensity: 0.8,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
    });
    // Joint gray
    const joint = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6B7280"),
      metalness: 0.9,
      roughness: 0.15,
      envMapIntensity: 1.1,
      clearcoat: 0.2,
      clearcoatRoughness: 0.1,
    });
    // Glowing blue visor
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#40C4FF"),
      emissive: new THREE.Color("#40C4FF"),
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.05,
      clearcoat: 0.8,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: 0.85,
    });
    // Black hands/feet
    const blackPart = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#15171c"),
      metalness: 0.5,
      roughness: 0.35,
      envMapIntensity: 0.6,
    });
    // Blue LED dots
    const led = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4FC3F7"),
      emissive: new THREE.Color("#4FC3F7"),
      emissiveIntensity: 0.35,
      metalness: 0.3,
      roughness: 0.4,
    });
    // Light connector
    const conn = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#B8BCC4"),
      metalness: 0.85,
      roughness: 0.18,
      envMapIntensity: 1.0,
      clearcoat: 0.15,
      clearcoatRoughness: 0.1,
    });
    return { body, dark, joint, visor, blackPart, led, conn };
  }, []);
}

/* ── G1 Head — motorcycle helmet with blue visor ── */
function G1Head(m: Record<string, THREE.Material>) {
  return (
    <group position={[0, 1.72, 0]}>
      {/* Main helmet */}
      <mesh material={m.body}>
        <sphereGeometry args={[0.22, 48, 48]} />
      </mesh>
      {/* Helmet top extension */}
      <mesh position={[0, 0.08, -0.02]} material={m.body}>
        <capsuleGeometry args={[0.14, 0.12, 14, 24]} />
      </mesh>
      {/* Helmet back */}
      <mesh position={[0, 0.04, -0.1]} material={m.body}>
        <sphereGeometry args={[0.18, 32, 32]} />
      </mesh>

      {/* Visor band — wrapping blue glow */}
      <mesh position={[0, 0.06, 0.16]} material={m.visor}>
        <boxGeometry args={[0.34, 0.04, 0.06]} />
      </mesh>
      {/* Visor curved sides */}
      <mesh position={[-0.17, 0.06, 0.12]} material={m.visor} rotation={[0, 0.6, 0]}>
        <boxGeometry args={[0.08, 0.04, 0.04]} />
      </mesh>
      <mesh position={[0.17, 0.06, 0.12]} material={m.visor} rotation={[0, -0.6, 0]}>
        <boxGeometry args={[0.08, 0.04, 0.04]} />
      </mesh>
      {/* Visor top arc */}
      <mesh position={[0, 0.12, 0.12]} material={m.visor}>
        <boxGeometry args={[0.2, 0.02, 0.04]} />
      </mesh>

      {/* Face plate — dark */}
      <mesh position={[0, -0.04, 0.18]} material={m.dark}>
        <boxGeometry args={[0.3, 0.12, 0.05]} />
      </mesh>

      {/* Chin */}
      <mesh position={[0, -0.12, 0.06]} material={m.body}>
        <sphereGeometry args={[0.14, 24, 24]} />
      </mesh>

      {/* Side cameras / sensors */}
      <mesh position={[-0.22, 0.0, 0.02]} material={m.dark}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
      </mesh>
      <mesh position={[0.22, 0.0, 0.02]} material={m.dark}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
      </mesh>
    </group>
  );
}

/* ── G1 Neck + Torso ── */
function G1Torso(m: Record<string, THREE.Material>) {
  return (
    <group>
      {/* Neck */}
      <mesh position={[0, 1.5, 0]} material={m.joint}>
        <cylinderGeometry args={[0.055, 0.07, 0.08, 20]} />
      </mesh>

      {/* Upper torso — broad chest */}
      <mesh position={[0, 1.26, 0]} material={m.body}>
        <capsuleGeometry args={[0.3, 0.2, 20, 36]} />
      </mesh>
      {/* Chest front plate */}
      <mesh position={[0, 1.3, 0.3]} material={m.body}>
        <boxGeometry args={[0.32, 0.22, 0.02]} />
      </mesh>
      {/* Chest logo area */}
      <mesh position={[0, 1.32, 0.32]} material={m.dark}>
        <boxGeometry args={[0.12, 0.03, 0.01]} />
      </mesh>
      {/* Chest LED indicators (green dots like in image) */}
      <mesh position={[-0.02, 1.24, 0.32]} material={m.led}>
        <sphereGeometry args={[0.006, 8, 8]} />
      </mesh>
      <mesh position={[0.02, 1.24, 0.32]} material={m.led}>
        <sphereGeometry args={[0.006, 8, 8]} />
      </mesh>

      {/* Back plate */}
      <mesh position={[0, 1.28, -0.3]} material={m.body}>
        <boxGeometry args={[0.28, 0.2, 0.02]} />
      </mesh>
      {/* Battery pack hint on back */}
      <mesh position={[0, 1.2, -0.32]} material={m.dark}>
        <boxGeometry args={[0.16, 0.1, 0.03]} />
      </mesh>

      {/* Mid torso — narrowing */}
      <mesh position={[0, 0.98, 0]} material={m.body}>
        <capsuleGeometry args={[0.22, 0.14, 14, 28]} />
      </mesh>

      {/* Waist — narrow */}
      <mesh position={[0, 0.82, 0]} material={m.joint}>
        <cylinderGeometry args={[0.14, 0.18, 0.08, 20]} />
      </mesh>

      {/* Hip frame */}
      <mesh position={[0, 0.74, 0]} material={m.body}>
        <boxGeometry args={[0.34, 0.1, 0.2]} />
      </mesh>

      {/* LED dot on hip */}
      <mesh position={[0, 0.74, 0.11]} material={m.led}>
        <sphereGeometry args={[0.008, 8, 8]} />
      </mesh>
    </group>
  );
}

/* ── G1 Arms ── */
function G1Arms(m: Record<string, THREE.Material>) {
  const sides = [-1, 1] as const;
  return (
    <group>
      {sides.map((s) => (
        <group key={s}>
          {/* Shoulder joint — round */}
          <mesh position={[s * 0.38, 1.36, 0]} material={m.joint}>
            <sphereGeometry args={[0.08, 20, 20]} />
          </mesh>
          {/* Shoulder cap */}
          <mesh position={[s * 0.42, 1.38, 0]} material={m.body}>
            <sphereGeometry args={[0.065, 18, 18]} />
          </mesh>

          {/* Upper arm — silver */}
          <mesh position={[s * 0.44, 1.12, 0]} material={m.body}>
            <capsuleGeometry args={[0.055, 0.28, 10, 18]} />
          </mesh>

          {/* Elbow joint — exposed */}
          <mesh position={[s * 0.44, 0.92, 0]} material={m.joint}>
            <sphereGeometry args={[0.045, 14, 14]} />
          </mesh>
          {/* Elbow mechanism detail */}
          <mesh position={[s * 0.44, 0.92, 0]} rotation={[0, 0, Math.PI / 2]} material={m.dark}>
            <cylinderGeometry args={[0.035, 0.035, 0.04, 12]} />
          </mesh>

          {/* Forearm — silver */}
          <mesh position={[s * 0.44, 0.72, 0]} material={m.body}>
            <capsuleGeometry args={[0.045, 0.22, 10, 18]} />
          </mesh>

          {/* Wrist joint */}
          <mesh position={[s * 0.44, 0.56, 0]} material={m.joint}>
            <cylinderGeometry args={[0.03, 0.035, 0.03, 14]} />
          </mesh>

          {/* Hand — black */}
          <mesh position={[s * 0.44, 0.5, 0]} material={m.blackPart}>
            <boxGeometry args={[0.06, 0.06, 0.04]} />
          </mesh>
          {/* Fingers */}
          <mesh position={[s * 0.44, 0.45, 0.01]} material={m.blackPart}>
            <boxGeometry args={[0.055, 0.04, 0.03]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── G1 Legs ── */
function G1Legs(m: Record<string, THREE.Material>) {
  const sides = [-1, 1] as const;
  return (
    <group>
      {sides.map((s) => (
        <group key={s}>
          {/* Hip joint */}
          <mesh position={[s * 0.13, 0.66, 0]} material={m.joint}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>

          {/* Upper leg — silver, thick */}
          <mesh position={[s * 0.13, 0.42, 0]} material={m.body}>
            <capsuleGeometry args={[0.07, 0.3, 12, 20]} />
          </mesh>
          {/* Thigh LED */}
          <mesh position={[s * 0.13, 0.4, 0.07]} material={m.led}>
            <sphereGeometry args={[0.007, 8, 8]} />
          </mesh>

          {/* Knee — exposed mechanism */}
          <mesh position={[s * 0.13, 0.22, 0]} material={m.joint}>
            <sphereGeometry args={[0.055, 16, 16]} />
          </mesh>
          {/* Knee actuator */}
          <mesh position={[s * 0.13, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} material={m.dark}>
            <cylinderGeometry args={[0.04, 0.04, 0.04, 12]} />
          </mesh>

          {/* Shin — silver upper part */}
          <mesh position={[s * 0.13, 0.02, 0.01]} material={m.body}>
            <capsuleGeometry args={[0.06, 0.2, 10, 18]} />
          </mesh>

          {/* Lower shin — dark section */}
          <mesh position={[s * 0.13, -0.18, 0.01]} material={m.dark}>
            <capsuleGeometry args={[0.055, 0.16, 10, 18]} />
          </mesh>

          {/* Ankle mechanism */}
          <mesh position={[s * 0.13, -0.32, 0]} material={m.joint}>
            <sphereGeometry args={[0.035, 12, 12]} />
          </mesh>

          {/* Foot — dark flat */}
          <mesh position={[s * 0.13, -0.37, 0.02]} material={m.blackPart}>
            <boxGeometry args={[0.08, 0.03, 0.14]} />
          </mesh>
          {/* Toe grip */}
          <mesh position={[s * 0.13, -0.37, 0.1]} material={m.blackPart}>
            <boxGeometry args={[0.07, 0.025, 0.03]} />
          </mesh>
          {/* Heel */}
          <mesh position={[s * 0.13, -0.37, -0.05]} material={m.blackPart}>
            <boxGeometry args={[0.06, 0.025, 0.02]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Full G1 Assembly ── */
function UnitreeG1() {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useG1Materials();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.7) * 0.006;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.008;
    }
  });

  return (
    <group ref={groupRef} scale={0.95} position={[0, 0.05, 0]}>
      <G1Head {...mats} />
      <G1Torso {...mats} />
      <G1Arms {...mats} />
      <G1Legs {...mats} />
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
        position: [1.2, 1.4, 4.0],
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
      <Environment preset="studio" />

      <ambientLight intensity={0.25} />

      <directionalLight
        position={[4, 6, 4]}
        intensity={2.8}
        color="#f8f9ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-4, 3, 3]} intensity={1.4} color="#e8edf5" />
      <directionalLight position={[-2, 5, -5]} intensity={2.0} color="#dde4f0" />
      <pointLight position={[0, -1, 3]} intensity={0.15} color="#f0ebe0" />

      <UnitreeG1 />

      <ContactShadows
        position={[0, -0.36, 0]}
        opacity={0.16}
        scale={2.5}
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
        target={[0, 1.0, 0]}
      />
    </Canvas>
  </Suspense>
);
