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

        {/* Hologram Effect */}
        <div className="text-center p-6 bg-gradient-to-br from-hologram-primary/10 via-background to-hologram-secondary/10 rounded-xl border border-hologram-primary/30">
          <FireText
            text="Hologram Matrix"
            className="text-3xl font-heading mb-2"
            variant="hologram"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-sm text-muted-foreground">Cyber-punk holographischer Text-Effekt</p>
        </div>

        {/* Cyber Effect */}
        <div className="text-center p-6 bg-gradient-to-br from-cyber/10 via-background to-neon/10 rounded-xl border border-cyber/30">
          <FireText
            text="Cyber Flow"
            className="text-3xl font-heading mb-2"
            variant="cyber"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-sm text-muted-foreground">Dynamischer Cyber-Flow mit Neon-Glow</p>
        </div>

        {/* Neon Effect */}
        <div className="text-center p-6 bg-gradient-to-br from-neon/10 via-background to-accent/10 rounded-xl border border-neon/30">
          <FireText
            text="Neon Pulse"
            className="text-3xl font-heading mb-2"
            variant="neon"
            intensity="high"
            glow={true}
            animated={true}
          />
          <p className="text-sm text-muted-foreground">Pulsierender Neon-Effekt mit intensivem Glow</p>
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
              <span className="text-sm">Hologram Variants</span>
              <span className="text-xs space-x-1">
                <span className="inline-block w-2 h-2 bg-hologram-primary rounded-full animate-pulse"></span>
                <span className="inline-block w-2 h-2 bg-hologram-secondary rounded-full animate-pulse animate-delay-500"></span>
                <span className="inline-block w-2 h-2 bg-hologram-accent rounded-full animate-pulse animate-delay-1000"></span>
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-sm">Interactive States</span>
              <span className="text-sm font-numeric">12+ States</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
