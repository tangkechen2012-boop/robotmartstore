import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════
   PBR MATERIALS — Industrial Aluminum, Titanium Joints, No Plastic
   ═══════════════════════════════════════════════════════════════════ */
function useMaterials() {
  return useMemo(() => {
    // Primary body — polished aluminum, satin sheen
    const aluminum = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#BFC5CE"),
      metalness: 1.0,
      roughness: 0.18,
      envMapIntensity: 1.6,
      clearcoat: 0.55,
      clearcoatRoughness: 0.04,
    });
    // Panel seams / structural lines
    const aluminumDark = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#A0A8B4"),
      metalness: 1.0,
      roughness: 0.22,
      envMapIntensity: 1.3,
      clearcoat: 0.3,
      clearcoatRoughness: 0.06,
    });
    // Joints — titanium gray
    const titanium = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#5A6270"),
      metalness: 0.95,
      roughness: 0.14,
      envMapIntensity: 1.4,
      clearcoat: 0.35,
      clearcoatRoughness: 0.08,
    });
    // Structural dark — actuator housings
    const darkSteel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2A2E35"),
      metalness: 0.8,
      roughness: 0.25,
      envMapIntensity: 0.9,
      clearcoat: 0.2,
      clearcoatRoughness: 0.1,
    });
    // Sensor visor — narrow, no glow
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
    // Subtle sensor indicator
    const sensor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4A90A8"),
      emissive: new THREE.Color("#4A90A8"),
      emissiveIntensity: 0.15,
      metalness: 0.3,
      roughness: 0.1,
      clearcoat: 0.8,
    });
    // Rubber/grip surfaces
    const grip = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1A1D22"),
      metalness: 0.15,
      roughness: 0.7,
    });
    return { aluminum, aluminumDark, titanium, darkSteel, visor, sensor, grip };
  }, []);
}

type Mats = ReturnType<typeof useMaterials>;

/* ═══════════════════════════════════════════════════════════════════
   JOINT RING — reusable mechanical transition ring
   ═══════════════════════════════════════════════════════════════════ */
function JointRing({ position, radius = 0.04, mat }: { position: [number, number, number]; radius?: number; mat: THREE.Material }) {
  return (
    <mesh position={position} material={mat}>
      <torusGeometry args={[radius, radius * 0.22, 12, 24]} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HEAD — Helmet enclosure, narrow visor, LiDAR module, no face
   Height: ~0.36 units (20-22% of ~1.8 total)
   ═══════════════════════════════════════════════════════════════════ */
function Head({ aluminum, aluminumDark, titanium, darkSteel, visor, sensor }: Mats) {
  return (
    <group position={[0, 1.62, 0]}>
      {/* Main helmet shell — slightly elongated vertically */}
      <mesh material={aluminum} position={[0, 0.02, -0.01]}>
        <sphereGeometry args={[0.155, 48, 48]} />
      </mesh>
      {/* Helmet top plate */}
      <mesh material={aluminumDark} position={[0, 0.12, -0.01]}>
        <cylinderGeometry args={[0.08, 0.12, 0.06, 24]} />
      </mesh>

      {/* LiDAR module on top */}
      <mesh material={darkSteel} position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.035, 0.04, 0.03, 16]} />
      </mesh>
      <mesh material={titanium} position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.015, 16]} />
      </mesh>
      {/* LiDAR lens */}
      <mesh material={visor} position={[0, 0.20, 0]}>
        <sphereGeometry args={[0.018, 16, 16]} />
      </mesh>

      {/* === Narrow horizontal sensor visor === */}
      {/* Visor recess */}
      <mesh material={darkSteel} position={[0, 0.04, 0.13]}>
        <boxGeometry args={[0.26, 0.035, 0.04]} />
      </mesh>
      {/* Visor glass */}
      <mesh material={visor} position={[0, 0.04, 0.155]}>
        <boxGeometry args={[0.24, 0.022, 0.01]} />
      </mesh>
      {/* Visor side wraps */}
      <mesh material={visor} position={[-0.135, 0.04, 0.12]} rotation={[0, 0.6, 0]}>
        <boxGeometry args={[0.04, 0.022, 0.01]} />
      </mesh>
      <mesh material={visor} position={[0.135, 0.04, 0.12]} rotation={[0, -0.6, 0]}>
        <boxGeometry args={[0.04, 0.022, 0.01]} />
      </mesh>
      {/* Subtle sensor dot */}
      <mesh material={sensor} position={[0, 0.04, 0.162]}>
        <sphereGeometry args={[0.004, 8, 8]} />
      </mesh>

      {/* Helmet panel seam lines */}
      <mesh material={aluminumDark} position={[0, 0.04, 0.157]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.003, 0.28, 0.003]} />
      </mesh>

      {/* Lower chin / jaw plate */}
      <mesh material={aluminum} position={[0, -0.08, 0.02]}>
        <boxGeometry args={[0.18, 0.06, 0.12]} />
      </mesh>
      {/* Chin guard */}
      <mesh material={aluminumDark} position={[0, -0.1, 0.06]}>
        <boxGeometry args={[0.14, 0.025, 0.06]} />
      </mesh>

      {/* Side sensor housings */}
      <mesh material={darkSteel} position={[-0.16, 0.02, 0]}>
        <cylinderGeometry args={[0.018, 0.02, 0.025, 12]} />
      </mesh>
      <mesh material={darkSteel} position={[0.16, 0.02, 0]}>
        <cylinderGeometry args={[0.018, 0.02, 0.025, 12]} />
      </mesh>

      {/* Neck transition ring */}
      <JointRing position={[0, -0.14, 0]} radius={0.05} mat={titanium} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TORSO — Structured panels, seam lines, battery compartment
   Height: ~0.72 units (40% of ~1.8)
   ═══════════════════════════════════════════════════════════════════ */
