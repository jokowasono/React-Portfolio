import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes"; // masih bisa dipake di React

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const RADIUS = 2.2;
  
  // Path texture: taruh map6.png di public/map6.png
  const texture = useLoader(THREE.TextureLoader, "/map6.png");
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[RADIUS, 64, 64]}>
      <meshStandardMaterial
        map={texture}
        transparent={true}
        alphaTest={0.1}
        roughness={0.3}
        metalness={0.0}
        color={isDark ? "#1e293b" : "#e2e8f0"}
        emissive={isDark ? "#0f172a" : "#3b82f6"}
        emissiveIntensity={isDark ? 0.3 : 0.8}
      />
    </Sphere>
  );
}

export default function GlobeBackground() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Hindari hydration mismatch + SSR error
  if (!mounted || !isVisible) {
    return <div className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div 
        className={`absolute inset-0 opacity-50 pointer-events-none ${
          isDark 
            ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent' 
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent'
        }`} 
      />

      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isDark ? 1.2 : 2.0} />
          <directionalLight 
            position={[5, 3, 5]} 
            intensity={isDark ? 2.5 : 1.5}
            color={isDark ? "#ffffff" : "#1e40af"}
          />
          
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  );
}