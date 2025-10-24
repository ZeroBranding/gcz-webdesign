import React from "react";
import { FireText } from "./FireText";

interface HologramShowcaseProps {
  className?: string;
}

export const HologramShowcase: React.FC<HologramShowcaseProps> = ({ className = "" }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Holographic Variants Demo */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-heading mb-4 text-gradient-gold-luxury">
            Holographische Effekte
          </h2>
          <p className="text-muted-foreground">
            Moderne Webdesign-Animationen für außergewöhnliche User Experience
          </p>
        </div>

        {/* Classic Fire Effect */}
        <div className="text-center p-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-xl border border-primary/20">
          <FireText
            text="Classic Fire"
            className="text-3xl font-heading mb-2"
            variant="classic"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-sm text-muted-foreground">Realistisches Lagerfeuer mit 60fps Animationen</p>
        </div>

        {/* Quantum Hologram Effect */}
        <div className="text-center p-6 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-yellow-500/10 rounded-xl border border-cyan-500/30">
          <FireText
            text="Quantum Matrix"
            className="text-3xl font-heading mb-2"
            variant="quantum"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-sm text-muted-foreground">Quantum Partikel mit multidimensionalen Effekten</p>
        </div>

        {/* Matrix Code Effect */}
        <div className="text-center p-6 bg-gradient-to-br from-green-500/10 via-black to-green-500/10 rounded-xl border border-green-500/30">
          <FireText
            text="Matrix Code"
            className="text-3xl font-heading mb-2"
            variant="matrix"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-sm text-muted-foreground">Falling Matrix Code mit 60fps Animation</p>
        </div>

        {/* Plasma Flow Effect */}
        <div className="text-center p-6 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-xl border border-pink-500/30">
          <FireText
            text="Plasma Flow"
            className="text-3xl font-heading mb-2"
            variant="plasma"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-sm text-muted-foreground">Fließende Plasma-Energie mit Wellenbewegung</p>
        </div>

        {/* Neural Network Effect */}
        <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-orange-500/10 rounded-xl border border-orange-500/30">
          <FireText
            text="Neural Network"
            className="text-3xl font-heading mb-2"
            variant="neural"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-sm text-muted-foreground">Neuronale Verbindungen mit pulsierender Energie</p>
        </div>
      </div>

      {/* Interactive Background Effects */}
      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="absolute inset-0 bg-hologram-grid opacity-10" />
        <div className="absolute inset-0 bg-cyber-circuit opacity-10" />

        <div className="relative z-10 p-8 text-center">
          <FireText
            text="Interactive Hologram Zone"
            className="text-4xl font-heading mb-4"
            variant="hologram"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-muted-foreground mb-6">
            Bewegen Sie Ihre Maus über diesen Bereich für interaktive Effekte
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:glow-hologram-intense">
              <FireText
                text="Hover"
                className="text-lg font-heading"
                variant="cyber"
                glow={false}
                animated={false}
              />
            </div>

            <div className="p-4 bg-card/50 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-all hover:glow-cyber-pulse">
              <FireText
                text="Effect"
                className="text-lg font-heading"
                variant="neon"
                glow={false}
                animated={false}
              />
            </div>

            <div className="p-4 bg-card/50 rounded-lg border border-accent/20 hover:border-accent/40 transition-all hover:shadow-glow">
              <FireText
                text="Demo"
                className="text-lg font-heading"
                variant="hologram"
                glow={false}
                animated={false}
              />
            </div>

            <div className="p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:animate-pulse-glow">
              <FireText
                text="Live"
                className="text-lg font-heading"
                variant="classic"
                glow={false}
                animated={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Webdesign Style Guide */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-card to-card/50 rounded-xl border border-border/50">
          <h3 className="text-lg font-heading mb-4 text-gradient-gold">Design System</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Primary Color</span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-glow" />
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Typography Scale</span>
              <span className="text-sm font-numeric">16px - 72px</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Spacing System</span>
              <span className="text-sm font-numeric">4px - 80px</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-card to-card/50 rounded-xl border border-border/50">
          <h3 className="text-lg font-heading mb-4 text-gradient-luxury">Animation Library</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Fire Effects</span>
              <FireText text="60fps" className="text-sm" variant="classic" animated={false} />
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">New Hologram Effects</span>
              <span className="text-xs space-x-1">
                <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse animate-delay-500"></span>
                <span className="inline-block w-2 h-2 bg-pink-500 rounded-full animate-pulse animate-delay-1000"></span>
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Quantum Physics</span>
              <FireText text="2.5D" className="text-sm" variant="quantum" animated={false} />
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Matrix Code Flow</span>
              <FireText text="60fps" className="text-sm" variant="matrix" animated={false} />
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Plasma Dynamics</span>
              <FireText text="Wave" className="text-sm" variant="plasma" animated={false} />
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Neural Pulses</span>
              <FireText text="AI" className="text-sm" variant="neural" animated={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
