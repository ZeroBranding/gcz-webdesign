import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FireParticles } from "./FireParticles";

interface ParallaxFireProps {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export const ParallaxFire: React.FC<ParallaxFireProps> = (props) => {
  const {
    children,
    intensity = "medium",
    className = ""
  } = props;
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
