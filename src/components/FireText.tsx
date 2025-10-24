import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FireTextProps {
  text: string;
  className?: string;
}

export const FireText = ({ text, className = "" }: FireTextProps) => {
  const [flickers, setFlickers] = useState<number[]>([]);

  useEffect(() => {
    // Generate random flicker values for each character at 60fps
    const interval = setInterval(() => {
      setFlickers(text.split('').map(() => Math.random()));
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes fire-flicker {
          0%, 100% {
            text-shadow: 
              0 0 4px #FFD700,
              0 0 8px #FFD700,
              0 0 12px #FF8C00,
              0 0 16px #FF4500,
              0 0 20px #FF4500,
              0 -5px 25px #FF4500,
              0 -10px 30px #FF0000;
          }
          25% {
            text-shadow: 
              0 0 8px #FFD700,
              0 0 12px #FF8C00,
              0 0 16px #FF8C00,
              0 0 20px #FF4500,
              0 0 24px #FF4500,
              0 -8px 28px #FF4500,
              0 -12px 35px #FF0000;
          }
          50% {
            text-shadow: 
              0 0 6px #FFD700,
              0 0 10px #FFD700,
              0 0 14px #FF8C00,
              0 0 18px #FF4500,
              0 0 22px #FF4500,
              0 -6px 27px #FF4500,
              0 -11px 32px #FF0000;
          }
          75% {
            text-shadow: 
              0 0 10px #FFD700,
              0 0 14px #FF8C00,
              0 0 18px #FF8C00,
              0 0 22px #FF4500,
              0 0 26px #FF4500,
              0 -9px 30px #FF4500,
              0 -13px 38px #FF0000;
          }
        }

        @keyframes flame-dance {
          0% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-2px) scale(1.02); }
          50% { transform: translateY(-1px) scale(0.98); }
          75% { transform: translateY(-3px) scale(1.01); }
          100% { transform: translateY(0) scale(1); }
        }

        .fire-char {
          animation: fire-flicker 0.15s infinite alternate, flame-dance 0.3s infinite ease-in-out;
          display: inline-block;
          background: linear-gradient(to top, #FF0000 0%, #FF4500 20%, #FF8C00 40%, #FFD700 60%, #FFED4E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          letter-spacing: 0.05em;
        }
      `}</style>
      
      <div className="flex">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="fire-char"
            style={{
              animationDelay: `${index * 0.05}s`,
              filter: `brightness(${1 + (flickers[index] || 0) * 0.3})`,
            }}
            animate={{
              scale: [1, 1 + (flickers[index] || 0) * 0.05, 1],
            }}
            transition={{
              duration: 0.016, // ~60fps
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
      
      {/* Fire glow effect */}
      <div className="absolute inset-0 blur-xl opacity-60 pointer-events-none">
        {text.split('').map((char, index) => (
          <motion.span
            key={`glow-${index}`}
            className="fire-char"
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};