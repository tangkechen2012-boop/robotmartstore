import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

/* ── Shared PBR Materials ── */
function useRobotMaterials() {
  return useMemo(() => {
    const body = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#F2F5F9"),
      metalness: 1.0,
      roughness: 0.16,
      envMapIntensity: 1.35,
      clearcoat: 0.35,
      clearcoatRoughness: 0.08,
    });
    const joint = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#9CA3AF"),
      metalness: 0.95,
      roughness: 0.14,
      envMapIntensity: 1.2,
      clearcoat: 0.25,
      clearcoatRoughness: 0.12,
    });
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1e293b"),
      metalness: 0.6,
      roughness: 0.08,
      envMapIntensity: 0.9,
      clearcoat: 0.7,
      clearcoatRoughness: 0.04,
    });
    const accent = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6EC6FF"),
      emissive: new THREE.Color("#6EC6FF"),
      emissiveIntensity: 0.25,
      metalness: 0.5,
      roughness: 0.3,
    });
    const conn = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#D1D5DB"),
      metalness: 0.85,
      roughness: 0.2,
      envMapIntensity: 1.1,
      clearcoat: 0.2,
      clearcoatRoughness: 0.1,
    });
    return { body, joint, visor, accent, conn };
  }, []);
}

/* ── Head Sub-component ── */
function RobotHead({ body, joint, visor, accent }: Record<string, THREE.Material>) {
  return (
    <group position={[0, 1.58, 0]}>
      {/* Main cranium — rounded */}
      <mesh material={body}>
        <sphereGeometry args={[0.34, 48, 48]} />
      </mesh>
      {/* Helmet top panel */}
      <mesh position={[0, 0.18, 0.04]} material={body}>
        <boxGeometry args={[0.4, 0.08, 0.32]} />
      </mesh>
      {/* Side panels */}
      <mesh position={[-0.3, -0.02, 0]} material={body}>
        <boxGeometry args={[0.06, 0.18, 0.24]} />
      </mesh>
      <mesh position={[0.3, -0.02, 0]} material={body}>
        <boxGeometry args={[0.06, 0.18, 0.24]} />
      </mesh>
      {/* Faceplate */}
      <mesh position={[0, -0.04, 0.28]} material={body}>
        <boxGeometry args={[0.46, 0.22, 0.08]} />
      </mesh>
      {/* Visor band */}
      <mesh position={[0, -0.02, 0.33]} material={visor}>
        <boxGeometry args={[0.44, 0.055, 0.04]} />
      </mesh>
      {/* Visor rounded ends */}
      <mesh position={[-0.22, -0.02, 0.33]} material={visor} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.028, 0.04, 12]} />
      </mesh>
      <mesh position={[0.22, -0.02, 0.33]} material={visor} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.028, 0.04, 12]} />
      </mesh>
      {/* Status LEDs */}
      <mesh position={[-0.12, -0.02, 0.36]} material={accent}>
        <sphereGeometry args={[0.008, 8, 8]} />
      </mesh>
      <mesh position={[0.12, -0.02, 0.36]} material={accent}>
        <sphereGeometry args={[0.008, 8, 8]} />
      </mesh>
      {/* Forehead accent line */}
      <mesh position={[0, 0.1, 0.33]} material={accent}>
        <boxGeometry args={[0.14, 0.006, 0.006]} />
      </mesh>
      {/* Chin area */}
      <mesh position={[0, -0.18, 0.06]} material={body}>
        <sphereGeometry args={[0.2, 28, 28]} />
      </mesh>
      {/* Ear joints */}
      <mesh position={[-0.34, -0.02, 0]} material={joint}>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 12]} />
      </mesh>
      <mesh position={[0.34, -0.02, 0]} material={joint}>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 12]} />
      </mesh>
    </group>
  );
}

