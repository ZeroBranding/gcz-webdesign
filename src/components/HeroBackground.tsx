import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

function HologramSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Create hologram shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color("#FFD700") },
        colorB: { value: new THREE.Color("#D21F1F") },
        colorC: { value: new THREE.Color("#00D9FF") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          // Add wave distortion
          vec3 pos = position;
          float wave = sin(pos.x * 3.0 + time) * cos(pos.y * 3.0 + time) * 0.1;
          pos += normal * wave;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 colorC;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Create hologram scan lines
          float scanline = sin(vUv.y * 100.0 + time * 2.0) * 0.5 + 0.5;
          
          // Create color gradient based on position
          float mixer = sin(vPosition.x + vPosition.y + vPosition.z + time * 0.5) * 0.5 + 0.5;
          vec3 color = mix(colorA, colorB, mixer);
          color = mix(color, colorC, sin(time * 0.3) * 0.5 + 0.5);
          
          // Add fresnel effect
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
          
          // Combine effects
          vec3 finalColor = color * (0.7 + scanline * 0.3);
          float alpha = 0.6 + fresnel * 0.4;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      
      if (materialRef.current) {
        materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
      }
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]} scale={2.8}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </Sphere>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFD700"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#FFD700" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#D21F1F" />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00D9FF" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#FF00FF" />
        <fog attach="fog" args={["#0A0A0A", 5, 15]} />
        <HologramSphere />
        <ParticleField />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background pointer-events-none" />
    </div>
  );
};