function Torso(m: Mats) {
  return (
    <group>
      {/* === Neck === */}
      <mesh position={[0, 1.48, 0]} material={m.titanium}>
        <cylinderGeometry args={[0.04, 0.055, 0.08, 18]} />
      </mesh>

      {/* === Upper chest — broad shoulders === */}
      <mesh position={[0, 1.3, 0]} material={m.aluminum}>
        <boxGeometry args={[0.36, 0.24, 0.2]} />
      </mesh>
      {/* Chest panel seam — horizontal */}
      <mesh position={[0, 1.32, 0.102]} material={m.aluminumDark}>
        <boxGeometry args={[0.34, 0.003, 0.003]} />
      </mesh>
      {/* Chest panel seam — vertical center */}
      <mesh position={[0, 1.3, 0.102]} material={m.aluminumDark}>
        <boxGeometry args={[0.003, 0.22, 0.003]} />
      </mesh>
      {/* Upper chest bevel */}
      <mesh position={[0, 1.38, 0.08]} material={m.aluminum} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.32, 0.06, 0.08]} />
      </mesh>

      {/* Shoulder mount blocks */}
      {([-1, 1] as const).map(s => (
        <group key={`shoulder-mount-${s}`}>
          <mesh position={[s * 0.2, 1.38, 0]} material={m.aluminumDark}>
            <boxGeometry args={[0.06, 0.06, 0.16]} />
          </mesh>
        </group>
      ))}

      {/* === Mid torso — tapered === */}
      <mesh position={[0, 1.12, 0]} material={m.aluminum}>
        <cylinderGeometry args={[0.12, 0.17, 0.14, 20]} />
      </mesh>
      {/* Exposed waist mechanism ring */}
      <JointRing position={[0, 1.04, 0]} radius={0.1} mat={m.titanium} />
      {/* Waist actuator */}
      <mesh position={[0, 1.04, 0]} material={m.darkSteel}>
        <cylinderGeometry args={[0.08, 0.09, 0.04, 16]} />
      </mesh>

      {/* === Hip block === */}
      <mesh position={[0, 0.94, 0]} material={m.aluminum}>
        <boxGeometry args={[0.28, 0.1, 0.16]} />
      </mesh>
      {/* Hip panel seam */}
      <mesh position={[0, 0.94, 0.082]} material={m.aluminumDark}>
        <boxGeometry args={[0.26, 0.003, 0.003]} />
      </mesh>

      {/* === Battery compartment — rear === */}
      <mesh position={[0, 1.28, -0.14]} material={m.darkSteel}>
        <boxGeometry args={[0.22, 0.18, 0.08]} />
      </mesh>
      {/* Battery panel lines */}
      <mesh position={[0, 1.28, -0.182]} material={m.titanium}>
        <boxGeometry args={[0.2, 0.003, 0.003]} />
      </mesh>
      <mesh position={[0, 1.22, -0.182]} material={m.titanium}>
        <boxGeometry args={[0.2, 0.003, 0.003]} />
      </mesh>
      {/* Battery indicator */}
      <mesh position={[0.06, 1.32, -0.182]} material={m.sensor}>
        <boxGeometry args={[0.025, 0.006, 0.004]} />
      </mesh>

      {/* Side vents */}
      {([-1, 1] as const).map(s => (
        <group key={`vent-${s}`}>
          {[0, 1, 2].map(i => (
            <mesh key={i} position={[s * 0.182, 1.3 + i * 0.025, 0]} material={m.darkSteel}>
              <boxGeometry args={[0.004, 0.015, 0.1]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ARMS — Rotary shoulder, hinge elbow, tool hands
   ═══════════════════════════════════════════════════════════════════ */
function Arms(m: Mats) {
  return (
    <group>
      {([-1, 1] as const).map(s => (
        <group key={`arm-${s}`}>
          {/* === Shoulder — Rotary joint housing === */}
          {/* Shoulder rotary ring */}
          <JointRing position={[s * 0.24, 1.38, 0]} radius={0.055} mat={m.titanium} />
          {/* Shoulder actuator housing */}
          <mesh position={[s * 0.28, 1.38, 0]} material={m.darkSteel} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.05, 0.06, 16]} />
          </mesh>
          {/* Shoulder cap */}
          <mesh position={[s * 0.32, 1.4, 0]} material={m.aluminum}>
            <sphereGeometry args={[0.05, 24, 24]} />
          </mesh>
          {/* Shoulder transition ring */}
          <JointRing position={[s * 0.34, 1.34, 0]} radius={0.04} mat={m.titanium} />

          {/* === Upper arm === */}
          <mesh position={[s * 0.34, 1.2, 0]} material={m.aluminum}>
            <cylinderGeometry args={[0.035, 0.04, 0.22, 18]} />
          </mesh>
          {/* Upper arm panel detail */}
          <mesh position={[s * 0.34, 1.2, 0.038]} material={m.aluminumDark}>
            <boxGeometry args={[0.025, 0.18, 0.003]} />
          </mesh>

          {/* === Elbow — Visible single-axis hinge === */}
          <JointRing position={[s * 0.34, 1.06, 0]} radius={0.038} mat={m.titanium} />
          {/* Elbow actuator housing */}
          <mesh position={[s * 0.34, 1.06, 0]} rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
            <cylinderGeometry args={[0.03, 0.035, 0.05, 14]} />
          </mesh>
          {/* Elbow hinge pin */}
          <mesh position={[s * 0.34, 1.06, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.titanium}>
            <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
          </mesh>

          {/* === Forearm === */}
          <mesh position={[s * 0.34, 0.88, 0]} material={m.aluminum}>
            <cylinderGeometry args={[0.03, 0.035, 0.22, 18]} />
          </mesh>
          {/* Forearm cable channel */}
          <mesh position={[s * 0.34, 0.88, -0.033]} material={m.darkSteel}>
            <boxGeometry args={[0.012, 0.18, 0.008]} />
          </mesh>

          {/* === Wrist joint === */}
          <JointRing position={[s * 0.34, 0.74, 0]} radius={0.028} mat={m.titanium} />
          <mesh position={[s * 0.34, 0.74, 0]} material={m.darkSteel}>
            <cylinderGeometry args={[0.02, 0.025, 0.02, 12]} />
          </mesh>

          {/* === Hand — Industrial tool style === */}
          {/* Palm block */}
          <mesh position={[s * 0.34, 0.68, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.045, 0.05, 0.035]} />
          </mesh>
          {/* Grip pads */}
          <mesh position={[s * 0.34, 0.68, 0.024]} material={m.grip}>
            <boxGeometry args={[0.04, 0.045, 0.005]} />
          </mesh>
          {/* Thumb — tool clamp style */}
          <mesh position={[s * 0.315, 0.67, 0.02]} material={m.darkSteel}>
            <boxGeometry args={[0.012, 0.035, 0.02]} />
          </mesh>
          {/* Two finger pads — clamp gripper */}
          <mesh position={[s * 0.33, 0.645, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.018, 0.02, 0.03]} />
          </mesh>
          <mesh position={[s * 0.355, 0.645, 0.005]} material={m.darkSteel}>
            <boxGeometry args={[0.018, 0.02, 0.03]} />
          </mesh>
          {/* Finger grip surface */}
          <mesh position={[s * 0.34, 0.634, 0.005]} material={m.grip}>
            <boxGeometry args={[0.042, 0.005, 0.025]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LEGS — Multi-axis hips, hinge knees, stable feet
   Height: ~0.70 units (38-40%)
   ═══════════════════════════════════════════════════════════════════ */
function Legs(m: Mats) {
  return (
    <group>
      {([-1, 1] as const).map(s => (
        <group key={`leg-${s}`}>
          {/* === Hip — Multi-axis mechanical structure === */}
          {/* Hip structural block */}
          <mesh position={[s * 0.1, 0.86, 0]} material={m.darkSteel}>
            <boxGeometry args={[0.07, 0.06, 0.08]} />
          </mesh>
          {/* Hip joint ring */}
          <JointRing position={[s * 0.1, 0.82, 0]} radius={0.048} mat={m.titanium} />
          {/* Hip actuator */}
          <mesh position={[s * 0.1, 0.82, 0]} rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
            <cylinderGeometry args={[0.035, 0.04, 0.04, 14]} />
          </mesh>

          {/* === Thigh === */}
          <mesh position={[s * 0.1, 0.62, 0]} material={m.aluminum}>
            <cylinderGeometry args={[0.045, 0.055, 0.32, 20]} />
          </mesh>
          {/* Thigh panel seam */}
          <mesh position={[s * 0.1, 0.62, 0.05]} material={m.aluminumDark}>
            <boxGeometry args={[0.003, 0.28, 0.003]} />
          </mesh>
          {/* Thigh actuator housing */}
          <mesh position={[s * 0.1, 0.7, 0.035]} material={m.darkSteel}>
            <boxGeometry args={[0.035, 0.08, 0.025]} />
          </mesh>

          {/* === Knee — Visible mechanical hinge === */}
          <JointRing position={[s * 0.1, 0.44, 0]} radius={0.042} mat={m.titanium} />
          {/* Knee actuator */}
          <mesh position={[s * 0.1, 0.44, 0]} rotation={[0, 0, Math.PI / 2]} material={m.darkSteel}>
            <cylinderGeometry args={[0.032, 0.036, 0.05, 14]} />
          </mesh>
          {/* Knee hinge pin */}
          <mesh position={[s * 0.1, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.titanium}>
            <cylinderGeometry args={[0.007, 0.007, 0.09, 8]} />
          </mesh>
          {/* Knee guard */}
          <mesh position={[s * 0.1, 0.44, 0.04]} material={m.aluminum}>
            <boxGeometry args={[0.06, 0.05, 0.015]} />
          </mesh>

          {/* === Shin === */}
          <mesh position={[s * 0.1, 0.26, 0.005]} material={m.aluminum}>
            <cylinderGeometry args={[0.04, 0.045, 0.28, 18]} />
          </mesh>
          {/* Shin panel seam */}
          <mesh position={[s * 0.1, 0.26, 0.045]} material={m.aluminumDark}>
            <boxGeometry args={[0.003, 0.24, 0.003]} />
          </mesh>
          {/* Shin cable channel */}
          <mesh position={[s * 0.1, 0.26, -0.042]} material={m.darkSteel}>
            <boxGeometry args={[0.01, 0.2, 0.006]} />
          </mesh>

          {/* === Ankle === */}
          <JointRing position={[s * 0.1, 0.1, 0]} radius={0.035} mat={m.titanium} />
          <mesh position={[s * 0.1, 0.1, 0]} material={m.darkSteel}>
            <cylinderGeometry args={[0.025, 0.03, 0.025, 14]} />
          </mesh>

          {/* === Foot — Stable mechanical base === */}
          {/* Main foot plate */}
          <mesh position={[s * 0.1, 0.05, 0.015]} material={m.aluminum}>
            <boxGeometry args={[0.08, 0.03, 0.14]} />
          </mesh>
          {/* Foot sole — grip pad */}
          <mesh position={[s * 0.1, 0.033, 0.015]} material={m.grip}>
            <boxGeometry args={[0.078, 0.008, 0.138]} />
          </mesh>
          {/* Toe guard */}
          <mesh position={[s * 0.1, 0.05, 0.09]} material={m.aluminumDark}>
            <boxGeometry args={[0.07, 0.025, 0.02]} />
          </mesh>
          {/* Heel block */}
          <mesh position={[s * 0.1, 0.05, -0.055]} material={m.aluminumDark}>
            <boxGeometry args={[0.065, 0.025, 0.02]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FULL ASSEMBLY — slight 3/4 orientation
   ═══════════════════════════════════════════════════════════════════ */
function IndustrialHumanoid() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very subtle idle sway — engineering product, not a toy
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.003;
    }
  });

  const mats = useMaterials();

  return (
    <group ref={groupRef} rotation={[0, -0.35, 0]} position={[0, -0.02, 0]}>
      <Head {...mats} />
      <Torso {...mats} />
      <Arms {...mats} />
      <Legs {...mats} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCENE — Professional studio HDRI, 3-point lighting, ground shadow
   ═══════════════════════════════════════════════════════════════════ */
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
      camera={{ position: [1.8, 1.1, 3.2], fov: 30, near: 0.1, far: 100 }}
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

      {/* Key light — strong, slightly warm */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={2.8}
        color="#f5f3ef"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Fill light — cooler, softer */}
      <directionalLight position={[-3, 3, 2]} intensity={1.2} color="#e0e6f0" />
      {/* Rim light — high contrast edge definition */}
      <directionalLight position={[-2, 4, -4]} intensity={2.2} color="#d5dce8" />
      {/* Subtle bottom fill */}
      <ambientLight intensity={0.15} />

      <IndustrialHumanoid />

      <ContactShadows
        position={[0, 0.025, 0]}
        opacity={0.2}
        scale={3}
        blur={2.5}
        far={1.5}
        color="#1a2030"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.06}
        rotateSpeed={0.55}
        zoomSpeed={0.8}
        minDistance={2.8}
        maxDistance={6.0}
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        target={[0, 0.85, 0]}
      />
    </Canvas>
  </Suspense>
);
