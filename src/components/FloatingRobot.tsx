import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

function useG1Materials() {
  return useMemo(() => {
    const body = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C8CDD6"),
      metalness: 1.0,
      roughness: 0.12,
      envMapIntensity: 1.5,
      clearcoat: 0.45,
      clearcoatRoughness: 0.05,
    });
    const dark = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1C1F26"),
      metalness: 0.65,
      roughness: 0.25,
      envMapIntensity: 0.7,
      clearcoat: 0.35,
      clearcoatRoughness: 0.08,
    });
    const joint = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#555B66"),
      metalness: 0.9,
      roughness: 0.13,
      envMapIntensity: 1.2,
      clearcoat: 0.25,
      clearcoatRoughness: 0.1,
    });
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#38BDF8"),
      emissive: new THREE.Color("#38BDF8"),
      emissiveIntensity: 0.7,
      metalness: 0.2,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      transparent: true,
      opacity: 0.9,
    });
    const blackPart = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#111318"),
      metalness: 0.45,
      roughness: 0.4,
      envMapIntensity: 0.5,
    });
    const led = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#38BDF8"),
      emissive: new THREE.Color("#38BDF8"),
      emissiveIntensity: 0.4,
      metalness: 0.2,
      roughness: 0.3,
    });
    return { body, dark, joint, visor, blackPart, led };
  }, []);
}

