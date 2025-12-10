"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleSphere() {
  const meshRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 1. RASTREO DEL RATÓN (El método "nuclear" que nunca falla)
  // Escucha el movimiento en toda la ventana, sin importar capas transparentes
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. GENERACIÓN DE PUNTOS (La nube de puntos que te gustaba)
  const particlesPosition = useMemo(() => {
    const count = 4000; // 4000 puntos para que se vea denso y bonito
    const positions = new Float32Array(count * 3);
    const radius = 2.2; // Un poco más grande

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 

      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;
      const norm = Math.sqrt(x*x + y*y + z*z);
      
      positions[i * 3] = (x / norm) * radius;
      positions[i * 3 + 1] = (y / norm) * radius;
      positions[i * 3 + 2] = (z / norm) * radius;
    }
    return positions;
  }, []);

  // 3. ANIMACIÓN
  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      // Giro constante automático
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      
      // Movimiento interactivo con el mouse
      const targetX = mouseRef.current.y * 0.5;
      const targetZ = mouseRef.current.x * 0.5;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetZ, 0.1);
    }
  });

  return (
    // POSICIÓN: [3, -2, 0] -> Derecha (X=3), Abajo (Y=-2)
    <points ref={meshRef} position={[3, -2, 0]}>
      <bufferGeometry>
        {/* Usamos 'args' para evitar el error de TypeScript */}
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      {/* MATERIAL DE PUNTOS NEÓN */}
      <pointsMaterial
        color="#a855f7" // Morado Neón
        size={0.035}    // Tamaño ideal
        sizeAttenuation={true}
        transparent={true}
        opacity={0.9}
        blending={THREE.AdditiveBlending} // Brillo intenso
      />
    </points>
  );
}

export default function PurplePlanetScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={['#000000']} />
        <ParticleSphere />
      </Canvas>
    </div>
  );
}