/* ── Torso Sub-component ── */
function RobotTorso({ body, joint, accent, conn }: Record<string, THREE.Material>) {
  return (
    <group>
      {/* Neck */}
      <mesh position={[0, 1.24, 0]} material={joint}>
        <cylinderGeometry args={[0.065, 0.085, 0.14, 20]} />
      </mesh>
      <mesh position={[0, 1.17, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
        <torusGeometry args={[0.1, 0.014, 10, 28]} />
      </mesh>

      {/* Upper torso — chest */}
      <mesh position={[0, 0.92, 0]} material={body}>
        <capsuleGeometry args={[0.34, 0.26, 20, 36]} />
      </mesh>
      {/* Chest armor plate */}
      <mesh position={[0, 0.95, 0.34]} material={conn}>
        <boxGeometry args={[0.22, 0.12, 0.022]} />
      </mesh>
      {/* Chest accent */}
      <mesh position={[0, 0.87, 0.35]} material={accent}>
        <boxGeometry args={[0.14, 0.008, 0.01]} />
      </mesh>
      {/* Chest vent lines */}
      {[-0.06, 0, 0.06].map((x, i) => (
        <mesh key={i} position={[x, 1.02, 0.34]} material={joint}>
          <boxGeometry args={[0.01, 0.04, 0.01]} />
        </mesh>
      ))}

      {/* Lower torso / abdomen */}
      <mesh position={[0, 0.58, 0]} material={body}>
        <capsuleGeometry args={[0.24, 0.2, 14, 28]} />
      </mesh>
      {/* Abdomen segments */}
      {[0.64, 0.58, 0.52].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
          <torusGeometry args={[0.16 - i * 0.015, 0.008, 8, 24]} />
        </mesh>
      ))}
      {/* Waist ring */}
      <mesh position={[0, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
        <torusGeometry args={[0.15, 0.016, 10, 28]} />
      </mesh>
    </group>
  );
}

/* ── Arms Sub-component ── */
function RobotArms({ body, joint, conn }: Record<string, THREE.Material>) {
  const sides = [-1, 1] as const;
  return (
    <group>
      {sides.map((s) => (
        <group key={s}>
          {/* Shoulder ball */}
          <mesh position={[s * 0.46, 1.0, 0]} material={joint}>
            <sphereGeometry args={[0.1, 20, 20]} />
          </mesh>
          {/* Shoulder cap */}
          <mesh position={[s * 0.5, 1.04, 0]} material={body}>
            <sphereGeometry args={[0.085, 18, 18]} />
          </mesh>
          {/* Shoulder armor */}
          <mesh position={[s * 0.52, 1.06, 0]} material={body}>
            <boxGeometry args={[0.06, 0.06, 0.12]} />
          </mesh>
          {/* Upper arm */}
          <mesh position={[s * 0.52, 0.74, 0]} material={body}>
            <capsuleGeometry args={[0.06, 0.28, 10, 18]} />
          </mesh>
          {/* Elbow */}
          <mesh position={[s * 0.52, 0.54, 0]} material={joint}>
            <sphereGeometry args={[0.05, 14, 14]} />
          </mesh>
          {/* Forearm */}
          <mesh position={[s * 0.52, 0.32, 0]} material={body}>
            <capsuleGeometry args={[0.05, 0.24, 10, 18]} />
          </mesh>
          {/* Wrist ring */}
          <mesh position={[s * 0.52, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]} material={joint}>
            <torusGeometry args={[0.04, 0.008, 8, 16]} />
          </mesh>
          {/* Hand */}
          <mesh position={[s * 0.52, 0.12, 0]} material={conn}>
            <sphereGeometry args={[0.042, 14, 14]} />
          </mesh>
          {/* Fingers (3 grouped) */}
          <mesh position={[s * 0.52, 0.07, 0.02]} material={conn}>
            <boxGeometry args={[0.04, 0.04, 0.015]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Legs Sub-component ── */
function RobotLegs({ body, joint, conn }: Record<string, THREE.Material>) {
  const sides = [-1, 1] as const;
  return (
    <group>
      {/* Hip block */}
      <mesh position={[0, 0.32, 0]} material={conn}>
        <boxGeometry args={[0.32, 0.08, 0.2]} />
      </mesh>

      {sides.map((s) => (
        <group key={s}>
          {/* Hip joint */}
          <mesh position={[s * 0.13, 0.24, 0]} material={joint}>
            <sphereGeometry args={[0.065, 14, 14]} />
          </mesh>
          {/* Upper leg */}
          <mesh position={[s * 0.13, 0.0, 0]} material={body}>
            <capsuleGeometry args={[0.07, 0.3, 10, 18]} />
          </mesh>
          {/* Knee */}
          <mesh position={[s * 0.13, -0.2, 0]} material={joint}>
            <sphereGeometry args={[0.055, 14, 14]} />
          </mesh>
          {/* Knee cap detail */}
          <mesh position={[s * 0.13, -0.2, 0.05]} material={conn}>
            <boxGeometry args={[0.05, 0.04, 0.02]} />
          </mesh>
          {/* Shin */}
          <mesh position={[s * 0.13, -0.44, 0]} material={body}>
            <capsuleGeometry args={[0.06, 0.28, 10, 18]} />
          </mesh>
          {/* Shin guard */}
          <mesh position={[s * 0.13, -0.42, 0.06]} material={body}>
            <boxGeometry args={[0.05, 0.16, 0.02]} />
          </mesh>
          {/* Ankle */}
          <mesh position={[s * 0.13, -0.62, 0]} material={joint}>
            <sphereGeometry args={[0.04, 12, 12]} />
          </mesh>
          {/* Foot */}
          <mesh position={[s * 0.13, -0.68, 0.03]} material={conn}>
            <boxGeometry args={[0.1, 0.04, 0.16]} />
          </mesh>
          {/* Toe */}
          <mesh position={[s * 0.13, -0.68, 0.12]} material={conn}>
            <boxGeometry args={[0.08, 0.03, 0.04]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Full Robot Assembly ── */
function HumanoidRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useRobotMaterials();

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
      <RobotHead {...mats} />
      <RobotTorso {...mats} />
      <RobotArms {...mats} />
      <RobotLegs {...mats} />
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

      <HumanoidRobot />

      <ContactShadows
        position={[0, -0.7, 0]}
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
