import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FireParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
  color: string;
}

interface FireParticlesProps {
  count?: number;
  intensity?: "low" | "medium" | "high";
  interactive?: boolean;
  className?: string;
}

export const FireParticles: React.FC<FireParticlesProps> = ({
  count = 50,
  intensity = "medium",
  interactive = false,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<FireParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const getIntensitySettings = () => {
    switch (intensity) {
      case "high":
        return { count: count * 2, speed: 3, size: 1.5 };
      case "low":
        return { count: count / 2, speed: 1, size: 0.7 };
      default:
        return { count, speed: 2, size: 1 };
    }
  };

  const settings = getIntensitySettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      setDimensions({ width: rect.width, height: rect.height });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: settings.count }, (_, i) => ({
        id: i,
        x: Math.random() * dimensions.width,
        y: dimensions.height + Math.random() * 50,
        size: (Math.random() * 3 + 1) * settings.size,
        opacity: Math.random() * 0.8 + 0.2,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: -(Math.random() * 3 + 2) * settings.speed,
        life: 0,
        maxLife: Math.random() * 100 + 50,
        color: `hsl(${Math.random() * 60 + 15}, 100%, ${Math.random() * 30 + 50}%)` // Orange to yellow
      }));
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle physics
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.life++;
        particle.opacity = Math.max(0, particle.opacity - 0.01);
        particle.velocityY += 0.1; // Gravity
        particle.velocityX *= 0.99; // Air resistance

        // Interactive mouse attraction
        if (interactive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.velocityX += (dx / distance) * force * 0.5;
            particle.velocityY += (dy / distance) * force * 0.5;
          }
        }

        // Draw particle with glow effect
        if (particle.life < particle.maxLife) {
          ctx.save();
          ctx.globalAlpha = particle.opacity;

          // Outer glow
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = particle.size * 2;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.shadowBlur = 0;
          ctx.fillStyle = `hsl(${Math.random() * 60 + 15}, 100%, 90%)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();

          return true;
        }

        return false;
      });

      // Add new particles
      if (particlesRef.current.length < settings.count) {
        const newParticles = Math.min(5, settings.count - particlesRef.current.length);
        for (let i = 0; i < newParticles; i++) {
          particlesRef.current.push({
            id: Date.now() + i,
            x: Math.random() * dimensions.width,
            y: dimensions.height + Math.random() * 20,
            size: (Math.random() * 3 + 1) * settings.size,
            opacity: Math.random() * 0.8 + 0.2,
            velocityX: (Math.random() - 0.5) * 2,
            velocityY: -(Math.random() * 3 + 2) * settings.speed,
            life: 0,
            maxLife: Math.random() * 100 + 50,
            color: `hsl(${Math.random() * 60 + 15}, 100%, ${Math.random() * 30 + 50}%)`
          });
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, settings, interactive]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        width: "100%",
        height: "100%"
      }}
      aria-hidden="true"
    />
  );
};

// Enhanced FireText with 3D Particles
interface EnhancedFireTextProps {
  text: string;
  className?: string;
  ariaLabel?: string;
  priority?: "high" | "medium" | "low";
  particles?: boolean;
  parallax?: boolean;
}

export const EnhancedFireText: React.FC<EnhancedFireTextProps> = ({
  text,
  className = "",
  ariaLabel,
  priority = "medium",
  particles = true,
  parallax = false
}) => {
  const [flickerValues, setFlickerValues] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateFlicker = () => {
      const time = Date.now() * 0.0005;
      const baseIntensity = 0.8 + Math.sin(time) * 0.15 + Math.sin(time * 0.7) * 0.1;
      const randomVariation = (Math.random() - 0.5) * 0.2;
      return Math.max(0.4, Math.min(1.3, baseIntensity + randomVariation));
    };

    const interval = setInterval(() => {
      setFlickerValues(text.split('').map(() => generateFlicker()));
    }, 1000 / 60);

    setFlickerValues(text.split('').map(() => generateFlicker()));

    return () => clearInterval(interval);
  }, [text]);

  // Mouse tracking for parallax
  useEffect(() => {
    if (!parallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parallax]);

  const headingProps = {
    high: { as: "h1" as const, level: 1 },
    medium: { as: "h2" as const, level: 2 },
    low: { as: "h3" as const, level: 3 }
  };

  const props = headingProps[priority];
  const Element = props.as;

  return (
    <Element
      ref={containerRef}
      className={`relative inline-block ${className}`}
      aria-label={ariaLabel || text}
      role="text"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative">
        {/* Main Fire Text */}
        <div className="flex">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              className="fire-text-static"
              style={{
                animationDelay: `${index * 0.15}s`,
                filter: `brightness(${flickerValues[index] || 1}) contrast(1.15) saturate(1.25)`,
              }}
              animate={parallax ? {
                x: mousePosition.x * 10 * (index + 1),
                y: mousePosition.y * 5 * (index + 1)
              } : undefined}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Glow Layer */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="flex">
            {text.split('').map((char, index) => (
              <motion.span
                key={`glow-${index}`}
                className="fire-text-glow"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  filter: `brightness(${flickerValues[index] || 1}) contrast(1.3) saturate(1.4) blur(1px)`,
                  opacity: 0.7 + (flickerValues[index] || 1) * 0.2,
                }}
                animate={parallax ? {
                  x: mousePosition.x * 15 * (index + 1),
                  y: mousePosition.y * 8 * (index + 1)
                } : undefined}
                transition={{ type: "spring", stiffness: 80, damping: 30 }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Ember Layer */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="flex">
            {text.split('').map((char, index) => (
              <motion.span
                key={`embers-${index}`}
                className="fire-text-embers"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  filter: `brightness(${flickerValues[index] || 1}) contrast(1.4) saturate(1.5) blur(2px)`,
                  opacity: 0.2 + (flickerValues[index] || 1) * 0.3,
                }}
                animate={parallax ? {
                  x: mousePosition.x * 8 * (index + 1),
                  y: mousePosition.y * 12 * (index + 1)
                } : undefined}
                transition={{ type: "spring", stiffness: 60, damping: 35 }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* 3D Particles Layer */}
        {particles && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <FireParticles
              count={30}
              intensity="medium"
              interactive={true}
              className="opacity-60"
            />
          </div>
        )}

        {/* Screen reader text */}
        <span className="sr-only">
          {text} - animierter Text mit 3D Feuer-Effekt
        </span>
      </div>
    </Element>
  );
};
