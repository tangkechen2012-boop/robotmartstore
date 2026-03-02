import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo, useState } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   PBR MATERIALS — white body + dark joints style
   ═══════════════════════════════════════════════ */
function useMaterials() {
  return useMemo(() => {
    // Clean white body panels
    const white = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E8ECF0"),
      metalness: 0.15,
      roughness: 0.25,
      envMapIntensity: 1.0,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });
    // Slightly off-white for panel variation
    const whiteAlt = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#D5DAE0"),
      metalness: 0.2,
      roughness: 0.3,
      envMapIntensity: 0.9,
      clearcoat: 0.4,
    });
    // Dark charcoal for joints, forearms, shins
    const dark = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1E2228"),
      metalness: 0.6,
      roughness: 0.35,
      envMapIntensity: 0.7,
      clearcoat: 0.2,
    });
    // Medium gray for transitions
    const gray = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4A5060"),
      metalness: 0.5,
      roughness: 0.3,
      envMapIntensity: 0.8,
      clearcoat: 0.3,
    });
    // Black helmet
    const helmet = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0A0E14"),
      metalness: 0.3,
      roughness: 0.2,
      envMapIntensity: 1.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.05,
    });
    // Visor — cyan tinted glass
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#40B0D0"),
      emissive: new THREE.Color("#40B0D0"),
      emissiveIntensity: 0.3,
      metalness: 0.2,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      envMapIntensity: 2.0,
      transparent: true,
      opacity: 0.85,
    });
    // Rubber grip
    const grip = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0E1015"),
      metalness: 0.05,
      roughness: 0.85,
    });
    return { white, whiteAlt, dark, gray, helmet, visor, grip };
  }, []);
}

type M = ReturnType<typeof useMaterials>;

/* ═══════════════════════════════════════════════
   HEAD — black helmet with cyan visor band
   ═══════════════════════════════════════════════ */
function Head(m: M) {
  return (
    <group position={[0, 1.72, 0]}>
      {/* Black helmet — smooth dome */}
      <mesh material={m.helmet} position={[0, 0.02, -0.01]} scale={[1, 1.1, 1]}>
        <sphereGeometry args={[0.14, 48, 48]} />
      </mesh>
      {/* Helmet top cap */}
      <mesh material={m.dark} position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.04, 20]} />
      </mesh>

      {/* Visor — wide cyan band wrapping around */}
      <mesh material={m.visor} position={[0, 0.02, 0.12]} scale={[1.05, 0.35, 0.3]}>
        <sphereGeometry args={[0.13, 32, 16, -Math.PI * 0.6, Math.PI * 1.2]} />
      </mesh>

      {/* Lower face — white chin area */}
      <mesh material={m.white} position={[0, -0.08, 0.01]} scale={[1, 0.7, 0.9]}>
        <sphereGeometry args={[0.1, 24, 24, 0, Math.PI * 2, Math.PI * 0.3, Math.PI * 0.5]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.16, 0]} material={m.dark}>
        <cylinderGeometry args={[0.04, 0.05, 0.06, 16]} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   TORSO — large white chest plate, slim dark waist
   ═══════════════════════════════════════════════ */
function Torso(m: M) {
  return (
    <group>
      {/* Upper chest — large white plate */}
      <mesh position={[0, 1.38, 0.02]} material={m.white} scale={[1, 1, 0.8]}>
        <cylinderGeometry args={[0.16, 0.2, 0.24, 24]} />
      </mesh>
      {/* Chest front panel — smooth convex */}
      <mesh position={[0, 1.36, 0.1]} material={m.white} scale={[1.1, 0.9, 0.4]}>
        <sphereGeometry args={[0.14, 24, 24]} />
      </mesh>
      {/* Back panel */}
      <mesh position={[0, 1.36, -0.08]} material={m.whiteAlt} scale={[1, 0.9, 0.4]}>
        <sphereGeometry args={[0.13, 20, 20]} />
      </mesh>

      {/* Shoulder connectors — dark spheres */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} position={[s * 0.2, 1.44, 0]} material={m.dark}>
          <sphereGeometry args={[0.045, 18, 18]} />
        </mesh>
      ))}

      {/* Mid torso taper */}
      <mesh position={[0, 1.22, 0]} material={m.dark}>
        <cylinderGeometry args={[0.09, 0.15, 0.1, 18]} />
      </mesh>

      {/* Waist — narrow dark */}
      <mesh position={[0, 1.14, 0]} material={m.dark}>
        <cylinderGeometry args={[0.07, 0.09, 0.08, 16]} />
      </mesh>

      {/* Hip — dark block */}
      <mesh position={[0, 1.05, 0]} material={m.dark}>
        <cylinderGeometry args={[0.12, 0.1, 0.1, 18]} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   ARM — white upper arm, dark forearm, dark hand
   ═══════════════════════════════════════════════ */
