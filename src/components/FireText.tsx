import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FireTextProps {
  text: string;
  className?: string;
}

export const FireText = ({ text, className = "" }: FireTextProps) => {
  const [flickerValues, setFlickerValues] = useState<number[]>([]);

  useEffect(() => {
    // Realistisches Feuer flackert langsamer und natürlicher
    const generateFlicker = () => {
      // Basis-Helligkeit für realistisches Feuer
      const baseIntensity = 0.7 + Math.sin(Date.now() * 0.001) * 0.2;
      return Math.max(0.3, Math.min(1.2, baseIntensity + (Math.random() - 0.5) * 0.4));
    };

    // Langsameres Update für realistisches Flackern (15fps statt 60fps)
    const interval = setInterval(() => {
      setFlickerValues(text.split('').map(() => generateFlicker()));
    }, 1000 / 15); // 15 FPS für realistisches Flackern

    // Initiale Werte setzen
    setFlickerValues(text.split('').map(() => generateFlicker()));

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes realistic-fire-flicker {
          0% {
            text-shadow:
              0 0 5px rgba(255, 215, 0, 0.8),
              0 0 15px rgba(255, 140, 0, 0.6),
              0 0 25px rgba(255, 69, 0, 0.5),
              0 0 35px rgba(255, 0, 0, 0.4),
              0 0 45px rgba(139, 0, 0, 0.3);
            filter: brightness(1.1) contrast(1.2) saturate(1.3);
          }
          15% {
            text-shadow:
              0 0 3px rgba(255, 215, 0, 0.9),
              0 0 12px rgba(255, 140, 0, 0.7),
              0 0 22px rgba(255, 69, 0, 0.6),
              0 0 32px rgba(255, 0, 0, 0.5),
              0 0 42px rgba(139, 0, 0, 0.4);
            filter: brightness(1.05) contrast(1.15) saturate(1.25);
          }
          30% {
            text-shadow:
              0 0 7px rgba(255, 215, 0, 0.7),
              0 0 17px rgba(255, 140, 0, 0.5),
              0 0 27px rgba(255, 69, 0, 0.4),
              0 0 37px rgba(255, 0, 0, 0.3),
              0 0 47px rgba(139, 0, 0, 0.2);
            filter: brightness(1.15) contrast(1.3) saturate(1.4);
          }
          45% {
            text-shadow:
              0 0 4px rgba(255, 215, 0, 0.8),
              0 0 14px rgba(255, 140, 0, 0.6),
              0 0 24px rgba(255, 69, 0, 0.5),
              0 0 34px rgba(255, 0, 0, 0.4),
              0 0 44px rgba(139, 0, 0, 0.3);
            filter: brightness(1.08) contrast(1.2) saturate(1.3);
          }
          60% {
            text-shadow:
              0 0 6px rgba(255, 215, 0, 0.75),
              0 0 16px rgba(255, 140, 0, 0.55),
              0 0 26px rgba(255, 69, 0, 0.45),
              0 0 36px rgba(255, 0, 0, 0.35),
              0 0 46px rgba(139, 0, 0, 0.25);
            filter: brightness(1.12) contrast(1.25) saturate(1.35);
          }
          75% {
            text-shadow:
              0 0 5px rgba(255, 215, 0, 0.85),
              0 0 15px rgba(255, 140, 0, 0.65),
              0 0 25px rgba(255, 69, 0, 0.55),
              0 0 35px rgba(255, 0, 0, 0.45),
              0 0 45px rgba(139, 0, 0, 0.35);
            filter: brightness(1.06) contrast(1.18) saturate(1.28);
          }
          90% {
            text-shadow:
              0 0 4px rgba(255, 215, 0, 0.9),
              0 0 14px rgba(255, 140, 0, 0.7),
              0 0 24px rgba(255, 69, 0, 0.6),
              0 0 34px rgba(255, 0, 0, 0.5),
              0 0 44px rgba(139, 0, 0, 0.4);
            filter: brightness(1.02) contrast(1.12) saturate(1.22);
          }
          100% {
            text-shadow:
              0 0 5px rgba(255, 215, 0, 0.8),
              0 0 15px rgba(255, 140, 0, 0.6),
              0 0 25px rgba(255, 69, 0, 0.5),
              0 0 35px rgba(255, 0, 0, 0.4),
              0 0 45px rgba(139, 0, 0, 0.3);
            filter: brightness(1.1) contrast(1.2) saturate(1.3);
          }
        }

        @keyframes flame-breathing {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            letter-spacing: 0.05em;
          }
          25% {
            transform: translateY(-1px) scale(1.008) rotate(0.1deg);
            letter-spacing: 0.06em;
          }
          50% {
            transform: translateY(-2px) scale(1.004) rotate(0deg);
            letter-spacing: 0.04em;
          }
          75% {
            transform: translateY(-1px) scale(1.006) rotate(-0.1deg);
            letter-spacing: 0.05em;
          }
          100% {
            transform: translateY(0) scale(1) rotate(0deg);
            letter-spacing: 0.05em;
          }
        }

        @keyframes ember-glow {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-8px) scale(1.2);
          }
        }

        @keyframes heat-distortion {
          0%, 100% {
            filter: blur(0px) hue-rotate(0deg);
          }
          25% {
            filter: blur(0.2px) hue-rotate(2deg);
          }
          50% {
            filter: blur(0.1px) hue-rotate(0deg);
          }
          75% {
            filter: blur(0.3px) hue-rotate(-2deg);
          }
        }

        .fire-text-main {
          animation:
            realistic-fire-flicker 3s infinite ease-in-out,
            flame-breathing 4s infinite ease-in-out,
            heat-distortion 2s infinite ease-in-out;
          display: inline-block;
          background: linear-gradient(
            to top,
            #8B0000 0%,
            #FF0000 15%,
            #FF4500 30%,
            #FF8C00 45%,
            #FFD700 60%,
            #FFED4E 75%,
            #FFFF99 90%,
            #FFFFFF 100%
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
        }

        .fire-text-glow {
          animation:
            realistic-fire-flicker 3s infinite ease-in-out,
            flame-breathing 4s infinite ease-in-out,
            ember-glow 2.5s infinite ease-in-out;
          display: inline-block;
          background: linear-gradient(
            to top,
            #8B0000 0%,
            #FF0000 15%,
            #FF4500 30%,
            #FF8C00 45%,
            #FFD700 60%,
            #FFED4E 75%,
            #FFFF99 90%,
            #FFFFFF 100%
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
        }

        .fire-text-container {
          position: relative;
          display: inline-block;
        }

        .fire-text-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at center bottom,
            rgba(255, 215, 0, 0.3) 0%,
            rgba(255, 140, 0, 0.2) 30%,
            rgba(255, 69, 0, 0.1) 60%,
            transparent 80%
          );
          z-index: 1;
          animation: ember-glow 3s infinite ease-in-out;
          pointer-events: none;
        }
      `}</style>

      <div className="fire-text-container">
        <div className="flex">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              className="fire-text-main"
              style={{
                animationDelay: `${index * 0.1}s`,
                filter: `brightness(${flickerValues[index] || 1}) contrast(1.2) saturate(1.3)`,
              }}
              animate={{
                scale: [1, 1 + (flickerValues[index] || 0.5) * 0.02, 1],
                rotate: [0, (flickerValues[index] || 0.5) * 0.5 - 0.25, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2, // 3-5 Sekunden pro Zyklus
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Enhanced glow effect */}
        <div className="absolute inset-0 blur-xl opacity-50 pointer-events-none">
          <div className="flex">
            {text.split('').map((char, index) => (
              <motion.span
                key={`glow-${index}`}
                className="fire-text-glow"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  filter: `brightness(${flickerValues[index] || 1}) contrast(1.3) saturate(1.4) blur(2px)`,
                }}
                animate={{
                  scale: [1, 1 + (flickerValues[index] || 0.5) * 0.03, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5 + Math.random() * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Additional atmospheric glow */}
        <div className="absolute inset-0 blur-2xl opacity-30 pointer-events-none">
          <div className="flex">
            {text.split('').map((char, index) => (
              <motion.span
                key={`atmosphere-${index}`}
                className="fire-text-glow"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  filter: `brightness(${flickerValues[index] || 1}) contrast(1.4) saturate(1.5) blur(4px)`,
                }}
                animate={{
                  scale: [1, 1 + (flickerValues[index] || 0.5) * 0.05, 1],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};