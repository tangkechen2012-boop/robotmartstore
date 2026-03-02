import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo, useState } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   MATERIALS — white panels + dark joints
   ═══════════════════════════════════════════════ */
function useMaterials() {
  return useMemo(() => {
    const white = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#EEF0F4"),
      metalness: 0.1,
      roughness: 0.22,
      envMapIntensity: 1.2,
      clearcoat: 0.7,
      clearcoatRoughness: 0.08,
    });
    const whiteAlt = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#D8DCE4"),
      metalness: 0.15,
      roughness: 0.28,
      envMapIntensity: 1.0,
      clearcoat: 0.5,
    });
    const dark = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#181C24"),
      metalness: 0.5,
      roughness: 0.35,
      envMapIntensity: 0.6,
      clearcoat: 0.15,
    });
    const darkAlt = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2A3040"),
      metalness: 0.4,
      roughness: 0.3,
      envMapIntensity: 0.7,
      clearcoat: 0.2,
    });
    const gray = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#50586A"),
      metalness: 0.45,
      roughness: 0.28,
      envMapIntensity: 0.8,
      clearcoat: 0.3,
    });
    const helmet = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#080C12"),
      metalness: 0.25,
      roughness: 0.18,
      envMapIntensity: 1.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.03,
    });
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#50D0F0"),
      emissive: new THREE.Color("#50D0F0"),
      emissiveIntensity: 0.4,
      metalness: 0.15,
      roughness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      envMapIntensity: 2.5,
      transparent: true,
      opacity: 0.82,
    });
    const grip = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0C0E12"),
      metalness: 0.05,
      roughness: 0.9,
    });
    return { white, whiteAlt, dark, darkAlt, gray, helmet, visor, grip };
  }, []);
}

type M = ReturnType<typeof useMaterials>;

/* ═══════════════════════════════════════════════
   HEAD — black dome + cyan visor band
   ═══════════════════════════════════════════════ */
