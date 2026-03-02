import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo, useState } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   PBR MATERIALS
   ═══════════════════════════════════════════════ */
function useMaterials() {
  return useMemo(() => {
    // Body panels — smooth, matte ceramic feel, low reflections
    const aluminum = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#D0D4DA"),
      metalness: 0.15,
      roughness: 0.55,
      envMapIntensity: 0.3,
      clearcoat: 0.08,
      clearcoatRoughness: 0.4,
    });
    // Secondary body — slightly darker, same smooth feel
    const aluminumDark = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#A8AEB8"),
      metalness: 0.2,
      roughness: 0.5,
      envMapIntensity: 0.25,
      clearcoat: 0.06,
      clearcoatRoughness: 0.5,
    });
    // Joints — retain metallic contrast
    const titanium = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#5A6270"),
      metalness: 0.85,
      roughness: 0.28,
      envMapIntensity: 0.6,
      clearcoat: 0.15,
      clearcoatRoughness: 0.2,
    });
    // Structural dark parts — subtle metal
    const darkSteel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2A2E35"),
      metalness: 0.6,
      roughness: 0.4,
      envMapIntensity: 0.35,
      clearcoat: 0.1,
    });
    // Visor — glossy but toned down
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1A2030"),
      metalness: 0.3,
      roughness: 0.08,
      clearcoat: 0.8,
      clearcoatRoughness: 0.05,
      envMapIntensity: 0.8,
      transparent: true,
      opacity: 0.92,
    });
    // Sensor accent
    const sensor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4A90A8"),
      emissive: new THREE.Color("#4A90A8"),
      emissiveIntensity: 0.1,
      metalness: 0.2,
      roughness: 0.3,
      clearcoat: 0.4,
    });
    // Grip — rubber-like
    const grip = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1A1D22"),
      metalness: 0.08,
      roughness: 0.85,
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
  const visorRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const sensorRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = Math.sin(t * 2.0) * 0.5 + 0.5; // 0~1
    if (visorRef.current) {
      visorRef.current.emissive = new THREE.Color("#4A90A8");
      visorRef.current.emissiveIntensity = 0.05 + pulse * 0.12;
    }
    if (sensorRef.current) {
      sensorRef.current.emissiveIntensity = 0.08 + pulse * 0.25;
    }
  });

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
      <mesh position={[0, 0.215, 0]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshPhysicalMaterial ref={visorRef} color="#1A2030" metalness={0.3} roughness={0.08} clearcoat={0.8} clearcoatRoughness={0.05} envMapIntensity={0.8} transparent opacity={0.92} />
      </mesh>

      {/* Visor recess */}
      <mesh material={m.darkSteel} position={[0, 0.03, 0.13]}>
        <boxGeometry args={[0.28, 0.04, 0.04]} />
      </mesh>
      {/* Visor glass — narrow horizontal band */}
      <mesh position={[0, 0.03, 0.155]}>
        <boxGeometry args={[0.26, 0.025, 0.012]} />
        <meshPhysicalMaterial ref={visorRef} color="#1A2030" metalness={0.3} roughness={0.08} clearcoat={0.8} clearcoatRoughness={0.05} envMapIntensity={0.8} transparent opacity={0.92} />
      </mesh>
      {/* Visor wraps */}
      <mesh material={m.visor} position={[-0.145, 0.03, 0.12]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.04, 0.025, 0.012]} />
      </mesh>
      <mesh material={m.visor} position={[0.145, 0.03, 0.12]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[0.04, 0.025, 0.012]} />
      </mesh>
      {/* Sensor dot — pulsing glow */}
      <mesh position={[0, 0.03, 0.163]}>
        <sphereGeometry args={[0.004, 8, 8]} />
        <meshPhysicalMaterial ref={sensorRef} color="#4A90A8" emissive="#4A90A8" emissiveIntensity={0.1} metalness={0.2} roughness={0.3} clearcoat={0.4} />
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
  const chestRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (chestRef.current) {
      const breath = Math.sin(state.clock.elapsedTime * 1.2) * 0.012 + 1;
      const breathZ = Math.sin(state.clock.elapsedTime * 1.2) * 0.008 + 1;
      chestRef.current.scale.set(1, breath, breathZ);
    }
  });

  return (
    <group>
      {/* Neck */}
      <mesh position={[0, 1.53, 0]} material={m.titanium}>
        <cylinderGeometry args={[0.04, 0.055, 0.08, 16]} />
      </mesh>

      {/* Breathing chest group */}
      <group ref={chestRef}>
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
      </group>

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

/* ═══════════════════════════════════════════════
   FLOATING PARTS — mechanical components orbiting the robot
   ═══════════════════════════════════════════════ */
interface FloatingPartProps {
  position: [number, number, number];
  speed: number;
  radius: number;
  phase: number;
  children: React.ReactNode;
}

function FloatingPart({ position, speed, radius, phase, children }: FloatingPartProps) {
  const ref = useRef<THREE.Group>(null);
  const mouse3D = useRef(new THREE.Vector3());
  const smoothPos = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;

    // Base orbit position
    const baseX = position[0] + Math.sin(t) * radius;
    const baseY = position[1] + Math.sin(t * 1.3) * radius * 0.6;
    const baseZ = position[2] + Math.cos(t) * radius * 0.4;

    // Project mouse into 3D space at part's depth
    const { pointer, camera } = state;
    const mouseNDC = new THREE.Vector3(pointer.x, pointer.y, 0.5);
    mouseNDC.unproject(camera);
    const dir = mouseNDC.sub(camera.position).normalize();
    const dist = (baseY - camera.position.y) / dir.y;
    mouse3D.current.copy(camera.position).add(dir.multiplyScalar(dist));

    // Repulsion force
    const dx = baseX - mouse3D.current.x;
    const dy = baseY - mouse3D.current.y;
    const dz = baseZ - mouse3D.current.z;
    const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const repulseRadius = 0.6;
    const repulseStrength = 0.15;

    let offsetX = 0, offsetY = 0, offsetZ = 0;
    if (distToMouse < repulseRadius && distToMouse > 0.01) {
      const force = (1 - distToMouse / repulseRadius) * repulseStrength;
      offsetX = (dx / distToMouse) * force;
      offsetY = (dy / distToMouse) * force;
      offsetZ = (dz / distToMouse) * force;
    }

    // Smooth interpolation
    const targetX = baseX + offsetX;
    const targetY = baseY + offsetY;
    const targetZ = baseZ + offsetZ;
    smoothPos.current.x += (targetX - smoothPos.current.x) * 0.08;
    smoothPos.current.y += (targetY - smoothPos.current.y) * 0.08;
    smoothPos.current.z += (targetZ - smoothPos.current.z) * 0.08;

    ref.current.position.copy(smoothPos.current);
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.5;
  });

  return <group ref={ref}>{children}</group>;
}

