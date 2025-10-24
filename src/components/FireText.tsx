import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FireTextProps {
  text: string;
  className?: string;
}

export const FireText = ({ text, className = "" }: FireTextProps) => {
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

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes campfire-flicker {
          0% {
            text-shadow:
              0 0 3px rgba(255, 215, 0, 0.9),
              0 0 8px rgba(255, 140, 0, 0.7),
              0 0 15px rgba(255, 69, 0, 0.6),
              0 0 25px rgba(255, 0, 0, 0.5),
              0 0 35px rgba(139, 0, 0, 0.4);
            filter: brightness(1.05) contrast(1.15) saturate(1.25);
          }
          20% {
            text-shadow:
              0 0 5px rgba(255, 215, 0, 0.8),
              0 0 12px rgba(255, 140, 0, 0.6),
              0 0 20px rgba(255, 69, 0, 0.5),
              0 0 30px rgba(255, 0, 0, 0.4),
              0 0 40px rgba(139, 0, 0, 0.3);
            filter: brightness(1.12) contrast(1.2) saturate(1.3);
          }
          40% {
            text-shadow:
              0 0 2px rgba(255, 215, 0, 1),
              0 0 6px rgba(255, 140, 0, 0.8),
              0 0 12px rgba(255, 69, 0, 0.7),
              0 0 20px rgba(255, 0, 0, 0.6),
              0 0 30px rgba(139, 0, 0, 0.5);
            filter: brightness(0.95) contrast(1.1) saturate(1.2);
          }
          60% {
            text-shadow:
              0 0 4px rgba(255, 215, 0, 0.85),
              0 0 10px rgba(255, 140, 0, 0.65),
              0 0 18px rgba(255, 69, 0, 0.55),
              0 0 28px rgba(255, 0, 0, 0.45),
              0 0 38px rgba(139, 0, 0, 0.35);
            filter: brightness(1.08) contrast(1.18) saturate(1.28);
          }
          80% {
            text-shadow:
              0 0 6px rgba(255, 215, 0, 0.75),
              0 0 14px rgba(255, 140, 0, 0.55),
              0 0 22px rgba(255, 69, 0, 0.45),
              0 0 32px rgba(255, 0, 0, 0.35),
              0 0 42px rgba(139, 0, 0, 0.25);
            filter: brightness(1.15) contrast(1.25) saturate(1.35);
          }
          100% {
            text-shadow:
              0 0 3px rgba(255, 215, 0, 0.9),
              0 0 8px rgba(255, 140, 0, 0.7),
              0 0 15px rgba(255, 69, 0, 0.6),
              0 0 25px rgba(255, 0, 0, 0.5),
              0 0 35px rgba(139, 0, 0, 0.4);
            filter: brightness(1.05) contrast(1.15) saturate(1.25);
          }
        }

        @keyframes flame-glow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }

        @keyframes ember-dance {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0) scale(1);
          }
          33% {
            opacity: 0.6;
            transform: translateY(-3px) scale(1.1);
          }
          66% {
            opacity: 0.4;
            transform: translateY(-1px) scale(0.9);
          }
        }

        .fire-text-static {
          display: inline-block;
          background: linear-gradient(
            to top,
            #8B0000 0%,
            #FF0000 12%,
            #FF4500 25%,
            #FF8C00 38%,
            #FFD700 50%,
            #FFED4E 65%,
            #FFFF99 80%,
            #FFFFFF 95%,
            rgba(255, 255, 255, 0.9) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-rendering: optimizeLegibility;
          font-feature-settings: 'kern' 1, 'liga' 1;
          position: relative;
          z-index: 2;
          animation: campfire-flicker 4s infinite ease-in-out;
        }

        .fire-text-glow {
          display: inline-block;
          background: linear-gradient(
            to top,
            #8B0000 0%,
            #FF0000 12%,
            #FF4500 25%,
            #FF8C00 38%,
            #FFD700 50%,
            #FFED4E 65%,
            #FFFF99 80%,
            #FFFFFF 95%,
            rgba(255, 255, 255, 0.9) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-rendering: optimizeLegibility;
          font-feature-settings: 'kern' 1, 'liga' 1;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          animation: flame-glow 3s infinite ease-in-out;
        }

        .fire-text-embers {
          display: inline-block;
          background: linear-gradient(
            to top,
            #8B0000 0%,
            #FF0000 12%,
            #FF4500 25%,
            #FF8C00 38%,
            #FFD700 50%,
            #FFED4E 65%,
            #FFFF99 80%,
            #FFFFFF 95%,
            rgba(255, 255, 255, 0.9) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-rendering: optimizeLegibility;
          font-feature-settings: 'kern' 1, 'liga' 1;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          animation: ember-dance 5s infinite ease-in-out;
        }
      `}</style>

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
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Lagerfeuer Glow Effect */}
        <div className="absolute inset-0 pointer-events-none">
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
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        {/* Glut-Partikel Effect */}
        <div className="absolute inset-0 pointer-events-none">
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
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};