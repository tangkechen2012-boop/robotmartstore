import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo, useState } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   PBR MATERIALS
   ═══════════════════════════════════════════════ */
function useMaterials() {
  return useMemo(() => {
    const aluminum = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C2C8D0"),
      metalness: 1.0,
      roughness: 0.16,
      envMapIntensity: 1.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.04,
    });
    const aluminumDark = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#9CA4B0"),
      metalness: 1.0,
      roughness: 0.2,
      envMapIntensity: 1.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.06,
    });
    const titanium = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#5A6270"),
      metalness: 0.95,
      roughness: 0.14,
      envMapIntensity: 1.3,
      clearcoat: 0.3,
      clearcoatRoughness: 0.08,
    });
    const darkSteel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2A2E35"),
      metalness: 0.8,
      roughness: 0.22,
      envMapIntensity: 0.8,
      clearcoat: 0.2,
    });
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1A2030"),
      metalness: 0.4,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      envMapIntensity: 2.0,
      transparent: true,
      opacity: 0.92,
    });
    const sensor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4A90A8"),
      emissive: new THREE.Color("#4A90A8"),
      emissiveIntensity: 0.12,
      metalness: 0.3,
      roughness: 0.1,
      clearcoat: 0.8,
    });
    const grip = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1A1D22"),
      metalness: 0.15,
      roughness: 0.7,
    });
    return { aluminum, aluminumDark, titanium, darkSteel, visor, sensor, grip };
  }, []);
}

type M = ReturnType<typeof useMaterials>;

function Ring({ pos, r = 0.04, mat }: { pos: [number, number, number]; r?: number; mat: THREE.Material }) {
  return <mesh position={pos} material={mat}><torusGeometry args={[r, r * 0.22, 10, 24]} /></mesh>;
}

/* ═══════════════════════════════════════════════
   HEAD — ~20% height, helmet, narrow visor, LiDAR
   Total robot: ~1.9 units. Head: 0.38
   ═══════════════════════════════════════════════ */
function Head(m: M) {
  return (
    <group position={[0, 1.72, 0]}>
      {/* Helmet shell */}
      <mesh material={m.aluminum} position={[0, 0, -0.01]} scale={[1, 1.15, 1]}>
        <sphereGeometry args={[0.16, 48, 48]} />
      </mesh>
      {/* Helmet top plate */}
      <mesh material={m.aluminumDark} position={[0, 0.12, -0.01]}>
        <cylinderGeometry args={[0.07, 0.11, 0.05, 20]} />
      </mesh>
      {/* LiDAR module */}
      <mesh material={m.darkSteel} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.035, 0.025, 16]} />
      </mesh>
      <mesh material={m.visor} position={[0, 0.215, 0]}>
        <sphereGeometry args={[0.015, 12, 12]} />
      </mesh>

      {/* Visor recess */}
      <mesh material={m.darkSteel} position={[0, 0.03, 0.13]}>
        <boxGeometry args={[0.28, 0.04, 0.04]} />
      </mesh>
      {/* Visor glass — narrow horizontal band */}
      <mesh material={m.visor} position={[0, 0.03, 0.155]}>
        <boxGeometry args={[0.26, 0.025, 0.012]} />
      </mesh>
      {/* Visor wraps */}
      <mesh material={m.visor} position={[-0.145, 0.03, 0.12]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.04, 0.025, 0.012]} />
      </mesh>
      <mesh material={m.visor} position={[0.145, 0.03, 0.12]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[0.04, 0.025, 0.012]} />
      </mesh>
      {/* Sensor dot */}
      <mesh material={m.sensor} position={[0, 0.03, 0.163]}>
        <sphereGeometry args={[0.004, 8, 8]} />
      </mesh>

      {/* Chin plate */}
      <mesh material={m.aluminum} position={[0, -0.1, 0.02]}>
        <boxGeometry args={[0.2, 0.06, 0.13]} />
      </mesh>
      <mesh material={m.aluminumDark} position={[0, -0.12, 0.07]}>
        <boxGeometry args={[0.15, 0.02, 0.05]} />
      </mesh>

      {/* Seam lines */}
      <mesh material={m.aluminumDark} position={[0, 0.06, 0.158]}>
        <boxGeometry args={[0.28, 0.002, 0.002]} />
      </mesh>
      <mesh material={m.aluminumDark} position={[0, 0.0, 0.158]}>
        <boxGeometry args={[0.28, 0.002, 0.002]} />
      </mesh>


      {/* Neck ring */}
      <Ring pos={[0, -0.16, 0]} r={0.055} mat={m.titanium} />
    </group>
  );
}

/* ═══════════════════════════════════════════════
   TORSO — ~40% height. Structured panels.
   Height: ~0.76 units
   ═══════════════════════════════════════════════ */
