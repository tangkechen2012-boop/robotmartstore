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
      {/* Side panels */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} material={m.aluminum} position={[s * 0.12, 0, 0]}>
          <boxGeometry args={[0.06, 0.22, 0.14]} />
        </mesh>
      ))}
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

      {/* Side sensors */}
      {([-1, 1] as const).map(s => (
        <mesh key={`sensor-${s}`} material={m.darkSteel} position={[s * 0.17, 0.02, 0]}>
          <cylinderGeometry args={[0.015, 0.018, 0.02, 10]} />
        </mesh>
      ))}

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
        <cylinderGeometry args={[0.045, 0.06, 0.08, 16]} />
      </mesh>

      {/* Upper chest — broad */}
      <mesh position={[0, 1.34, 0]} material={m.aluminum}>
        <boxGeometry args={[0.38, 0.26, 0.22]} />
      </mesh>
      {/* Chest armor bevel */}
      <mesh position={[0, 1.42, 0.09]} material={m.aluminum} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.34, 0.06, 0.06]} />
      </mesh>
      {/* Chest panel seams */}
      <mesh position={[0, 1.36, 0.112]} material={m.aluminumDark}>
        <boxGeometry args={[0.36, 0.002, 0.002]} />
      </mesh>
      <mesh position={[0, 1.30, 0.112]} material={m.aluminumDark}>
        <boxGeometry args={[0.36, 0.002, 0.002]} />
      </mesh>
      <mesh position={[0, 1.34, 0.112]} material={m.aluminumDark}>
        <boxGeometry args={[0.002, 0.24, 0.002]} />
      </mesh>

      {/* Shoulder mount blocks */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} position={[s * 0.21, 1.42, 0]} material={m.aluminumDark}>
          <boxGeometry args={[0.06, 0.07, 0.18]} />
        </mesh>
      ))}

      {/* Side vents */}
      {([-1, 1] as const).map(s => (
        <group key={`vent-${s}`}>
          {[0, 1, 2, 3].map(i => (
            <mesh key={i} position={[s * 0.192, 1.32 + i * 0.022, 0]} material={m.darkSteel}>
              <boxGeometry args={[0.004, 0.012, 0.12]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Mid torso — tapered waist */}
      <mesh position={[0, 1.15, 0]} material={m.aluminum}>
        <cylinderGeometry args={[0.13, 0.18, 0.12, 18]} />
      </mesh>

      {/* Waist mechanism */}
      <Ring pos={[0, 1.08, 0]} r={0.11} mat={m.titanium} />
      <mesh position={[0, 1.08, 0]} material={m.darkSteel}>
        <cylinderGeometry args={[0.085, 0.095, 0.04, 16]} />
      </mesh>

      {/* Hip block */}
      <mesh position={[0, 0.98, 0]} material={m.aluminum}>
        <boxGeometry args={[0.32, 0.12, 0.18]} />
      </mesh>
      {/* Hip seam */}
      <mesh position={[0, 0.98, 0.092]} material={m.aluminumDark}>
        <boxGeometry args={[0.3, 0.002, 0.002]} />
      </mesh>

      {/* Battery — rear */}
      <mesh position={[0, 1.32, -0.15]} material={m.darkSteel}>
        <boxGeometry args={[0.24, 0.2, 0.08]} />
      </mesh>
      <mesh position={[0, 1.32, -0.192]} material={m.titanium}>
        <boxGeometry args={[0.22, 0.002, 0.002]} />
      </mesh>
      <mesh position={[0, 1.26, -0.192]} material={m.titanium}>
        <boxGeometry args={[0.22, 0.002, 0.002]} />
      </mesh>
      <mesh position={[0.07, 1.36, -0.192]} material={m.sensor}>
        <boxGeometry args={[0.022, 0.005, 0.004]} />
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
      {/* Shoulder rotary housing (stays at torso) */}
      <Ring pos={[0, 0, 0]} r={0.06} mat={m.titanium} />
      <mesh position={[s * 0.04, 0, 0]} material={m.darkSteel} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.055, 0.06, 16]} />
      </mesh>

      {/* Upper arm group — rotates at shoulder */}
      <group position={[s * 0.09, 0.01, 0]} rotation={[shoulderAngle, 0, 0]}>
        {/* Shoulder cap */}
        <mesh position={[0, 0, 0]} material={m.aluminum}>
          <sphereGeometry args={[0.055, 24, 24]} />
        </mesh>
        <Ring pos={[0, -0.06, 0]} r={0.045} mat={m.titanium} />

        {/* Upper arm */}
        <mesh position={[0, -0.21, 0]} material={m.aluminum}>
          <cylinderGeometry args={[0.042, 0.048, 0.24, 18]} />
        </mesh>
        <mesh position={[0, -0.21, 0.046]} material={m.aluminumDark}>
          <boxGeometry args={[0.03, 0.2, 0.003]} />
        </mesh>
        <mesh position={[0, -0.15, -0.035]} material={m.darkSteel}>
          <boxGeometry args={[0.04, 0.06, 0.025]} />
        </mesh>

        {/* Elbow pivot point */}
        <group position={[0, -0.35, 0]} rotation={[elbowAngle, 0, 0]}>
          {/* Elbow hinge */}
          <Ring pos={[0, 0, 0]} r={0.042} mat={m.titanium} />
          <mesh rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
            <cylinderGeometry args={[0.035, 0.038, 0.055, 14]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={m.titanium}>
            <cylinderGeometry args={[0.008, 0.008, 0.09, 8]} />
          </mesh>
          <mesh position={[0, 0, 0.042]} material={m.aluminum}>
            <boxGeometry args={[0.05, 0.04, 0.012]} />
          </mesh>

          {/* Forearm */}
          <mesh position={[0, -0.17, 0]} material={m.aluminum}>
            <cylinderGeometry args={[0.035, 0.04, 0.24, 18]} />
          </mesh>
          <mesh position={[0, -0.17, -0.038]} material={m.darkSteel}>
            <boxGeometry args={[0.01, 0.2, 0.006]} />
          </mesh>
          <mesh position={[0, -0.17, 0.038]} material={m.aluminumDark}>
            <boxGeometry args={[0.025, 0.18, 0.003]} />
          </mesh>

          {/* Wrist */}
          <Ring pos={[0, -0.31, 0]} r={0.03} mat={m.titanium} />
          <mesh position={[0, -0.31, 0]} material={m.darkSteel}>
            <cylinderGeometry args={[0.022, 0.028, 0.02, 12]} />
          </mesh>

          {/* Hand */}
          <mesh position={[0, -0.37, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.05, 0.055, 0.04]} />
          </mesh>
          <mesh position={[0, -0.37, 0.027]} material={m.grip}>
            <boxGeometry args={[0.045, 0.05, 0.005]} />
          </mesh>
          <mesh position={[-0.025 * s, -0.38, 0.025]} material={m.darkSteel}>
            <boxGeometry args={[0.014, 0.04, 0.022]} />
          </mesh>
          <mesh position={[-0.01, -0.405, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.02, 0.022, 0.035]} />
          </mesh>
          <mesh position={[0.015, -0.405, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.02, 0.022, 0.035]} />
          </mesh>
          <mesh position={[0, -0.418, 0.005]} material={m.grip}>
            <boxGeometry args={[0.048, 0.005, 0.03]} />
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
      {/* Hip structural block (stays at pelvis) */}
      <mesh material={m.darkSteel}>
        <boxGeometry args={[0.08, 0.07, 0.09]} />
      </mesh>
      <Ring pos={[0, -0.04, 0]} r={0.052} mat={m.titanium} />
      <mesh position={[0, -0.04, 0]} rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
        <cylinderGeometry args={[0.04, 0.045, 0.045, 14]} />
      </mesh>

      {/* Thigh group — rotates at hip */}
      <group position={[0, -0.06, 0]} rotation={[hipAngle, 0, 0]}>
        {/* Thigh */}
        <mesh position={[0, -0.18, 0]} material={m.aluminum}>
          <cylinderGeometry args={[0.055, 0.065, 0.32, 20]} />
        </mesh>
        <mesh position={[0, -0.18, 0.06]} material={m.aluminumDark}>
          <boxGeometry args={[0.003, 0.28, 0.003]} />
        </mesh>
        <mesh position={[0, -0.1, 0.045]} material={m.darkSteel}>
          <boxGeometry args={[0.04, 0.09, 0.025]} />
        </mesh>
        <mesh position={[0, -0.18, -0.06]} material={m.darkSteel}>
          <boxGeometry args={[0.012, 0.22, 0.008]} />
        </mesh>

        {/* Knee pivot */}
        <group position={[0, -0.36, 0]} rotation={[kneeAngle, 0, 0]}>
          {/* Knee hinge */}
          <Ring pos={[0, 0, 0]} r={0.048} mat={m.titanium} />
          <mesh rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
            <cylinderGeometry args={[0.038, 0.042, 0.055, 14]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={m.titanium}>
            <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
          </mesh>
          <mesh position={[0, 0, 0.048]} material={m.aluminum}>
            <boxGeometry args={[0.065, 0.055, 0.015]} />
          </mesh>

          {/* Shin */}
          <mesh position={[0, -0.2, 0.005]} material={m.aluminum}>
            <cylinderGeometry args={[0.048, 0.055, 0.28, 18]} />
          </mesh>
          <mesh position={[0, -0.2, 0.053]} material={m.aluminumDark}>
            <boxGeometry args={[0.003, 0.24, 0.003]} />
          </mesh>
          <mesh position={[0, -0.2, -0.05]} material={m.darkSteel}>
            <boxGeometry args={[0.012, 0.2, 0.006]} />
          </mesh>
          <mesh position={[0, -0.14, 0.04]} material={m.darkSteel}>
            <boxGeometry args={[0.035, 0.06, 0.02]} />
          </mesh>

          {/* Ankle */}
          <Ring pos={[0, -0.36, 0]} r={0.04} mat={m.titanium} />
          <mesh position={[0, -0.36, 0]} material={m.darkSteel}>
            <cylinderGeometry args={[0.028, 0.035, 0.025, 14]} />
          </mesh>

          {/* Foot */}
          <mesh position={[0, -0.42, 0.01]} material={m.aluminum}>
            <boxGeometry args={[0.09, 0.035, 0.16]} />
          </mesh>
          <mesh position={[0, -0.44, 0.01]} material={m.grip}>
            <boxGeometry args={[0.088, 0.008, 0.158]} />
          </mesh>
          <mesh position={[0, -0.42, 0.095]} material={m.aluminumDark}>
            <boxGeometry args={[0.08, 0.03, 0.02]} />
          </mesh>
          <mesh position={[0, -0.42, -0.065]} material={m.aluminumDark}>
            <boxGeometry args={[0.075, 0.03, 0.02]} />
          </mesh>
          {([-1, 1] as const).map(fs => (
            <mesh key={fs} position={[fs * 0.042, -0.42, 0.01]} material={m.aluminumDark}>
              <boxGeometry args={[0.005, 0.025, 0.14]} />
            </mesh>
          ))}
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
