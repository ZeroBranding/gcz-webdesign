import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroBackground } from "@/components/HeroBackground";
import { Zap, Puzzle, Lock, Palette, Gauge, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "GPU-Performance",
    description: "Butterweiche 200 FPS Animationen für ein unvergleichliches Nutzererlebnis",
  },
  {
    icon: Puzzle,
    title: "Flexible Architektur",
    description: "Modular aufgebaut und skalierbar für jede Unternehmensgröße",
  },
  {
    icon: Lock,
    title: "DSGVO-Sicherheit",
    description: "Konform mit allen EU-Richtlinien und höchsten Sicherheitsstandards",
  },
  {
    icon: Palette,
    title: "Premium Branding",
    description: "Design, das Identität schafft und Ihre Marke unvergesslich macht",
  },
  {
    icon: Gauge,
    title: "PageSpeed Optimiert",
    description: "Blitzschnelle Ladezeiten und perfekte Core Web Vitals",
  },
  {
    icon: Shield,
    title: "SSL & Sicherheit",
    description: "Automatische HTTPS-Verschlüsselung und DDoS-Schutz inklusive",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroBackground />
        
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-luxury">
              Websites, die verkaufen.<br />Designs, die bewegen.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-body">
              Modernes Webdesign mit GPU-Power, Geschwindigkeit und Stil.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/kontakt">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg px-8 py-6 shadow-gold">
                  Projekt starten
                </Button>
              </Link>
              <Link to="/preise">
                <Button size="lg" variant="outline" className="font-heading text-lg px-8 py-6 border-primary hover:bg-primary/10">
                  Preise ansehen
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="secondary" className="font-heading text-lg px-8 py-6 shadow-elegant">
                  Templates ansehen
                </Button>
              </Link>
            </div>

            {/* Countdown Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12 inline-block"
            >
              <Link to="/angebote">
                <Card className="p-6 glass-card hover-lift cursor-pointer border-gold/20 animate-glow-pulse">
                  <div className="text-sm text-muted-foreground mb-2">🔥 Limitiertes Angebot</div>
                  <div className="text-2xl font-numeric font-bold text-gradient-gold">
                    Bis zu 30% Rabatt
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Diese Woche nur!</div>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              Warum Webdesign Factory?
            </h2>
            <p className="text-xl text-muted-foreground">
              Technologie und Design im perfekten Einklang
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-lift glass-card border-primary/20">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground font-body">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="p-12 glass-card border-gold/30 shadow-glow">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gradient-luxury">
                Bereit für Ihre neue Website?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Lassen Sie uns gemeinsam etwas Außergewöhnliches erschaffen
              </p>
              <Link to="/kontakt">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-xl px-12 py-6 shadow-gold">
                  Jetzt kostenlos beraten lassen
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
