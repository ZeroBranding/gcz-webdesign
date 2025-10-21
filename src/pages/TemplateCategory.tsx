import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const categoryData: Record<string, any> = {
  "e-commerce": {
    name: "E-Commerce",
    emoji: "🛒",
    templates: [
      {
        id: "fashion-store",
        name: "Fashion Store Premium",
        price: 2499,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      },
      {
        id: "tech-shop",
        name: "Tech Shop Pro",
        price: 2799,
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=600&fit=crop",
      },
    ],
  },
  "gastronomie": {
    name: "Gastronomie",
    emoji: "🍽️",
    templates: [
      {
        id: "fine-dining",
        name: "Fine Dining Elegance",
        price: 1999,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      },
      {
        id: "cafe-modern",
        name: "Modern Café",
        price: 1499,
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
      },
    ],
  },
  "immobilien": {
    name: "Immobilien",
    emoji: "🏢",
    templates: [
      {
        id: "luxury-real-estate",
        name: "Luxury Real Estate",
        price: 2299,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      },
    ],
  },
  "portfolio": {
    name: "Portfolio",
    emoji: "💼",
    templates: [
      {
        id: "creative-portfolio",
        name: "Creative Portfolio",
        price: 1799,
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&h=600&fit=crop",
      },
    ],
  },
};

export default function TemplateCategory() {
  const { category } = useParams();
  const data = category ? categoryData[category] : null;

  if (!data) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Kategorie nicht gefunden</h1>
          <Link to="/templates">
            <Button>Zurück zur Übersicht</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/templates" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-gradient-gold">
            {data.emoji} {data.name} Templates
          </h1>
          <p className="text-xl text-muted-foreground">
            Premium Templates speziell für {data.name}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.templates.map((template: any, index: number) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/templates/${category}/${template.id}`}>
                <Card className="overflow-hidden hover-lift cursor-pointer border-primary/20">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2">{template.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-numeric font-bold text-gradient-gold">
                        €{template.price}
                      </span>
                      <Button variant="outline" size="sm">
                        Details ansehen →
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
