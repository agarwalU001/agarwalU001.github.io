"use client";

import { useEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

// Shared "pulse" that fires when the core is clicked; modules burst outward.
const pulse = { value: 0 };

const MODULES = [
  { radius: 2.5, speed: 0.35, tilt: [0.4, 0, 0.2], phase: 0, color: "#8b5cf6", size: 0.34 },
  { radius: 2.9, speed: -0.28, tilt: [-0.6, 0.3, 0], phase: 1.2, color: "#22d3ee", size: 0.28 },
  { radius: 3.3, speed: 0.22, tilt: [1.1, 0, -0.3], phase: 2.4, color: "#f472b6", size: 0.3 },
  { radius: 2.7, speed: -0.4, tilt: [0.1, 0.8, 0.9], phase: 3.6, color: "#a3e635", size: 0.24 },
  { radius: 3.6, speed: 0.18, tilt: [-0.2, -0.5, 0.5], phase: 4.8, color: "#8b5cf6", size: 0.26 },
  { radius: 3.1, speed: 0.3, tilt: [0.8, -0.4, -0.7], phase: 5.6, color: "#22d3ee", size: 0.22 },
] as const;

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const [hovered, setHovered] = useState(false);
  const target = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useFrame((_, dt) => {
    if (!mesh.current || !material.current) return;
    mesh.current.rotation.y += dt * 0.15;
    mesh.current.rotation.x += dt * 0.05;
    const goal = (hovered ? 0.55 : 0.33) + pulse.value * 0.4;
    material.current.distort = THREE.MathUtils.lerp(material.current.distort, goal, 0.06);
    const s = (hovered ? 1.08 : 1) + pulse.value * 0.12;
    mesh.current.scale.lerp(target.set(s, s, s), 0.1);
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    pulse.value = 1;
  };

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <icosahedronGeometry args={[1.25, 64]} />
      <MeshDistortMaterial
        ref={material}
        color="#3d2994"
        emissive="#1b0a4a"
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.08}
        iridescence={1}
        iridescenceIOR={1.4}
        envMapIntensity={2.4}
        distort={0.33}
        speed={1.6}
      />
    </mesh>
  );
}

function Shell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y -= dt * 0.06;
    ref.current.rotation.z += dt * 0.03;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.9, 1]} />
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.14} />
    </mesh>
  );
}

/** Glowing "micro-frontend" modules orbiting the core, wired to it with light beams. */
function Modules() {
  const boxes = useRef<(THREE.Mesh | null)[]>([]);
  const lines = useRef<THREE.LineSegments>(null);
  const world = useMemo(() => new THREE.Vector3(), []);
  const positions = useMemo(() => new Float32Array(MODULES.length * 6), []);

  useFrame((state, dt) => {
    pulse.value = Math.max(0, pulse.value - dt * 1.4);
    const t = state.clock.elapsedTime;
    const burst = 1 + pulse.value * 0.35;

    MODULES.forEach((m, i) => {
      const box = boxes.current[i];
      if (!box) return;
      const a = t * m.speed + m.phase;
      box.position.set(Math.cos(a) * m.radius * burst, Math.sin(a * 1.3) * 0.25, Math.sin(a) * m.radius * burst);
      box.rotation.x += dt * 0.6;
      box.rotation.y += dt * 0.4;

      // Beam from the core to the module, expressed in the lines' parent space.
      box.getWorldPosition(world);
      lines.current?.parent?.worldToLocal(world);
      positions.set([0, 0, 0, world.x, world.y, world.z], i * 6);
    });

    if (lines.current) {
      const attr = lines.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  });

  return (
    <>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a78bfa" transparent opacity={0.22} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {MODULES.map((m, i) => (
        <group key={i} rotation={m.tilt as unknown as [number, number, number]}>
          {/* orbit ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[m.radius, 0.004, 8, 160]} />
            <meshBasicMaterial color={m.color} transparent opacity={0.18} />
          </mesh>
          <RoundedBox
            ref={(b: THREE.Mesh | null) => { boxes.current[i] = b; }}
            args={[m.size, m.size, m.size]}
            radius={0.06}
            smoothness={4}
          >
            <meshPhysicalMaterial
              color={m.color}
              emissive={m.color}
              emissiveIntensity={0.9}
              metalness={0.3}
              roughness={0.15}
              clearcoat={1}
            />
          </RoundedBox>
        </group>
      ))}
    </>
  );
}

// Generated once at module load so renders stay pure.
const STARS = (() => {
  const count = 1400;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 6 + Math.random() * 12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
})();

function Starfield() {
  const ref = useRef<THREE.Points>(null);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STARS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        color="#c4b5fd"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Tilts the whole rig toward the cursor and places it responsively. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const wide = viewport.width > 8;
  const x = wide ? viewport.width * 0.24 : 0;
  const scale = wide ? 0.82 : Math.min(0.8, viewport.width / 9);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.5, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.35, 0.05);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x + state.pointer.x * 0.15, 0.05);
  });

  return (
    <group ref={ref} scale={scale} position={[x, wide ? 0 : 0.6, 0]}>
      {children}
    </group>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 3, 4]} intensity={30} color="#8b5cf6" />
      <pointLight position={[-4, -2, 3]} intensity={20} color="#22d3ee" />

      <Rig>
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
          <Core />
          <Shell />
          <Modules />
        </Float>
        <Sparkles count={60} scale={7} size={2.2} speed={0.35} color="#c4b5fd" opacity={0.6} />
      </Rig>
      <Starfield />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={5} color="#8b5cf6" position={[0, 5, -9]} scale={3} />
          <Lightformer form="circle" intensity={3} color="#22d3ee" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={3} />
          <Lightformer form="ring" intensity={3} color="#f472b6" position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={8} />
          <Lightformer intensity={1.5} position={[-10, -1, 0]} rotation-y={Math.PI / 2} scale={[10, 1, 1]} />
        </group>
        <group>
          <Lightformer form="rect" intensity={1.6} color="#c4b5fd" position={[4, 2, 10]} scale={[8, 4, 1]} />
          <Lightformer form="circle" intensity={2.5} color="#22d3ee" position={[-6, -4, 8]} scale={3} />
        </group>
      </Environment>
    </Canvas>
  );
}
