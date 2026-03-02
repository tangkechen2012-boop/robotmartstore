import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
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
   ARMS — thicker, more mechanical detail
   ═══════════════════════════════════════════════ */
function Arms(m: M) {
  return (
    <group>
      {([-1, 1] as const).map(s => (
        <group key={s}>
          {/* Shoulder rotary housing */}
          <Ring pos={[s * 0.25, 1.42, 0]} r={0.06} mat={m.titanium} />
          <mesh position={[s * 0.29, 1.42, 0]} material={m.darkSteel} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.055, 0.06, 16]} />
          </mesh>
          {/* Shoulder cap */}
          <mesh position={[s * 0.34, 1.43, 0]} material={m.aluminum}>
            <sphereGeometry args={[0.055, 24, 24]} />
          </mesh>
          <Ring pos={[s * 0.36, 1.37, 0]} r={0.045} mat={m.titanium} />

          {/* Upper arm — thicker */}
          <mesh position={[s * 0.36, 1.22, 0]} material={m.aluminum}>
            <cylinderGeometry args={[0.042, 0.048, 0.24, 18]} />
          </mesh>
          {/* Upper arm panel */}
          <mesh position={[s * 0.36, 1.22, 0.046]} material={m.aluminumDark}>
            <boxGeometry args={[0.03, 0.2, 0.003]} />
          </mesh>
          {/* Upper arm actuator block */}
          <mesh position={[s * 0.36, 1.28, -0.035]} material={m.darkSteel}>
            <boxGeometry args={[0.04, 0.06, 0.025]} />
          </mesh>

          {/* Elbow hinge */}
          <Ring pos={[s * 0.36, 1.07, 0]} r={0.042} mat={m.titanium} />
          <mesh position={[s * 0.36, 1.07, 0]} rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
            <cylinderGeometry args={[0.035, 0.038, 0.055, 14]} />
          </mesh>
          {/* Elbow hinge pin */}
          <mesh position={[s * 0.36, 1.07, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.titanium}>
            <cylinderGeometry args={[0.008, 0.008, 0.09, 8]} />
          </mesh>
          {/* Elbow guard */}
          <mesh position={[s * 0.36, 1.07, 0.042]} material={m.aluminum}>
            <boxGeometry args={[0.05, 0.04, 0.012]} />
          </mesh>

          {/* Forearm — thicker */}
          <mesh position={[s * 0.36, 0.9, 0]} material={m.aluminum}>
            <cylinderGeometry args={[0.035, 0.04, 0.24, 18]} />
          </mesh>
          {/* Forearm cable */}
          <mesh position={[s * 0.36, 0.9, -0.038]} material={m.darkSteel}>
            <boxGeometry args={[0.01, 0.2, 0.006]} />
          </mesh>
          {/* Forearm panel */}
          <mesh position={[s * 0.36, 0.9, 0.038]} material={m.aluminumDark}>
            <boxGeometry args={[0.025, 0.18, 0.003]} />
          </mesh>

          {/* Wrist */}
          <Ring pos={[s * 0.36, 0.76, 0]} r={0.03} mat={m.titanium} />
          <mesh position={[s * 0.36, 0.76, 0]} material={m.darkSteel}>
            <cylinderGeometry args={[0.022, 0.028, 0.02, 12]} />
          </mesh>

          {/* Hand — industrial clamp gripper */}
          <mesh position={[s * 0.36, 0.7, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.05, 0.055, 0.04]} />
          </mesh>
          <mesh position={[s * 0.36, 0.7, 0.027]} material={m.grip}>
            <boxGeometry args={[0.045, 0.05, 0.005]} />
          </mesh>
          {/* Thumb clamp */}
          <mesh position={[s * 0.335, 0.69, 0.025]} material={m.darkSteel}>
            <boxGeometry args={[0.014, 0.04, 0.022]} />
          </mesh>
          {/* Two-finger gripper pads */}
          <mesh position={[s * 0.35, 0.665, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.02, 0.022, 0.035]} />
          </mesh>
          <mesh position={[s * 0.375, 0.665, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.02, 0.022, 0.035]} />
          </mesh>
          <mesh position={[s * 0.36, 0.652, 0.005]} material={m.grip}>
            <boxGeometry args={[0.048, 0.005, 0.03]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   LEGS — ~38-40% height, wider stance, thicker
   Height: ~0.72 units
   ═══════════════════════════════════════════════ */
function Legs(m: M) {
  const legSpread = 0.12;
  return (
    <group>
      {([-1, 1] as const).map(s => (
        <group key={s}>
          {/* Hip structural block */}
          <mesh position={[s * legSpread, 0.9, 0]} material={m.darkSteel}>
            <boxGeometry args={[0.08, 0.07, 0.09]} />
          </mesh>
          <Ring pos={[s * legSpread, 0.86, 0]} r={0.052} mat={m.titanium} />
          <mesh position={[s * legSpread, 0.86, 0]} rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
            <cylinderGeometry args={[0.04, 0.045, 0.045, 14]} />
          </mesh>

          {/* Thigh — substantially thicker */}
          <mesh position={[s * legSpread, 0.66, 0]} material={m.aluminum}>
            <cylinderGeometry args={[0.055, 0.065, 0.32, 20]} />
          </mesh>
          {/* Thigh panel seam */}
          <mesh position={[s * legSpread, 0.66, 0.06]} material={m.aluminumDark}>
            <boxGeometry args={[0.003, 0.28, 0.003]} />
          </mesh>
          {/* Thigh actuator housing */}
          <mesh position={[s * legSpread, 0.74, 0.045]} material={m.darkSteel}>
            <boxGeometry args={[0.04, 0.09, 0.025]} />
          </mesh>
          {/* Thigh inner cable */}
          <mesh position={[s * legSpread, 0.66, -0.06]} material={m.darkSteel}>
            <boxGeometry args={[0.012, 0.22, 0.008]} />
          </mesh>

          {/* Knee — visible hinge */}
          <Ring pos={[s * legSpread, 0.48, 0]} r={0.048} mat={m.titanium} />
          <mesh position={[s * legSpread, 0.48, 0]} rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
            <cylinderGeometry args={[0.038, 0.042, 0.055, 14]} />
          </mesh>
          {/* Knee hinge pin */}
          <mesh position={[s * legSpread, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.titanium}>
            <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
          </mesh>
          {/* Knee guard plate */}
          <mesh position={[s * legSpread, 0.48, 0.048]} material={m.aluminum}>
            <boxGeometry args={[0.065, 0.055, 0.015]} />
          </mesh>

          {/* Shin — solid */}
          <mesh position={[s * legSpread, 0.3, 0.005]} material={m.aluminum}>
            <cylinderGeometry args={[0.048, 0.055, 0.28, 18]} />
          </mesh>
          {/* Shin panel seam */}
          <mesh position={[s * legSpread, 0.3, 0.053]} material={m.aluminumDark}>
            <boxGeometry args={[0.003, 0.24, 0.003]} />
          </mesh>
          {/* Shin cable */}
          <mesh position={[s * legSpread, 0.3, -0.05]} material={m.darkSteel}>
            <boxGeometry args={[0.012, 0.2, 0.006]} />
          </mesh>
          {/* Shin actuator housing */}
          <mesh position={[s * legSpread, 0.36, 0.04]} material={m.darkSteel}>
            <boxGeometry args={[0.035, 0.06, 0.02]} />
          </mesh>

          {/* Ankle */}
          <Ring pos={[s * legSpread, 0.14, 0]} r={0.04} mat={m.titanium} />
          <mesh position={[s * legSpread, 0.14, 0]} material={m.darkSteel}>
            <cylinderGeometry args={[0.028, 0.035, 0.025, 14]} />
          </mesh>

          {/* Foot — wider, stable base */}
          <mesh position={[s * legSpread, 0.08, 0.01]} material={m.aluminum}>
            <boxGeometry args={[0.09, 0.035, 0.16]} />
          </mesh>
          <mesh position={[s * legSpread, 0.06, 0.01]} material={m.grip}>
            <boxGeometry args={[0.088, 0.008, 0.158]} />
          </mesh>
          {/* Toe guard */}
          <mesh position={[s * legSpread, 0.08, 0.095]} material={m.aluminumDark}>
            <boxGeometry args={[0.08, 0.03, 0.02]} />
          </mesh>
          {/* Heel block */}
          <mesh position={[s * legSpread, 0.08, -0.065]} material={m.aluminumDark}>
            <boxGeometry args={[0.075, 0.03, 0.02]} />
          </mesh>
          {/* Foot side rails */}
          {([-1, 1] as const).map(fs => (
            <mesh key={fs} position={[s * legSpread + fs * 0.042, 0.08, 0.01]} material={m.aluminumDark}>
              <boxGeometry args={[0.005, 0.025, 0.14]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   ASSEMBLY — slight 3/4 orientation
   ═══════════════════════════════════════════════ */
function IndustrialHumanoid() {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useMaterials();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.003;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, -0.3, 0]} position={[0, -0.05, 0]}>
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
