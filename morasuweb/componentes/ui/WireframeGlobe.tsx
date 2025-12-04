"use client";

import { useEffect, useRef } from "react";

const WireframeGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // --- CONFIGURACIÓN ---
    const GLOBE_RADIUS = 220; // Tamaño de la esfera
    // Reduje los puntos para que las líneas no saturen la pantalla
    const DOT_COUNT = 300;    
    const CONNECTION_DIST = 50; // Distancia máxima para conectar dos puntos con una línea
    // Color base (Cyan cyberpunk)
    const BASE_COLOR = { r: 0, g: 200, b: 255 }; 

    let rotation = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    
    // Generar puntos 3D iniciales
    const dots: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
      dots.push({
        x: GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi),
        y: GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi),
        z: GLOBE_RADIUS * Math.cos(phi),
      });
    }

    // Mouse Interacción
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - width / 2) / width;
      const y = (e.clientY - height / 2) / height;
      targetRotation.x = y * 1.5;
      targetRotation.y = x * 1.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- RENDER LOOP ---
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Suavizado de rotación
      rotation.x += (targetRotation.x - rotation.x) * 0.05;
      rotation.y += (targetRotation.y - rotation.y) * 0.05;

      const cx = width / 2;
      const cy = height / 2;

      // 1. Proyectar todos los puntos 3D a 2D primero
      const projectedDots = dots.map((dot) => {
        // Rotación Y
        let x1 = dot.x * Math.cos(rotation.y) - dot.z * Math.sin(rotation.y);
        let z1 = dot.z * Math.cos(rotation.y) + dot.x * Math.sin(rotation.y);
        // Rotación X
        let y2 = dot.y * Math.cos(rotation.x) - z1 * Math.sin(rotation.x);
        let z2 = z1 * Math.cos(rotation.x) + dot.y * Math.sin(rotation.x);

        const scale = 400 / (400 + z2); // Perspectiva
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2, // Guardamos Z para la profundidad
          ogIndex: dots.indexOf(dot) // Índice original para comparar distancias 3D
        };
      });

      // 2. DIBUJAR LÍNEAS (Conectando puntos cercanos)
      ctx.lineWidth = 0.6;
      // Doble bucle para comparar cada punto con todos los demás
      for (let i = 0; i < projectedDots.length; i++) {
        for (let j = i + 1; j < projectedDots.length; j++) {
          const p1 = projectedDots[i];
          const p2 = projectedDots[j];
          
          // Usamos las coordenadas 3D originales para calcular la distancia real
          const d1 = dots[p1.ogIndex];
          const d2 = dots[p2.ogIndex];
          const dx = d1.x - d2.x;
          const dy = d1.y - d2.y;
          const dz = d1.z - d2.z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

          // Si están cerca, dibujamos línea
          if (dist < CONNECTION_DIST) {
            // Opacidad basada en la profundidad (más lejos = más transparente)
            const depthAlpha = ((p1.z + GLOBE_RADIUS) + (p2.z + GLOBE_RADIUS)) / (GLOBE_RADIUS * 5);
            // Opacidad basada en la distancia de conexión (más lejos entre ellos = más transparente)
            const distAlpha = 1 - (dist / CONNECTION_DIST);
            
            ctx.strokeStyle = `rgba(${BASE_COLOR.r}, ${BASE_COLOR.g}, ${BASE_COLOR.b}, ${depthAlpha * distAlpha * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 3. DIBUJAR PUNTOS (Pequeños nodos en las intersecciones)
      projectedDots.forEach((dot) => {
        const alpha = (dot.z + GLOBE_RADIUS) / (GLOBE_RADIUS * 2.5); 
        ctx.fillStyle = `rgba(${BASE_COLOR.r}, ${BASE_COLOR.g}, ${BASE_COLOR.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2); // Puntos de 1.5px de radio
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none -z-10 bg-black"
    />
  );
};

export default WireframeGlobe;