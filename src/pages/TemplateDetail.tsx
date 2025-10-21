import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

export default function TemplateDetail() {
  const { category, template } = useParams();

  const features = [
    "Responsive Design für alle Geräte",
    "SEO-optimiert aus der Box",
    "Schnelle Ladezeiten",
    "Anpassbare Farbschemata",
    "Integration mit gängigen Tools",
    "1 Jahr kostenloser Support",
    "Regelmäßige Updates",
    "DSGVO-konform",
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to={`/templates/${category}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Kategorie
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-primary/20">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop"
                alt="Template Preview"
                className="w-full h-auto"
              />
            </Card>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              {template?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </h1>
            
            <div className="text-3xl font-numeric font-bold text-gradient-luxury mb-8">
              €2.499
              <span className="text-base text-muted-foreground font-body ml-2">einmalig</span>
            </div>

            <p className="text-muted-foreground mb-8 text-lg">
              Ein professionelles, vollständig anpassbares Template mit modernster Technologie
              und beeindruckenden Animationen. Perfekt für anspruchsvolle Projekte.
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/kontakt" className="flex-1">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-gold">
                  Jetzt kaufen
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="flex-1">
                Live Demo
              </Button>
            </div>

            <Card className="mt-8 p-6 glass-card border-gold/20">
              <h3 className="font-heading font-bold mb-2">✨ Inklusive Setup & Support</h3>
              <p className="text-sm text-muted-foreground">
                Installation, Konfiguration und 1 Jahr Premium-Support inklusive
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