function FloatingComponents() {
  const partMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#C0C6CE"),
    metalness: 0.7,
    roughness: 0.35,
    envMapIntensity: 0.4,
  }), []);
  const darkMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#3A3F48"),
    metalness: 0.6,
    roughness: 0.4,
    envMapIntensity: 0.3,
  }), []);
  const glowMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#4A90A8"),
    emissive: new THREE.Color("#4A90A8"),
    emissiveIntensity: 0.15,
    metalness: 0.2,
    roughness: 0.3,
    transparent: true,
    opacity: 0.85,
  }), []);

  return (
    <group>
      {/* Gear / cog */}
      <FloatingPart position={[-0.55, 1.1, 0.25]} speed={0.4} radius={0.05} phase={0}>
        <mesh material={partMat}>
          <torusGeometry args={[0.06, 0.015, 8, 6]} />
        </mesh>
        <mesh material={darkMat}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
        </mesh>
      </FloatingPart>

      {/* Circuit board chip */}
      <FloatingPart position={[0.5, 1.4, -0.15]} speed={0.35} radius={0.04} phase={1.5}>
        <mesh material={darkMat}>
          <boxGeometry args={[0.08, 0.012, 0.06]} />
        </mesh>
        <mesh material={glowMat} position={[0, 0.008, 0]}>
          <boxGeometry args={[0.04, 0.004, 0.03]} />
        </mesh>
        {/* Pins */}
        {[-0.03, -0.01, 0.01, 0.03].map((x, i) => (
          <mesh key={i} material={partMat} position={[x, -0.008, 0.035]}>
            <boxGeometry args={[0.004, 0.003, 0.012]} />
          </mesh>
        ))}
      </FloatingPart>

      {/* Servo motor */}
      <FloatingPart position={[-0.45, 0.5, 0.35]} speed={0.3} radius={0.06} phase={3.0}>
        <mesh material={partMat}>
          <cylinderGeometry args={[0.035, 0.035, 0.05, 16]} />
        </mesh>
        <mesh material={darkMat} position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
        </mesh>
        <mesh material={partMat} position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.06, 0.008, 0.008]} />
        </mesh>
      </FloatingPart>

      {/* Sensor lens */}
      <FloatingPart position={[0.6, 0.7, 0.3]} speed={0.45} radius={0.04} phase={4.5}>
        <mesh material={darkMat}>
          <cylinderGeometry args={[0.03, 0.04, 0.025, 16]} />
        </mesh>
        <mesh material={glowMat} position={[0, 0.014, 0]}>
          <sphereGeometry args={[0.022, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>
      </FloatingPart>

      {/* Bolt / fastener */}
      <FloatingPart position={[-0.4, 1.5, -0.2]} speed={0.5} radius={0.03} phase={2.2}>
        <mesh material={partMat}>
          <cylinderGeometry args={[0.018, 0.018, 0.03, 6]} />
        </mesh>
        <mesh material={partMat} position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.025, 8]} />
        </mesh>
      </FloatingPart>

      {/* Small ring bearing */}
      <FloatingPart position={[0.35, 1.7, 0.1]} speed={0.38} radius={0.03} phase={5.0}>
        <mesh material={partMat}>
          <torusGeometry args={[0.03, 0.008, 10, 20]} />
        </mesh>
      </FloatingPart>
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
        toneMappingExposure: 0.85,
      }}
      shadows
    >
      <Environment preset="studio" environmentIntensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.8} color="#f5f3ef" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-3, 3, 2]} intensity={0.6} color="#e0e6f0" />
      <directionalLight position={[-2, 4, -4]} intensity={0.9} color="#d5dce8" />
      <ambientLight intensity={0.08} />

      <IndustrialHumanoid />
      <FloatingComponents />

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