function Arm({ side, shoulderAngle = 0, elbowAngle = 0, ...m }: M & { side: 1 | -1; shoulderAngle?: number; elbowAngle?: number }) {
  const s = side;
  return (
    <group position={[s * 0.24, 1.44, 0]}>
      {/* Shoulder joint — dark ball */}
      <mesh material={m.dark}>
        <sphereGeometry args={[0.04, 18, 18]} />
      </mesh>

      <group position={[s * 0.02, -0.02, 0]} rotation={[shoulderAngle, 0, 0]}>
        {/* Upper arm — white, smooth */}
        <mesh position={[0, -0.12, 0]} material={m.white}>
          <capsuleGeometry args={[0.04, 0.16, 8, 16]} />
        </mesh>

        {/* Elbow pivot */}
        <group position={[0, -0.24, 0]} rotation={[elbowAngle, 0, 0]}>
          {/* Elbow joint — dark */}
          <mesh material={m.dark}>
            <sphereGeometry args={[0.035, 14, 14]} />
          </mesh>

          {/* Forearm — dark, tapered */}
          <mesh position={[0, -0.13, 0]} material={m.dark}>
            <capsuleGeometry args={[0.03, 0.16, 8, 16]} />
          </mesh>

          {/* Wrist */}
          <mesh position={[0, -0.24, 0]} material={m.gray}>
            <sphereGeometry args={[0.022, 10, 10]} />
          </mesh>

          {/* Hand — dark */}
          <mesh position={[0, -0.28, 0.005]} material={m.dark} scale={[1, 1.1, 0.75]}>
            <sphereGeometry args={[0.022, 12, 12]} />
          </mesh>
          {/* Fingers */}
          {[-0.012, -0.004, 0.004, 0.012].map((fx, i) => (
            <mesh key={i} position={[fx, -0.32, 0.005]} material={m.dark}>
              <capsuleGeometry args={[0.004, 0.025, 4, 8]} />
            </mesh>
          ))}
          {/* Thumb */}
          <mesh position={[-0.022 * s, -0.29, 0.015]} rotation={[0, 0, s * 0.6]} material={m.dark}>
            <capsuleGeometry args={[0.004, 0.018, 4, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   LEG — white thigh, dark shin, dark foot
   ═══════════════════════════════════════════════ */
function Leg({ side, hipAngle = 0, kneeAngle = 0, ...m }: M & { side: 1 | -1; hipAngle?: number; kneeAngle?: number }) {
  const x = side * 0.08;
  return (
    <group position={[x, 0.98, 0]}>
      {/* Hip joint — dark */}
      <mesh material={m.dark}>
        <sphereGeometry args={[0.04, 16, 16]} />
      </mesh>

      <group position={[0, -0.03, 0]} rotation={[hipAngle, 0, 0]}>
        {/* Thigh — white, smooth */}
        <mesh position={[0, -0.15, 0]} material={m.white}>
          <capsuleGeometry args={[0.05, 0.2, 8, 18]} />
        </mesh>

        {/* Knee pivot */}
        <group position={[0, -0.3, 0]} rotation={[kneeAngle, 0, 0]}>
          {/* Knee joint — dark */}
          <mesh material={m.dark}>
            <sphereGeometry args={[0.04, 14, 14]} />
          </mesh>

          {/* Shin — dark, tapered */}
          <mesh position={[0, -0.16, 0]} material={m.dark}>
            <capsuleGeometry args={[0.035, 0.22, 8, 18]} />
          </mesh>

          {/* Ankle */}
          <mesh position={[0, -0.3, 0]} material={m.gray}>
            <sphereGeometry args={[0.025, 10, 10]} />
          </mesh>

          {/* Foot — dark, shoe-like */}
          <mesh position={[0, -0.34, 0.02]} material={m.dark} scale={[0.75, 0.4, 1.2]}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
          {/* Sole */}
          <mesh position={[0, -0.365, 0.02]} material={m.grip} scale={[0.7, 0.12, 1.1]}>
            <sphereGeometry args={[0.05, 12, 12]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   ASSEMBLY — animated running cycle
   ═══════════════════════════════════════════════ */
function HumanoidRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useMaterials();

  const [pose, setPose] = useState({
    leftHip: 0, leftKnee: 0, rightHip: 0, rightKnee: 0,
    leftShoulder: 0, leftElbow: 0, rightShoulder: 0, rightElbow: 0,
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.003;
    }
    const t = state.clock.elapsedTime * 1.0;
    const s = Math.sin(t);

    setPose({
      leftHip: s * -0.4,
      leftKnee: (Math.sin(t - 0.8) * 0.5 + 0.5) * 0.55,
      rightHip: s * 0.4,
      rightKnee: (Math.sin(t + Math.PI - 0.8) * 0.5 + 0.5) * 0.55,
      leftShoulder: s * 0.35,
      leftElbow: -(Math.sin(t + 0.5) * 0.5 + 0.5) * 0.5,
      rightShoulder: s * -0.35,
      rightElbow: -(Math.sin(t + Math.PI + 0.5) * 0.5 + 0.5) * 0.5,
    });
  });

  return (
    <group ref={groupRef} rotation={[0, -0.3, 0]} position={[0, 0.05, 0]} scale={0.75}>
      <Head {...mats} />
      <Torso {...mats} />
      <Arm side={-1} shoulderAngle={pose.leftShoulder} elbowAngle={pose.leftElbow} {...mats} />
      <Arm side={1} shoulderAngle={pose.rightShoulder} elbowAngle={pose.rightElbow} {...mats} />
      <Leg side={-1} hipAngle={pose.leftHip} kneeAngle={pose.leftKnee} {...mats} />
      <Leg side={1} hipAngle={pose.rightHip} kneeAngle={pose.rightKnee} {...mats} />
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
      camera={{ position: [1.6, 1.15, 3.4], fov: 28, near: 0.1, far: 100 }}
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
      <directionalLight position={[4, 5, 3]} intensity={2.6} color="#f5f3ef" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-3, 3, 2]} intensity={1.4} color="#e0e6f0" />
      <directionalLight position={[-2, 4, -4]} intensity={2.0} color="#d5dce8" />
      <ambientLight intensity={0.18} />

      <HumanoidRobot />

      <ContactShadows position={[0, 0.05, 0]} opacity={0.18} scale={3} blur={2.5} far={1.5} color="#1a2030" />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.06}
        rotateSpeed={0.55}
        zoomSpeed={0.8}
        minDistance={2.5}
        maxDistance={6.0}
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        target={[0, 0.9, 0]}
      />
    </Canvas>
  </Suspense>
);
