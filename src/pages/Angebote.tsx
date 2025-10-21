import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Angebote() {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gradient-luxury">
            🔥 Wochenangebot
          </h1>
          <p className="text-xl text-muted-foreground">
            Sichern Sie sich jetzt exklusive Rabatte - Nur für kurze Zeit!
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="p-8 glass-card border-gold/30 animate-glow-pulse">
            <h2 className="text-2xl font-heading font-bold text-center mb-6">
              Angebot endet in:
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-4xl md:text-6xl font-numeric font-bold text-gradient-gold mb-2">
                    {value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase">
                    {unit === "days" && "Tage"}
                    {unit === "hours" && "Std"}
                    {unit === "minutes" && "Min"}
                    {unit === "seconds" && "Sek"}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 border-gold/50 hover-lift h-full flex flex-col">
              <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full inline-block self-start mb-4 font-bold">
                -30% Rabatt
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4 text-gradient-gold">
                Business Paket Special
              </h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-numeric font-bold text-gradient-luxury">
                  €2.799
                </span>
                <span className="text-2xl text-muted-foreground line-through">
                  €3.999
                </span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Bis zu 10 Seiten
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Premium Animationen
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  SEO Optimierung
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  12 Monate Support
                </li>
              </ul>
              <Link to="/kontakt">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-gold">
                  Jetzt zugreifen
                </Button>
              </Link>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 border-gold/50 hover-lift h-full flex flex-col">
              <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full inline-block self-start mb-4 font-bold">
                -25% Rabatt
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4 text-gradient-gold">
                Landing Page Pro
              </h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-numeric font-bold text-gradient-luxury">
                  €1.349
                </span>
                <span className="text-2xl text-muted-foreground line-through">
                  €1.799
                </span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Conversion-optimiert
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  A/B Testing Setup
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Analytics Integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  6 Monate Support
                </li>
              </ul>
              <Link to="/kontakt">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-gold">
                  Jetzt zugreifen
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <Card className="p-8 glass-card border-primary/20">
            <h3 className="text-2xl font-heading font-bold mb-4">
              💎 Exklusive Boni für Frühbucher
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✨ Kostenlose Logo-Integration</li>
              <li>✨ Priority Support für 3 Monate</li>
              <li>✨ Gratis Performance-Audit nach Launch</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