function Torso(m: M) {
  return (
    <group>
      {/* Neck */}
      <mesh position={[0, 1.53, 0]} material={m.titanium}>
        <cylinderGeometry args={[0.04, 0.055, 0.08, 16]} />
      </mesh>

      {/* Upper chest — rounded, broader at shoulders */}
      <mesh position={[0, 1.38, 0]} material={m.aluminum} scale={[1.3, 1, 0.85]}>
        <sphereGeometry args={[0.18, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
      </mesh>
      {/* Chest volume */}
      <mesh position={[0, 1.32, 0.02]} material={m.aluminum}>
        <cylinderGeometry args={[0.19, 0.17, 0.2, 24]} />
      </mesh>

      {/* Pectoral contour — left & right */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} position={[s * 0.08, 1.36, 0.08]} material={m.aluminumDark} scale={[1, 0.9, 0.6]}>
          <sphereGeometry args={[0.07, 20, 20]} />
        </mesh>
      ))}

      {/* Shoulder caps — rounded transition */}
      {([-1, 1] as const).map(s => (
        <mesh key={`sh-${s}`} position={[s * 0.2, 1.42, 0]} material={m.aluminum}>
          <sphereGeometry args={[0.06, 20, 20]} />
        </mesh>
      ))}

      {/* Ribcage taper */}
      <mesh position={[0, 1.22, 0]} material={m.aluminum}>
        <cylinderGeometry args={[0.14, 0.18, 0.12, 20]} />
      </mesh>

      {/* Waist — narrow, human-like */}
      <mesh position={[0, 1.12, 0]} material={m.aluminumDark}>
        <cylinderGeometry args={[0.1, 0.14, 0.1, 18]} />
      </mesh>

      {/* Abdomen contour */}
      <mesh position={[0, 1.14, 0.06]} material={m.aluminum} scale={[1, 1.2, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Hip block */}
      <mesh position={[0, 1.03, 0]} material={m.darkSteel}>
        <cylinderGeometry args={[0.14, 0.12, 0.1, 18]} />
      </mesh>

      {/* Back musculature hint */}
      <mesh position={[0, 1.34, -0.1]} material={m.aluminumDark} scale={[1.1, 1, 0.5]}>
        <sphereGeometry args={[0.12, 20, 20]} />
      </mesh>
      {/* Spine line */}
      <mesh position={[0, 1.25, -0.12]} material={m.darkSteel}>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 8]} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   SINGLE ARM — poseable via shoulder/elbow rotation
   Built relative to shoulder origin at (0,0,0)
   ═══════════════════════════════════════════════ */