function Head(m: M) {
  return (
    <group position={[0, 1.62, 0]}>
      {/* Helmet — smooth black dome */}
      <mesh material={m.helmet} scale={[1, 1.05, 0.95]}>
        <sphereGeometry args={[0.12, 48, 48]} />
      </mesh>
      {/* Top sensor bump */}
      <mesh material={m.dark} position={[0, 0.11, -0.01]}>
        <sphereGeometry args={[0.035, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      </mesh>

      {/* Visor — wide cyan band */}
      <mesh material={m.visor} position={[0, 0.01, 0.08]} scale={[1.15, 0.28, 0.35]}>
        <sphereGeometry args={[0.11, 32, 16, -Math.PI * 0.65, Math.PI * 1.3]} />
      </mesh>

      {/* Chin / lower face — white */}
      <mesh material={m.white} position={[0, -0.06, 0.02]} scale={[0.9, 0.55, 0.8]}>
        <sphereGeometry args={[0.1, 24, 16, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65]} />
      </mesh>

      {/* Neck — dark cylinder */}
      <mesh position={[0, -0.13, 0]} material={m.dark}>
        <cylinderGeometry args={[0.035, 0.045, 0.06, 16]} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   TORSO — big white chest, narrow dark waist
   ═══════════════════════════════════════════════ */
function Torso(m: M) {
  return (
    <group>
      {/* === CHEST === */}
      {/* Main chest body — white, wide */}
      <mesh position={[0, 1.32, 0]} material={m.white}>
        <cylinderGeometry args={[0.15, 0.19, 0.28, 28]} />
      </mesh>
      {/* Front chest plate — convex white */}
      <mesh position={[0, 1.33, 0.1]} material={m.white} scale={[1.15, 1, 0.45]}>
        <sphereGeometry args={[0.14, 28, 28]} />
      </mesh>
      {/* Back plate */}
      <mesh position={[0, 1.33, -0.09]} material={m.whiteAlt} scale={[1.05, 0.95, 0.4]}>
        <sphereGeometry args={[0.13, 24, 24]} />
      </mesh>
      {/* Collar — top edge */}
      <mesh position={[0, 1.46, 0]} material={m.whiteAlt}>
        <cylinderGeometry args={[0.1, 0.14, 0.02, 24]} />
      </mesh>

      {/* Shoulder mounts — dark balls at top corners */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} position={[s * 0.19, 1.44, 0]} material={m.dark}>
          <sphereGeometry args={[0.038, 18, 18]} />
        </mesh>
      ))}

      {/* === MIDSECTION === */}
      {/* Ribcage taper — dark */}
      <mesh position={[0, 1.15, 0]} material={m.dark}>
        <cylinderGeometry args={[0.07, 0.14, 0.08, 20]} />
      </mesh>

      {/* Waist — very narrow, dark */}
      <mesh position={[0, 1.08, 0]} material={m.dark}>
        <cylinderGeometry args={[0.055, 0.07, 0.06, 16]} />
      </mesh>

      {/* === PELVIS === */}
      <mesh position={[0, 1.0, 0]} material={m.dark}>
        <cylinderGeometry args={[0.1, 0.08, 0.1, 18]} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   ARM — white upper, dark lower
   ═══════════════════════════════════════════════ */
function Arm({ side, shoulderAngle = 0, elbowAngle = 0, ...m }: M & { side: 1 | -1; shoulderAngle?: number; elbowAngle?: number }) {
  const s = side;
  return (
    <group position={[s * 0.22, 1.44, 0]}>
      {/* Shoulder joint */}
      <mesh material={m.dark}>
        <sphereGeometry args={[0.035, 16, 16]} />
      </mesh>

      <group position={[s * 0.02, -0.01, 0]} rotation={[shoulderAngle, 0, 0]}>
        {/* Upper arm — white */}
        <mesh position={[0, -0.1, 0]} material={m.white}>
          <capsuleGeometry args={[0.035, 0.13, 8, 16]} />
        </mesh>

        {/* Elbow */}
        <group position={[0, -0.2, 0]} rotation={[elbowAngle, 0, 0]}>
          <mesh material={m.dark}>
            <sphereGeometry args={[0.028, 14, 14]} />
          </mesh>

          {/* Forearm — dark */}
          <mesh position={[0, -0.11, 0]} material={m.dark}>
            <capsuleGeometry args={[0.025, 0.14, 8, 16]} />
          </mesh>

          {/* Wrist */}
          <mesh position={[0, -0.2, 0]} material={m.gray}>
            <sphereGeometry args={[0.018, 10, 10]} />
          </mesh>

          {/* Hand */}
          <mesh position={[0, -0.235, 0.003]} material={m.dark} scale={[0.9, 1.1, 0.7]}>
            <sphereGeometry args={[0.02, 12, 12]} />
          </mesh>
          {/* 5 Fingers */}
          {[-0.013, -0.006, 0.0, 0.006, 0.013].map((fx, i) => (
            <mesh key={i} position={[fx, -0.27, 0.003]} material={m.dark}>
              <capsuleGeometry args={[0.003, 0.02 - i * 0.001, 4, 6]} />
            </mesh>
          ))}
          {/* Thumb */}
          <mesh position={[-0.02 * s, -0.24, 0.012]} rotation={[0.2, 0, s * 0.7]} material={m.dark}>
            <capsuleGeometry args={[0.004, 0.016, 4, 6]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   LEG — white thigh, dark shin
   ═══════════════════════════════════════════════ */
function Leg({ side, hipAngle = 0, kneeAngle = 0, ...m }: M & { side: 1 | -1; hipAngle?: number; kneeAngle?: number }) {
  const x = side * 0.07;
  return (
    <group position={[x, 0.93, 0]}>
      {/* Hip joint */}
      <mesh material={m.dark}>
        <sphereGeometry args={[0.035, 14, 14]} />
      </mesh>

      <group position={[0, -0.02, 0]} rotation={[hipAngle, 0, 0]}>
        {/* Thigh — white */}
        <mesh position={[0, -0.14, 0]} material={m.white}>
          <capsuleGeometry args={[0.045, 0.18, 8, 18]} />
        </mesh>

        {/* Knee */}
        <group position={[0, -0.28, 0]} rotation={[kneeAngle, 0, 0]}>
          <mesh material={m.dark}>
            <sphereGeometry args={[0.035, 14, 14]} />
          </mesh>

          {/* Shin — dark */}
          <mesh position={[0, -0.15, 0]} material={m.dark}>
            <capsuleGeometry args={[0.032, 0.2, 8, 18]} />
          </mesh>

          {/* Ankle */}
          <mesh position={[0, -0.28, 0]} material={m.gray}>
            <sphereGeometry args={[0.022, 10, 10]} />
          </mesh>

          {/* Foot */}
          <mesh position={[0, -0.32, 0.015]} material={m.dark} scale={[0.7, 0.35, 1.15]}>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>
          {/* Toes */}
          {[-0.01, 0, 0.01].map((tx, i) => (
            <mesh key={i} position={[tx, -0.34, 0.05]} material={m.dark} rotation={[Math.PI / 2, 0, 0]}>
              <capsuleGeometry args={[0.005, 0.012, 4, 6]} />
            </mesh>
          ))}
          {/* Sole */}
          <mesh position={[0, -0.345, 0.015]} material={m.grip} scale={[0.65, 0.1, 1.05]}>
            <sphereGeometry args={[0.045, 12, 12]} />
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

  const poseRef = useRef({
    leftHip: 0, leftKnee: 0, rightHip: 0, rightKnee: 0,
    leftShoulder: 0, leftElbow: 0, rightShoulder: 0, rightElbow: 0,
  });
  const [, forceUpdate] = useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.004;
    }
    const t = state.clock.elapsedTime * 1.0;
    const s = Math.sin(t);

    poseRef.current = {
      leftHip: s * -0.4,
      leftKnee: (Math.sin(t - 0.8) * 0.5 + 0.5) * 0.55,
      rightHip: s * 0.4,
      rightKnee: (Math.sin(t + Math.PI - 0.8) * 0.5 + 0.5) * 0.55,
      leftShoulder: s * 0.35,
      leftElbow: -(Math.sin(t + 0.5) * 0.5 + 0.5) * 0.5,
      rightShoulder: s * -0.35,
      rightElbow: -(Math.sin(t + Math.PI + 0.5) * 0.5 + 0.5) * 0.5,
    };
    forceUpdate(n => n + 1);
  });

  const p = poseRef.current;

  return (
    <group ref={groupRef} rotation={[0, -0.25, 0]} position={[0, 0.1, 0]} scale={0.8}>
      <Head {...mats} />
      <Torso {...mats} />
      <Arm side={-1} shoulderAngle={p.leftShoulder} elbowAngle={p.leftElbow} {...mats} />
      <Arm side={1} shoulderAngle={p.rightShoulder} elbowAngle={p.rightElbow} {...mats} />
      <Leg side={-1} hipAngle={p.leftHip} kneeAngle={p.leftKnee} {...mats} />
      <Leg side={1} hipAngle={p.rightHip} kneeAngle={p.rightKnee} {...mats} />
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
      camera={{ position: [1.4, 1.1, 3.2], fov: 28, near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      shadows
    >
      <Environment preset="studio" />
      <directionalLight position={[4, 5, 3]} intensity={2.8} color="#f8f6f2" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-3, 3, 2]} intensity={1.6} color="#e4e8f2" />
      <directionalLight position={[-2, 4, -4]} intensity={1.8} color="#d8e0ec" />
      <ambientLight intensity={0.22} />

      <HumanoidRobot />

      <ContactShadows position={[0, 0.1, 0]} opacity={0.2} scale={3} blur={2.5} far={1.5} color="#1a2030" />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.06}
        rotateSpeed={0.55}
        zoomSpeed={0.8}
        minDistance={2.2}
        maxDistance={6.0}
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        target={[0, 0.85, 0]}
      />
    </Canvas>
  </Suspense>
);
