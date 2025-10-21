import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    name: "Onepager",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    description: "Perfekt für Einsteiger",
    features: [
      "1 Seite / Landing Page",
      "Responsive Design",
      "Kontaktformular",
      "SEO Basis-Optimierung",
      "3 Monate Support",
      "SSL-Zertifikat",
    ],
  },
  {
    name: "Landing Page",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    description: "Für Marketing-Kampagnen",
    features: [
      "3-5 Sektionen",
      "Premium Animationen",
      "Lead-Formulare",
      "Analytics Integration",
      "6 Monate Support",
      "Performance Optimierung",
      "A/B Testing Setup",
    ],
  },
  {
    name: "Business",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    description: "Für wachsende Unternehmen",
    features: [
      "Bis zu 10 Seiten",
      "CMS Integration",
      "E-Commerce Basis",
      "Blog-System",
      "12 Monate Support",
      "SEO Pro-Optimierung",
      "Backup & Wartung",
      "Custom Features",
    ],
    recommended: true,
  },
  {
    name: "Pro / Agentur",
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    description: "Komplette Enterprise-Lösung",
    features: [
      "Unbegrenzte Seiten",
      "Full-Stack Entwicklung",
      "API Integrationen",
      "Dedizierter Support",
      "24 Monate Premium Support",
      "Performance Garantie",
      "Skalierbare Architektur",
      "White Label möglich",
      "Prioritäts-Updates",
    ],
  },
];

const addOns = [
  {
    name: "SEO Premium Paket",
    price: 499,
    period: "einmalig",
    description: "Erweiterte Suchmaschinenoptimierung",
  },
  {
    name: "Wartung & Updates",
    price: 99,
    period: "monatlich",
    description: "Laufende Pflege und Aktualisierungen",
  },
  {
    name: "Content Creation",
    price: 299,
    period: "monatlich",
    description: "Professionelle Texte und Bilder",
  },
];

export default function Preise() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gradient-gold">
            Transparente Preise
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wählen Sie das perfekte Paket für Ihre Anforderungen. Alle Preise verstehen sich inklusive MwSt.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={pkg.recommended ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card
                className={`p-8 h-full flex flex-col relative ${
                  pkg.recommended
                    ? "border-gold animate-glow-pulse shadow-glow"
                    : "border-primary/20 hover-lift"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-red-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                    Empfohlen
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-numeric font-bold text-gradient-gold">
                      €{pkg.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg text-muted-foreground line-through">
                      €{pkg.originalPrice}
                    </span>
                    <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm font-bold">
                      -{pkg.discount}%
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/kontakt">
                  <Button
                    className={`w-full ${
                      pkg.recommended
                        ? "bg-primary hover:bg-primary/90 shadow-gold"
                        : ""
                    }`}
                    variant={pkg.recommended ? "default" : "outline"}
                  >
                    Jetzt starten
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add-Ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-heading font-bold mb-8 text-center text-gradient-gold">
            Add-Ons
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <Card key={index} className="p-6 border-primary/20 hover-lift">
                <h3 className="text-xl font-heading font-bold mb-2">{addon.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-numeric font-bold text-gradient-gold">
                    €{addon.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/ {addon.period}</span>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