function Arm({ side, shoulderAngle = 0, elbowAngle = 0, ...m }: M & { side: 1 | -1; shoulderAngle?: number; elbowAngle?: number }) {
  const s = side;
  return (
    <group position={[s * 0.25, 1.42, 0]}>
      {/* Shoulder ball joint */}
      <mesh material={m.titanium}>
        <sphereGeometry args={[0.05, 20, 20]} />
      </mesh>

      {/* Upper arm group — rotates at shoulder */}
      <group position={[s * 0.04, -0.02, 0]} rotation={[shoulderAngle, 0, 0]}>
        {/* Deltoid — organic cap */}
        <mesh position={[0, 0, 0]} material={m.aluminum} scale={[1, 1.2, 0.9]}>
          <sphereGeometry args={[0.05, 20, 20]} />
        </mesh>

        {/* Bicep — tapered cylinder */}
        <mesh position={[0, -0.12, 0.01]} material={m.aluminum}>
          <cylinderGeometry args={[0.038, 0.045, 0.16, 18]} />
        </mesh>
        {/* Tricep contour */}
        <mesh position={[0, -0.12, -0.02]} material={m.aluminumDark} scale={[0.8, 1, 0.5]}>
          <cylinderGeometry args={[0.035, 0.04, 0.14, 14]} />
        </mesh>

        {/* Elbow pivot */}
        <group position={[0, -0.24, 0]} rotation={[elbowAngle, 0, 0]}>
          {/* Elbow joint — organic */}
          <mesh material={m.titanium}>
            <sphereGeometry args={[0.038, 16, 16]} />
          </mesh>

          {/* Forearm — tapered */}
          <mesh position={[0, -0.14, 0.005]} material={m.aluminum}>
            <cylinderGeometry args={[0.028, 0.038, 0.2, 18]} />
          </mesh>
          {/* Forearm muscle hint */}
          <mesh position={[0, -0.1, 0.025]} material={m.aluminumDark} scale={[0.7, 1, 0.4]}>
            <cylinderGeometry args={[0.03, 0.02, 0.12, 12]} />
          </mesh>

          {/* Wrist */}
          <mesh position={[0, -0.26, 0]} material={m.titanium}>
            <sphereGeometry args={[0.025, 12, 12]} />
          </mesh>

          {/* Hand — organic palm */}
          <mesh position={[0, -0.3, 0.005]} material={m.darkSteel} scale={[1, 1.2, 0.8]}>
            <sphereGeometry args={[0.025, 14, 14]} />
          </mesh>
          {/* Fingers — 4 organic digits */}
          {[-0.015, -0.005, 0.005, 0.015].map((fx, i) => (
            <group key={i} position={[fx, -0.33, 0.005]}>
              <mesh material={m.darkSteel}>
                <capsuleGeometry args={[0.005, 0.03, 4, 8]} />
              </mesh>
              <mesh position={[0, -0.022, 0]} material={m.grip}>
                <sphereGeometry args={[0.005, 6, 6]} />
              </mesh>
            </group>
          ))}
          {/* Thumb */}
          <mesh position={[-0.025 * s, -0.3, 0.018]} rotation={[0, 0, s * 0.5]} material={m.darkSteel}>
            <capsuleGeometry args={[0.005, 0.022, 4, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   SINGLE LEG — poseable via hip/knee rotation
   Built relative to hip origin
   ═══════════════════════════════════════════════ */
function Leg({ side, hipAngle = 0, kneeAngle = 0, ...m }: M & { side: 1 | -1; hipAngle?: number; kneeAngle?: number }) {
  const x = side * 0.12;
  return (
    <group position={[x, 0.9, 0]}>
      {/* Hip ball joint */}
      <mesh material={m.titanium}>
        <sphereGeometry args={[0.05, 18, 18]} />
      </mesh>

      {/* Thigh group — rotates at hip */}
      <group position={[0, -0.04, 0]} rotation={[hipAngle, 0, 0]}>
        {/* Glute/upper thigh — organic taper */}
        <mesh position={[0, -0.04, 0]} material={m.aluminum} scale={[1, 1.1, 0.95]}>
          <sphereGeometry args={[0.06, 18, 18]} />
        </mesh>

        {/* Quadricep — front muscle */}
        <mesh position={[0, -0.16, 0.02]} material={m.aluminum}>
          <cylinderGeometry args={[0.05, 0.058, 0.22, 20]} />
        </mesh>
        {/* Hamstring — back contour */}
        <mesh position={[0, -0.16, -0.025]} material={m.aluminumDark} scale={[0.85, 1, 0.55]}>
          <cylinderGeometry args={[0.048, 0.05, 0.2, 16]} />
        </mesh>

        {/* Knee pivot */}
        <group position={[0, -0.3, 0]} rotation={[kneeAngle, 0, 0]}>
          {/* Kneecap — organic */}
          <mesh position={[0, 0, 0.035]} material={m.titanium} scale={[0.8, 1, 0.5]}>
            <sphereGeometry args={[0.04, 14, 14]} />
          </mesh>
          <mesh material={m.titanium}>
            <sphereGeometry args={[0.042, 16, 16]} />
          </mesh>

          {/* Calf — tapered */}
          <mesh position={[0, -0.16, 0.005]} material={m.aluminum}>
            <cylinderGeometry args={[0.035, 0.05, 0.24, 18]} />
          </mesh>
          {/* Calf muscle bulge */}
          <mesh position={[0, -0.1, -0.025]} material={m.aluminumDark} scale={[0.8, 1, 0.55]}>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>

          {/* Ankle */}
          <mesh position={[0, -0.3, 0]} material={m.titanium}>
            <sphereGeometry args={[0.028, 12, 12]} />
          </mesh>

          {/* Foot — organic, shoe-like */}
          <mesh position={[0, -0.35, 0.02]} material={m.darkSteel} scale={[0.8, 0.5, 1.3]}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
          {/* Heel */}
          <mesh position={[0, -0.36, -0.03]} material={m.darkSteel} scale={[0.7, 0.4, 0.6]}>
            <sphereGeometry args={[0.04, 12, 12]} />
          </mesh>
          {/* Toes — 3 organic digits */}
          {[-0.015, 0, 0.015].map((tx, i) => (
            <mesh key={i} position={[tx, -0.37, 0.065]} material={m.grip} rotation={[Math.PI / 2, 0, 0]}>
              <capsuleGeometry args={[0.006, 0.015, 4, 8]} />
            </mesh>
          ))}
          {/* Sole */}
          <mesh position={[0, -0.375, 0.02]} material={m.grip} scale={[0.75, 0.15, 1.2]}>
            <sphereGeometry args={[0.05, 12, 12]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   ASSEMBLY — running stride pose
   ═══════════════════════════════════════════════ */
function IndustrialHumanoid() {
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
    const c = Math.cos(t);

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

      <IndustrialHumanoid />

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
