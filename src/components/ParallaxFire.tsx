import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FireParticles } from "./FireParticles";

interface ParallaxFireProps {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
  particles?: boolean;
  className?: string;
}

export const ParallaxFire: React.FC<ParallaxFireProps> = ({
  children,
  intensity = "medium",
  particles = true,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.8]);

  // Mouse tracking for interactive parallax
  useEffect(() => {
    let lastScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollVelocity(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getParticleCount = () => {
    switch (intensity) {
      case "high": return 100;
      case "low": return 20;
      default: return 50;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background Fire Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: y1, opacity }}
        aria-hidden="true"
      >
        <FireParticles
          count={getParticleCount()}
          intensity={intensity}
          interactive={true}
        />
      </motion.div>

      {/* Mid Layer - Enhanced Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: y2,
          scale,
          opacity: opacity
        }}
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 10
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-radial from-yellow-500/20 via-orange-500/10 to-transparent animate-pulse" />
      </motion.div>

      {/* Foreground Interactive Layer */}
      <motion.div
        style={{
          y: y3,
          opacity
        }}
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 15 + scrollVelocity * 0.1
        }}
        transition={{ type: "spring", stiffness: 80, damping: 35 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Dynamic Fire Reflections */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0]),
          scaleY: useTransform(scrollYProgress, [0, 1], [1, 0.5])
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/30 via-orange-500/20 to-transparent backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-radial from-red-500/10 to-transparent" />
      </motion.div>
    </div>
  );
};

// Fire Text with Scroll Effects
interface ScrollFireTextProps {
  text: string;
  className?: string;
  ariaLabel?: string;
  priority?: "high" | "medium" | "low";
  scrollMultiplier?: number;
}

export const ScrollFireText: React.FC<ScrollFireTextProps> = ({
  text,
  className = "",
  ariaLabel,
  priority = "medium",
  scrollMultiplier = 1
}) => {
  const [flickerValues, setFlickerValues] = useState<number[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"]
  });

  // Scroll-based transforms
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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

  const headingProps = {
    high: { as: "h1" as const },
    medium: { as: "h2" as const },
    low: { as: "h3" as const }
  };

  const props = headingProps[priority];
  const Element = props.as;

  return (
    <Element
      ref={textRef}
      className={`relative inline-block ${className}`}
      aria-label={ariaLabel || text}
      role="text"
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div
        style={{
          y: y,
          rotateX: rotateX,
          scale: scale,
          opacity: opacity
        }}
        className="relative"
      >
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
              } : {}}
              transition={{
                opacity: { delay: index * 0.1, duration: 0.5 },
                y: { delay: index * 0.1, duration: 0.5 },
                rotateY: { duration: 3, repeat: Infinity, delay: index * 0.2 }
              }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Enhanced Glow with 3D effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1.1, 0.9]),
            opacity: useTransform(scrollYProgress, [0, 1], [0.8, 0.3])
          }}
          aria-hidden="true"
        >
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
                animate={{
                  z: [0, 50, 0],
                  rotateX: [0, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Ember Particles with depth */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [0.9, 1.2]),
            opacity: useTransform(scrollYProgress, [0, 1], [0.5, 0.8])
          }}
          aria-hidden="true"
        >
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
                animate={{
                  y: [0, -20, 0],
                  rotateZ: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: index * 0.4
                }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Screen reader text */}
        <span className="sr-only">
          {text} - 3D animierter Text mit Scroll-Effekten
        </span>
      </motion.div>
    </Element>
  );
};
