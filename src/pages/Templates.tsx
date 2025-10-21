import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const templateCategories = [
  {
    id: "e-commerce",
    name: "E-Commerce",
    emoji: "🛒",
    description: "Professionelle Online-Shops mit Zahlungsintegration",
    count: 12,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
  },
  {
    id: "gastronomie",
    name: "Gastronomie",
    emoji: "🍽️",
    description: "Appetitliche Websites für Restaurants und Cafés",
    count: 8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  },
  {
    id: "immobilien",
    name: "Immobilien",
    emoji: "🏢",
    description: "Elegante Präsentationen für Immobilienmakler",
    count: 10,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    emoji: "💼",
    description: "Beeindruckende Portfolios für Kreative",
    count: 15,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop",
  },
  {
    id: "corporate",
    name: "Corporate",
    emoji: "🏛️",
    description: "Professionelle Unternehmenswebsites",
    count: 9,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
  {
    id: "startup",
    name: "Startup",
    emoji: "🚀",
    description: "Innovative Designs für junge Unternehmen",
    count: 11,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
  },
];

export default function Templates() {
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
            Template Übersicht
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Entdecken Sie unsere handverlesene Auswahl an professionellen Website-Templates
            für jede Branche
          </p>
        </motion.div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templateCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/templates/${category.id}`}>
                <Card className="overflow-hidden hover-lift cursor-pointer border-primary/20 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute top-4 right-4 text-4xl animate-float">
                      {category.emoji}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold mb-2 text-gradient-gold">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 font-body">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.count} Templates
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Entdecken →
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <Card className="p-12 glass-card border-gold/30 max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-4 text-gradient-luxury">
              Ihr Template nicht dabei?
            </h2>
            <p className="text-muted-foreground mb-6">
              Wir erstellen auch individuelle Designs genau nach Ihren Vorstellungen
            </p>
            <Link to="/kontakt">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-gold">
                Individuelles Angebot anfordern
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
