import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const packages = [
  {
    name: "Onepager",
    price: 49,
    description: "Perfekt für Einsteiger",
    features: [
      "1 Seite, klares Layout",
      "Responsive Design",
      "Kontaktformular",
      "Basis-SEO",
      "Performance A",
    ],
  },
  {
    name: "Landing",
    price: 99,
    description: "Für Marketing-Kampagnen",
    features: [
      "3-5 Sektionen",
      "Premium-Animationen light",
      "Lead-Formulare",
      "Tracking-Setup",
      "A/B-Testing Start",
    ],
  },
  {
    name: "Business",
    price: 249,
    description: "Für wachsende Unternehmen",
    features: [
      "Bis 10 Seiten",
      "Blog-Basis",
      "Erweiterte SEO-Onpage",
      "3 Formular-Flows",
      "Bild-Optimierung",
    ],
    recommended: true,
  },
  {
    name: "Pro / Agentur",
    price: 499,
    description: "Komplette Pro-Lösung",
    features: [
      "Bis 20 Seiten",
      "CMS-Integration light",
      "Performance-kritisch",
      "Prior-Support 3 Monate",
      "Skalierbare Komponenten",
    ],
  },
  {
    name: "Enterprise",
    price: 999,
    description: "Individuelle Enterprise-Lösung",
    features: [
      "Individuelle IA",
      "Komplexe Komponenten",
      "Strukturierte Inhalte",
      "Prior-Support 6 Monate",
      "Full-Service",
    ],
  },
];

const addOns = [
  {
    name: "SEO Premium",
    price: 249,
    period: "einmalig",
    description: "Erweiterte Suchmaschinenoptimierung",
  },
  {
    name: "Wartung & Updates",
    price: 29,
    period: "monatlich",
    description: "Laufende Pflege und Aktualisierungen",
  },
  {
    name: "Content Creation",
    price: 99,
    period: "monatlich",
    description: "Professionelle Texte und Bilder",
  },
  {
    name: "Logo & Brand Design",
    price: 199,
    period: "einmalig",
    description: "Individuelles Corporate Design",
  },
  {
    name: "Performance Boost",
    price: 149,
    period: "einmalig",
    description: "Optimierung für maximale Geschwindigkeit",
  },
];

export default function Preise() {
  const { addItem } = useCart();

  const handleAddPackage = (pkg: typeof packages[0]) => {
    addItem({
      id: `package-${pkg.name}`,
      name: pkg.name,
      price: pkg.price,
      type: "package",
      description: pkg.description,
    });
  };

  const handleAddAddon = (addon: typeof addOns[0]) => {
    addItem({
      id: `addon-${addon.name}`,
      name: addon.name,
      price: addon.price,
      type: "addon",
      description: `${addon.description} - ${addon.period}`,
    });
  };

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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
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
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddPackage(pkg)}
                    className={`flex-1 ${
                      pkg.recommended
                        ? "bg-primary hover:bg-primary/90 shadow-gold"
                        : ""
                    }`}
                    variant={pkg.recommended ? "default" : "outline"}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    In den Warenkorb
                  </Button>
                </div>
                <Link to="/kontakt" className="mt-2 block">
                  <Button variant="ghost" className="w-full">
                    Direkt anfragen
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="p-6 border-primary/20 hover-lift">
                <h3 className="text-xl font-heading font-bold mb-2">{addon.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-numeric font-bold text-gradient-gold">
                    €{addon.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/ {addon.period}</span>
                </div>
                <Button
                  onClick={() => handleAddAddon(addon)}
                  variant="outline"
                  className="w-full"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Hinzufügen
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
