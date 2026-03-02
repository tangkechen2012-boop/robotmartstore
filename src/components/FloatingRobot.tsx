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
      {/* === CHEST — organic, broad shoulders tapering === */}
      {/* Upper chest — wide, rounded pecs */}
      <mesh position={[0, 1.36, 0.02]} material={m.white} scale={[1.25, 0.9, 0.85]}>
        <sphereGeometry args={[0.17, 32, 32]} />
      </mesh>
      {/* Pectoral left */}
      <mesh position={[-0.07, 1.36, 0.1]} material={m.whiteAlt} scale={[0.9, 0.7, 0.4]}>
        <sphereGeometry args={[0.08, 20, 20]} />
      </mesh>
      {/* Pectoral right */}
      <mesh position={[0.07, 1.36, 0.1]} material={m.whiteAlt} scale={[0.9, 0.7, 0.4]}>
        <sphereGeometry args={[0.08, 20, 20]} />
      </mesh>

      {/* Shoulder caps — rounded deltoid mounts */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} position={[s * 0.2, 1.42, 0]} material={m.white} scale={[1, 1.1, 0.9]}>
          <sphereGeometry args={[0.05, 20, 20]} />
        </mesh>
      ))}

      {/* Back — upper back volume */}
      <mesh position={[0, 1.35, -0.08]} material={m.whiteAlt} scale={[1.15, 0.85, 0.45]}>
        <sphereGeometry args={[0.14, 24, 24]} />
      </mesh>

      {/* Ribcage taper — organic curve */}
      <mesh position={[0, 1.2, 0]} material={m.white}>
        <cylinderGeometry args={[0.1, 0.17, 0.14, 24]} />
      </mesh>

      {/* Waist — narrow, human-like */}
      <mesh position={[0, 1.1, 0]} material={m.dark}>
        <cylinderGeometry args={[0.06, 0.1, 0.08, 18]} />
      </mesh>
      {/* Oblique hints */}
      {([-1, 1] as const).map(s => (
        <mesh key={`ob-${s}`} position={[s * 0.06, 1.13, 0.02]} material={m.darkAlt} scale={[0.4, 0.8, 0.5]}>
          <sphereGeometry args={[0.06, 12, 12]} />
        </mesh>
      ))}

      {/* Abdomen — subtle abs contour */}
      <mesh position={[0, 1.15, 0.07]} material={m.white} scale={[0.7, 0.9, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Pelvis — hip structure */}
      <mesh position={[0, 1.0, 0]} material={m.dark}>
        <cylinderGeometry args={[0.11, 0.09, 0.1, 18]} />
      </mesh>

      {/* Spine ridge — back */}
      <mesh position={[0, 1.25, -0.11]} material={m.dark}>
        <capsuleGeometry args={[0.008, 0.25, 4, 8]} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   ARM — organic muscle contours
   ═══════════════════════════════════════════════ */
function Arm({ side, shoulderAngle = 0, elbowAngle = 0, ...m }: M & { side: 1 | -1; shoulderAngle?: number; elbowAngle?: number }) {
  const s = side;
  return (
    <group position={[s * 0.24, 1.44, 0]}>
      {/* Shoulder joint */}
      <mesh material={m.dark}>
        <sphereGeometry args={[0.032, 16, 16]} />
      </mesh>

      <group position={[s * 0.02, -0.01, 0]} rotation={[shoulderAngle, 0, 0]}>
        {/* Deltoid — rounded cap */}
        <mesh position={[0, -0.02, 0]} material={m.white} scale={[1.1, 1.3, 0.95]}>
          <sphereGeometry args={[0.04, 20, 20]} />
        </mesh>

        {/* Bicep — front bulge */}
        <mesh position={[0, -0.1, 0.015]} material={m.white} scale={[1, 1, 0.9]}>
          <capsuleGeometry args={[0.035, 0.1, 8, 16]} />
        </mesh>
        {/* Tricep — back contour */}
        <mesh position={[0, -0.1, -0.015]} material={m.whiteAlt} scale={[0.85, 0.95, 0.7]}>
          <capsuleGeometry args={[0.032, 0.09, 6, 14]} />
        </mesh>

        {/* Elbow */}
        <group position={[0, -0.2, 0]} rotation={[elbowAngle, 0, 0]}>
          <mesh material={m.dark}>
            <sphereGeometry args={[0.026, 14, 14]} />
          </mesh>

          {/* Forearm — tapered with muscle */}
          <mesh position={[0, -0.09, 0.008]} material={m.dark}>
            <capsuleGeometry args={[0.028, 0.1, 8, 16]} />
          </mesh>
          {/* Forearm extensor */}
          <mesh position={[0, -0.07, -0.015]} material={m.darkAlt} scale={[0.75, 0.85, 0.5]}>
            <capsuleGeometry args={[0.025, 0.07, 6, 12]} />
          </mesh>
          {/* Forearm taper to wrist */}
          <mesh position={[0, -0.16, 0]} material={m.dark}>
            <capsuleGeometry args={[0.018, 0.06, 6, 12]} />
          </mesh>

          {/* Wrist */}
          <mesh position={[0, -0.2, 0]} material={m.gray}>
            <sphereGeometry args={[0.016, 10, 10]} />
          </mesh>

          {/* Hand — organic palm */}
          <mesh position={[0, -0.23, 0.004]} material={m.dark} scale={[0.85, 1.0, 0.6]}>
            <sphereGeometry args={[0.02, 14, 14]} />
          </mesh>
          {/* 5 Fingers — varied lengths */}
          {[
            { x: -0.012, len: 0.018 },
            { x: -0.005, len: 0.024 },
            { x: 0.002, len: 0.026 },
            { x: 0.009, len: 0.022 },
            { x: 0.015, len: 0.016 },
          ].map((f, i) => (
            <group key={i} position={[f.x, -0.26, 0.004]}>
              <mesh material={m.dark}>
                <capsuleGeometry args={[0.003, f.len, 4, 6]} />
              </mesh>
              {/* Fingertip */}
              <mesh position={[0, -(f.len / 2 + 0.005), 0]} material={m.grip}>
                <sphereGeometry args={[0.0035, 6, 6]} />
              </mesh>
            </group>
          ))}
          {/* Thumb */}
          <mesh position={[-0.02 * s, -0.235, 0.014]} rotation={[0.3, 0, s * 0.65]} material={m.dark}>
            <capsuleGeometry args={[0.004, 0.018, 4, 6]} />
          </mesh>
          <mesh position={[-0.025 * s, -0.25, 0.018]} material={m.grip}>
            <sphereGeometry args={[0.004, 6, 6]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   LEG — organic muscle contours
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
        {/* Glute / upper thigh transition */}
        <mesh position={[0, -0.03, -0.01]} material={m.white} scale={[1, 1.1, 0.95]}>
          <sphereGeometry args={[0.05, 18, 18]} />
        </mesh>

        {/* Quadricep — front thigh */}
        <mesh position={[0, -0.14, 0.015]} material={m.white}>
          <capsuleGeometry args={[0.046, 0.16, 8, 18]} />
        </mesh>
        {/* Hamstring — back thigh */}
        <mesh position={[0, -0.14, -0.018]} material={m.whiteAlt} scale={[0.88, 0.95, 0.6]}>
          <capsuleGeometry args={[0.042, 0.14, 6, 16]} />
        </mesh>
        {/* Inner thigh */}
        <mesh position={[-side * 0.015, -0.14, 0]} material={m.whiteAlt} scale={[0.5, 0.9, 0.75]}>
          <capsuleGeometry args={[0.04, 0.12, 6, 14]} />
        </mesh>

        {/* Knee */}
        <group position={[0, -0.28, 0]} rotation={[kneeAngle, 0, 0]}>
          {/* Kneecap */}
          <mesh position={[0, 0, 0.025]} material={m.dark} scale={[0.7, 0.85, 0.4]}>
            <sphereGeometry args={[0.035, 14, 14]} />
          </mesh>
          <mesh material={m.dark}>
            <sphereGeometry args={[0.034, 14, 14]} />
          </mesh>

          {/* Calf — tapered with gastrocnemius bulge */}
          <mesh position={[0, -0.12, 0.005]} material={m.dark}>
            <capsuleGeometry args={[0.034, 0.15, 8, 18]} />
          </mesh>
          {/* Calf muscle bulge — back */}
          <mesh position={[0, -0.08, -0.025]} material={m.darkAlt} scale={[0.8, 0.9, 0.55]}>
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>
          {/* Shin taper */}
          <mesh position={[0, -0.22, 0]} material={m.dark}>
            <capsuleGeometry args={[0.022, 0.08, 6, 14]} />
          </mesh>

          {/* Ankle */}
          <mesh position={[0, -0.28, 0]} material={m.gray}>
            <sphereGeometry args={[0.02, 10, 10]} />
          </mesh>
          {/* Ankle bones — medial/lateral */}
          {([-1, 1] as const).map(bs => (
            <mesh key={bs} position={[bs * 0.018, -0.28, 0]} material={m.gray}>
              <sphereGeometry args={[0.008, 8, 8]} />
            </mesh>
          ))}

          {/* Foot — organic arch */}
          <mesh position={[0, -0.31, 0.02]} material={m.dark} scale={[0.7, 0.35, 1.2]}>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>
          {/* Heel */}
          <mesh position={[0, -0.32, -0.025]} material={m.dark} scale={[0.6, 0.3, 0.55]}>
            <sphereGeometry args={[0.04, 12, 12]} />
          </mesh>
          {/* 5 Toes */}
          {[
            { x: -0.014, len: 0.008 },
            { x: -0.007, len: 0.012 },
            { x: 0.0, len: 0.014 },
            { x: 0.007, len: 0.011 },
            { x: 0.013, len: 0.007 },
          ].map((toe, i) => (
            <mesh key={i} position={[toe.x, -0.335, 0.055 + toe.len * 0.3]} material={m.dark} rotation={[Math.PI / 2.2, 0, 0]}>
              <capsuleGeometry args={[0.004, toe.len, 4, 6]} />
            </mesh>
          ))}
          {/* Sole */}
          <mesh position={[0, -0.34, 0.015]} material={m.grip} scale={[0.65, 0.08, 1.1]}>
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
