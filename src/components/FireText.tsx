import React, { useEffect, useState } from "react";
import "./../styles/fire-text.css";

interface FireTextProps {
  text: string;
  className?: string;
  ariaLabel?: string;
  priority?: "high" | "medium" | "low";
}

export const FireText: React.FC<FireTextProps> = ({
  text,
  className = "",
  ariaLabel,
  priority = "medium"
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
  const Element = headingProps.as as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={`inline-block ${className}`}
      aria-label={ariaLabel || text}
      role="text"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative">
        <div className="flex">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="fire-text-static"
              style={{
                animationDelay: `${index * 0.15}s`,
                filter: `brightness(${flickerValues[index] || 1}) contrast(1.15) saturate(1.25)`,
              }}
              aria-hidden="true" // Hide decorative elements from screen readers
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Lagerfeuer Glow Effect - decorative only */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="flex">
            {text.split('').map((char, index) => (
              <span
                key={`glow-${index}`}
                className="fire-text-glow"
                style={{
                  animationDelay: `${index * 0.15}s`,
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

        {/* Glut-Partikel Effect - decorative only */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="flex">
            {text.split('').map((char, index) => (
              <span
                key={`embers-${index}`}
                className="fire-text-embers"
                style={{
                  animationDelay: `${index * 0.2}s`,
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

        {/* Screen reader only text for fire effect description */}
        <span className="sr-only">
          {text} - animierter Text mit Feuer-Effekt
        </span>
      </div>
    </Element>
  );
};