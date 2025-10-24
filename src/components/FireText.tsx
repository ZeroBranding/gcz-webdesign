import React, { useEffect, useState } from "react";
import "./../styles/fire-text.css";

interface FireTextProps {
  text: string;
  className?: string;
  ariaLabel?: string;
  priority?: "high" | "medium" | "low";
  variant?: "classic" | "hologram" | "cyber" | "neon";
  intensity?: "low" | "medium" | "high";
  glow?: boolean;
  animated?: boolean;
}

export const FireText: React.FC<FireTextProps> = ({
  text,
  className = "",
  ariaLabel,
  priority = "medium",
  variant = "classic",
  intensity = "medium",
  glow = true,
  animated = true
}) => {
  const [flickerValues, setFlickerValues] = useState<number[]>([]);

  useEffect(() => {
    // Realistisches Lagerfeuer flackert langsam und natürlich
    const generateFlicker = () => {
      // Langsamere, natürlichere Helligkeitsänderungen
      const time = Date.now() * 0.0005; // Sehr langsame Änderung
      const baseIntensity = 0.8 + Math.sin(time) * 0.15 + Math.sin(time * 0.7) * 0.1;
      const randomVariation = (Math.random() - 0.5) * 0.2;
      return Math.max(0.4, Math.min(1.3, baseIntensity + randomVariation));
    };

    // 60fps für flüssige Animation
    const interval = setInterval(() => {
      setFlickerValues(text.split('').map(() => generateFlicker()));
    }, 1000 / 60); // 60 FPS für flüssig

    // Initiale Werte setzen
    setFlickerValues(text.split('').map(() => generateFlicker()));

    return () => clearInterval(interval);
  }, [text]);

  if (!text) return null;

  // Screen reader friendly heading levels
  const getHeadingProps = () => {
    switch (priority) {
      case "high":
        return {
          as: "h1",
          "aria-level": 1
        };
      case "medium":
        return {
          as: "h2",
          "aria-level": 2
        };
      case "low":
        return {
          as: "h3",
          "aria-level": 3
        };
      default:
        return {
          as: "span",
          "aria-level": undefined
        };
    }
  };

  const headingProps = getHeadingProps();
  const Element = headingProps.as as "h1" | "h2" | "h3" | "span";

  // Get text classes based on variant
  const getTextClasses = () => {
    const baseClasses = "inline-block font-bold";

    switch (variant) {
      case "hologram":
        return `${baseClasses} text-hologram-primary`;
      case "cyber":
        return `${baseClasses} text-hologram-cyber`;
      case "neon":
        return `${baseClasses} text-hologram-neon`;
      default:
        return `${baseClasses} fire-text-static`;
    }
  };

  // Get glow classes based on variant and glow prop
  const getGlowClasses = () => {
    if (!glow) return "";

    switch (variant) {
      case "hologram":
        return "glow-hologram-intense";
      case "cyber":
        return "glow-cyber-pulse";
      case "neon":
        return "animate-pulse-glow";
      default:
        return "shadow-glow";
    }
  };

  return (
    <Element
      className={`inline-block ${className}`}
      aria-label={ariaLabel || text}
      role="text"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={`relative ${getGlowClasses()}`}>
        <div className="flex">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={getTextClasses()}
              style={{
                animationDelay: animated ? `${index * 0.15}s` : undefined,
                filter: variant === "classic" ?
                  `brightness(${flickerValues[index] || 1}) contrast(1.15) saturate(1.25)` :
                  undefined,
              }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Enhanced Background Grid for Hologram Variants */}
        {(variant === "hologram" || variant === "cyber") && (
          <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
            <div className={variant === "hologram" ? "bg-hologram-grid" : "bg-cyber-circuit"} />
          </div>
        )}

        {/* Glow Layer for Classic Variant */}
        {variant === "classic" && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="flex">
              {text.split('').map((char, index) => (
                <span
                  key={`glow-${index}`}
                  className="fire-text-glow"
                  style={{
                    animationDelay: animated ? `${index * 0.15}s` : undefined,
                    filter: `brightness(${flickerValues[index] || 1}) contrast(1.3) saturate(1.4) blur(1px)`,
                    opacity: 0.7 + (flickerValues[index] || 1) * 0.2,
                  }}
                  aria-hidden="true"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ember Layer for Classic Variant */}
        {variant === "classic" && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="flex">
              {text.split('').map((char, index) => (
                <span
                  key={`embers-${index}`}
                  className="fire-text-embers"
                  style={{
                    animationDelay: animated ? `${index * 0.2}s` : undefined,
                    filter: `brightness(${flickerValues[index] || 1}) contrast(1.4) saturate(1.5) blur(2px)`,
                    opacity: 0.2 + (flickerValues[index] || 1) * 0.3,
                  }}
                  aria-hidden="true"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Screen reader text */}
        <span className="sr-only">
          {text} - {variant === "classic" ? "animierter Text mit Feuer-Effekt" :
                   variant === "hologram" ? "holographischer Text-Effekt" :
                   variant === "cyber" ? "cyber-punk Text-Effekt" :
                   "neon Text-Effekt"}
        </span>
      </div>
    </Element>
  );
};