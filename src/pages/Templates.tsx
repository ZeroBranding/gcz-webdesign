import React from "react";
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
    count: 4,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
  },
  {
    id: "gastronomie",
    name: "Gastronomie",
    emoji: "🍽️",
    description: "Appetitliche Websites für Restaurants und Cafés",
    count: 4,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  },
  {
    id: "immobilien",
    name: "Immobilien",
    emoji: "🏢",
    description: "Elegante Präsentationen für Immobilienmakler",
    count: 4,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    emoji: "💼",
    description: "Beeindruckende Portfolios für Kreative",
    count: 4,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop",
  },
  {
    id: "corporate",
    name: "Corporate",
    emoji: "🏛️",
    description: "Professionelle Unternehmenswebsites",
    count: 4,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
  {
    id: "startup",
    name: "Startup",
    emoji: "🚀",
    description: "Innovative Websites für Startups und Tech-Unternehmen",
    count: 4,
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop",
  },
];

export default function Templates() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-gradient-gold">
            🎨 Templates
          </h1>
          <p className="text-xl text-muted-foreground">
            Professionelle Website-Templates für jede Branche
          </p>
        </motion.div>

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
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
                        {category.count} Templates
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-3xl mb-2">{category.emoji}</div>
                    <h3 className="text-xl font-heading font-bold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.count} Service-Stufen
                      </span>
                      <Button variant="outline" size="sm">
                        Templates ansehen →
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-heading font-bold mb-4">Alle Templates beinhalten</h2>
          <p className="text-muted-foreground mb-8">
            Jede Service-Stufe kommt mit professionellem Design, SEO-Optimierung und mobile Responsiveness
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Responsive Design</h3>
              <p className="text-sm text-muted-foreground">
                Perfekt auf allen Geräten - Desktop, Tablet und Mobile
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Performance Optimiert</h3>
              <p className="text-sm text-muted-foreground">
                Schnelle Ladezeiten und optimierte Bilder
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Sicher & DSGVO</h3>
              <p className="text-sm text-muted-foreground">
                Datenschutzkonform und sicher für alle Anforderungen
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