/* ── Unitree G1 Head ── */
function Head(m: ReturnType<typeof useG1Materials>) {
  return (
    <group position={[0, 1.68, 0]}>
      {/* Helmet — smooth egg shape */}
      <mesh material={m.body} position={[0, 0.02, -0.02]}>
        <sphereGeometry args={[0.19, 48, 48]} />
      </mesh>
      {/* Helmet top cap */}
      <mesh material={m.body} position={[0, 0.12, -0.02]}>
        <sphereGeometry args={[0.15, 36, 36]} />
      </mesh>
      {/* Forehead plate */}
      <mesh material={m.body} position={[0, 0.08, 0.12]}>
        <boxGeometry args={[0.26, 0.06, 0.08]} />
      </mesh>

      {/* === Visor — signature glowing blue arc === */}
      {/* Center strip */}
      <mesh material={m.visor} position={[0, 0.08, 0.18]}>
        <boxGeometry args={[0.28, 0.025, 0.02]} />
      </mesh>
      {/* Upper arc */}
      <mesh material={m.visor} position={[0, 0.14, 0.15]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.2, 0.015, 0.02]} />
      </mesh>
      {/* Left wrap */}
      <mesh material={m.visor} position={[-0.15, 0.08, 0.14]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.06, 0.025, 0.02]} />
      </mesh>
      {/* Right wrap */}
      <mesh material={m.visor} position={[0.15, 0.08, 0.14]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[0.06, 0.025, 0.02]} />
      </mesh>

      {/* Face — dark recessed area */}
      <mesh material={m.dark} position={[0, -0.02, 0.16]}>
        <boxGeometry args={[0.22, 0.1, 0.04]} />
      </mesh>

      {/* Chin — smooth */}
      <mesh material={m.body} position={[0, -0.1, 0.04]}>
        <sphereGeometry args={[0.12, 28, 28]} />
      </mesh>

      {/* Side sensors */}
      <mesh material={m.dark} position={[-0.19, 0.02, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
      </mesh>
      <mesh material={m.dark} position={[0.19, 0.02, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
      </mesh>
    </group>
  );
}

/* ── Torso ── */
function Torso(m: ReturnType<typeof useG1Materials>) {
  return (
    <group>
      {/* Neck */}
      <mesh position={[0, 1.52, 0]} material={m.joint}>
        <cylinderGeometry args={[0.045, 0.06, 0.06, 18]} />
      </mesh>

      {/* Upper chest — broad, athletic */}
      <mesh position={[0, 1.3, 0]} material={m.body}>
        <cylinderGeometry args={[0.22, 0.28, 0.32, 24]} />
      </mesh>
      {/* Chest front armor */}
      <mesh position={[0, 1.34, 0.24]} material={m.body}>
        <boxGeometry args={[0.24, 0.14, 0.06]} />
      </mesh>
      {/* Chest label area */}
      <mesh position={[0, 1.36, 0.28]} material={m.dark}>
        <boxGeometry args={[0.1, 0.022, 0.008]} />
      </mesh>
      {/* Status LEDs */}
      <mesh position={[-0.015, 1.28, 0.28]} material={m.led}>
        <boxGeometry args={[0.006, 0.006, 0.006]} />
      </mesh>
      <mesh position={[0.015, 1.28, 0.28]} material={m.led}>
        <boxGeometry args={[0.006, 0.006, 0.006]} />
      </mesh>

      {/* Mid section — tapered */}
      <mesh position={[0, 1.04, 0]} material={m.body}>
        <cylinderGeometry args={[0.15, 0.2, 0.2, 20]} />
      </mesh>
      {/* Exposed waist mechanism */}
      <mesh position={[0, 0.92, 0]} material={m.joint}>
        <cylinderGeometry args={[0.12, 0.14, 0.06, 18]} />
      </mesh>

      {/* Hip block */}
      <mesh position={[0, 0.84, 0]} material={m.body}>
        <boxGeometry args={[0.3, 0.1, 0.18]} />
      </mesh>
      {/* Hip LED */}
      <mesh position={[0, 0.84, 0.1]} material={m.led}>
        <sphereGeometry args={[0.006, 8, 8]} />
      </mesh>

      {/* Back battery pack */}
      <mesh position={[0, 1.24, -0.26]} material={m.dark}>
        <boxGeometry args={[0.18, 0.14, 0.06]} />
      </mesh>
    </group>
  );
}

/* ── Arms ── */
function Arms(m: ReturnType<typeof useG1Materials>) {
  return (
    <group>
      {([-1, 1] as const).map((s) => (
        <group key={s}>
          {/* Shoulder ball */}
          <mesh position={[s * 0.32, 1.4, 0]} material={m.joint}>
            <sphereGeometry args={[0.065, 20, 20]} />
          </mesh>
          {/* Shoulder armor — rounded */}
          <mesh position={[s * 0.36, 1.42, 0]} material={m.body}>
            <capsuleGeometry args={[0.05, 0.04, 10, 16]} />
          </mesh>

          {/* Upper arm */}
          <mesh position={[s * 0.38, 1.18, 0]} material={m.body}>
            <capsuleGeometry args={[0.045, 0.26, 10, 18]} />
          </mesh>

          {/* Elbow — exposed actuator */}
          <mesh position={[s * 0.38, 1.0, 0]} material={m.joint}>
            <sphereGeometry args={[0.038, 16, 16]} />
          </mesh>
          <mesh position={[s * 0.38, 1.0, 0]} rotation={[0, 0, Math.PI / 2]} material={m.dark}>
            <cylinderGeometry args={[0.028, 0.028, 0.035, 12]} />
          </mesh>

          {/* Forearm */}
          <mesh position={[s * 0.38, 0.8, 0]} material={m.body}>
            <capsuleGeometry args={[0.038, 0.2, 10, 18]} />
          </mesh>

          {/* Wrist */}
          <mesh position={[s * 0.38, 0.66, 0]} material={m.joint}>
            <cylinderGeometry args={[0.025, 0.03, 0.025, 14]} />
          </mesh>

          {/* Hand — black, blocky */}
          <mesh position={[s * 0.38, 0.6, 0.005]} material={m.blackPart}>
            <boxGeometry args={[0.05, 0.055, 0.035]} />
          </mesh>
          {/* Fingers */}
          <mesh position={[s * 0.38, 0.56, 0.01]} material={m.blackPart}>
            <boxGeometry args={[0.045, 0.03, 0.025]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Legs ── */
function Legs(m: ReturnType<typeof useG1Materials>) {
  return (
    <group>
      {([-1, 1] as const).map((s) => (
        <group key={s}>
          {/* Hip joint */}
          <mesh position={[s * 0.12, 0.76, 0]} material={m.joint}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>

          {/* Thigh — silver, strong */}
          <mesh position={[s * 0.12, 0.54, 0]} material={m.body}>
            <capsuleGeometry args={[0.06, 0.26, 12, 20]} />
          </mesh>

          {/* Knee — visible actuator */}
          <mesh position={[s * 0.12, 0.36, 0]} material={m.joint}>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>
          <mesh position={[s * 0.12, 0.36, 0]} rotation={[0, 0, Math.PI / 2]} material={m.dark}>
            <cylinderGeometry args={[0.032, 0.032, 0.035, 12]} />
          </mesh>

          {/* Upper shin — silver */}
          <mesh position={[s * 0.12, 0.18, 0.005]} material={m.body}>
            <capsuleGeometry args={[0.05, 0.16, 10, 18]} />
          </mesh>

          {/* Lower shin — dark blade */}
          <mesh position={[s * 0.12, 0.0, 0.005]} material={m.dark}>
            <capsuleGeometry args={[0.045, 0.18, 10, 18]} />
          </mesh>

          {/* Ankle */}
          <mesh position={[s * 0.12, -0.14, 0]} material={m.joint}>
            <sphereGeometry args={[0.03, 12, 12]} />
          </mesh>

          {/* Foot */}
          <mesh position={[s * 0.12, -0.18, 0.02]} material={m.blackPart}>
            <boxGeometry args={[0.07, 0.025, 0.13]} />
          </mesh>
          <mesh position={[s * 0.12, -0.18, 0.09]} material={m.blackPart}>
            <boxGeometry args={[0.06, 0.02, 0.025]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Assembly ── */
function UnitreeG1() {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useG1Materials();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.005;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.006;
    }
  });

  return (
    <group ref={groupRef} scale={1.05} position={[0, -0.1, 0]}>
      <Head {...mats} />
      <Torso {...mats} />
      <Arms {...mats} />
      <Legs {...mats} />
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
      camera={{ position: [1.0, 1.2, 3.8], fov: 32, near: 0.1, far: 100 }}
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
      <directionalLight position={[3, 5, 4]} intensity={3.0} color="#f0f2ff" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-3, 3, 2]} intensity={1.6} color="#e6ecf5" />
      <directionalLight position={[-1, 4, -4]} intensity={1.8} color="#d8e0ef" />
      <pointLight position={[0, -1, 2.5]} intensity={0.2} color="#f5efe5" />

      <UnitreeG1 />

      <ContactShadows position={[0, -0.22, 0]} opacity={0.14} scale={2.2} blur={2.2} far={1.2} color="#1e2a42" />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.08}
        rotateSpeed={0.65}
        zoomSpeed={0.9}
        minDistance={3.0}
        maxDistance={6.0}
        minPolarAngle={0.55}
        maxPolarAngle={1.45}
        target={[0, 0.9, 0]}
      />
    </Canvas>
  </Suspense>
);
