import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Ring, Line, Text, Box, Plane } from "@react-three/drei";
import * as THREE from "three";

function CodeEditorHologram() {
  const groupRef = useRef<THREE.Group>(null);

  const codeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: "#FFD700",
      transparent: true,
      opacity: 0.8,
      wireframe: true,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Code Editor Frame */}
      <Box args={[4, 2.5, 0.1]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#1a1a1a"
          transparent
          opacity={0.8}
          wireframe
        />
      </Box>

      {/* Code Screen */}
      <Plane args={[3.6, 2.1]} position={[0, 0, 0.06]}>
        <primitive object={codeMaterial} />
      </Plane>

      {/* Code Lines */}
      {Array.from({ length: 6 }, (_, i) => {
        const yPos = 0.8 - (i * 0.25);
        return (
          <Text
            key={i}
            position={[-1.5, yPos, 0.1]}
            fontSize={0.08}
            color="#FFD700"
            anchorX="left"
            anchorY="middle"
          >
            {i % 2 === 0 ? `<div className="...">` : `  display: flex; {}`}
          </Text>
        );
      })}

      {/* Browser Window */}
      <Box args={[2, 1.2, 0.05]} position={[3, 1, 0]}>
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.3}
          wireframe
        />
      </Box>

      {/* Mobile Frame */}
      <Box args={[0.8, 1.4, 0.05]} position={[-3, -1, 0]}>
        <meshBasicMaterial
          color="#D21F1F"
          transparent
          opacity={0.4}
          wireframe
        />
      </Box>
    </group>
  );
}

function CSSGridVisualization() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={gridRef} position={[0, -2, 0]}>
      <Box args={[3, 2, 0.05]}>
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.2}
          wireframe
        />
      </Box>

      {Array.from({ length: 6 }, (_, i) => {
        const x = (i % 3 - 1) * 0.8;
        const y = (Math.floor(i / 3) - 0.5) * 0.8;
        return (
          <Box key={i} args={[0.6, 0.6, 0.1]} position={[x, y, 0.1]}>
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.6}
              wireframe
            />
          </Box>
        );
      })}
    </group>
  );
}

function DesignToolsOrbit() {
  const toolsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (toolsRef.current) {
      toolsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={toolsRef}>
      {[
        { name: "Figma", color: "#F24E1E", pos: [3, 0, 0] },
        { name: "VS Code", color: "#007ACC", pos: [-3, 0, 0] },
        { name: "Chrome", color: "#4285F4", pos: [0, 2, 0] },
        { name: "GitHub", color: "#181717", pos: [0, -2, 0] },
      ].map((tool) => (
        <group key={tool.name} position={tool.pos as [number, number, number]}>
          <Sphere args={[0.15, 16, 16]}>
            <meshBasicMaterial
              color={tool.color}
              transparent
              opacity={0.8}
            />
          </Sphere>
          <Text
            position={[0, 0.3, 0]}
            fontSize={0.08}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
          >
            {tool.name}
          </Text>
        </group>
      ))}
    </group>
  );
}

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} color="#FFD700" />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#D21F1F" />
        <pointLight position={[3, 3, 3]} intensity={1} color="#00D9FF" />

        <fog attach="fog" args={["#0A0A0A", 10, 25]} />

        <CodeEditorHologram />
        <CSSGridVisualization />
        <DesignToolsOrbit />

        {/* Floating code symbols */}
        {Array.from({ length: 20 }, (_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 6 + Math.random() * 4;
          return (
            <Text
              key={i}
              position={[
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 8,
                Math.sin(angle) * radius - 5
              ]}
              fontSize={0.05 + Math.random() * 0.03}
              color="#FFD700"
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              {Math.random() > 0.5 ? "</>" : "{}"}
            </Text>
          );
        })}
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/70 pointer-events-none" />

      {/* Webdesign-themed effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/3 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-red-500/3 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};
