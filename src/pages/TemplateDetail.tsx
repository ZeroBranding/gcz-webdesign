import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, ShoppingCart, Eye, Download, Star, Zap, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Template-Daten (aktualisiert mit neuen Level-Namen und Preisen)
const categoryData: Record<string, any> = {
  "e-commerce": {
    name: "E-Commerce",
    emoji: "🛒",
    templates: {
      "basic-ecommerce": {
        id: "basic-ecommerce",
        name: "Basic E-Commerce",
        originalPrice: 799,
        price: 49,
        discount: 93.87,
        level: "basic",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
        description: "Einfache, aber effektive One-Page-Lösung für kleine Online-Shops mit grundlegenden Funktionen. Perfekt für den Start in den E-Commerce.",
        features: [
          "Responsive One-Page Design",
          "Produktgalerie mit bis zu 20 Produkten",
          "Kontaktformular mit Lead-Capture",
          "Grundlegende SEO-Optimierung",
          "Schnelle Ladezeiten (< 2s)",
          "Mobile-optimiert für alle Geräte",
          "Social Media Integration",
          "Google Analytics Integration"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO Optimized"],
        category: "e-commerce"
      },
      "professional-ecommerce": {
        id: "professional-ecommerce",
        name: "Professional E-Commerce",
        originalPrice: 1499,
        price: 149,
        discount: 90.06,
        level: "professional",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&h=800&fit=crop",
        description: "Vollständige Business-Website mit erweiterten Shop-Funktionen. Ideal für wachsende Unternehmen.",
        features: [
          "Mehrseitige Website (5+ Seiten)",
          "Produktkatalog mit Kategorien",
          "Blog-Integration für Content Marketing",
          "Kontakt- & Anfrageformulare",
          "Erweiterte SEO-Optimierung",
          "Social Media Integration",
          "Google Analytics & Search Console",
          "Newsletter-Anmeldung",
          "Warenkorb-Funktionen",
          "Zahlungsintegration (Stripe, PayPal)"
        ],
        tech: ["React", "Node.js", "SEO", "Analytics", "CMS", "E-Commerce"],
        category: "e-commerce"
      },
      "premium-ecommerce": {
        id: "premium-ecommerce",
        name: "Premium E-Commerce",
        originalPrice: 2299,
        price: 299,
        discount: 87.00,
        level: "premium",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
        description: "Premium-Lösung mit fortschrittlichen Funktionen und exklusivem Design für Marken.",
        features: [
          "Premium Custom Design",
          "Erweiterte Shop-Funktionen",
          "CRM-Integration (HubSpot, Salesforce)",
          "Multi-Language Support (5+ Sprachen)",
          "Advanced SEO & Performance",
          "E-Mail Marketing Integration",
          "A/B Testing Tools",
          "Priority Support (24/7)",
          "Custom Animationen",
          "Brand Guidelines Integration",
          "Inventory Management",
          "Multi-Channel Sales"
        ],
        tech: ["Next.js", "TypeScript", "Advanced SEO", "CRM", "Multi-Language", "E-Commerce Platform"],
        category: "e-commerce"
      },
      "enterprise-ecommerce": {
        id: "enterprise-ecommerce",
        name: "Enterprise E-Commerce",
        originalPrice: 4999,
        price: 1299,
        discount: 74.01,
        level: "enterprise",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop",
        description: "Enterprise-Lösung für große Unternehmen mit komplexen Anforderungen und Skalierbarkeit.",
        features: [
          "Enterprise-Grade Architektur",
          "Multi-Store Management",
          "API Integration (ERP, CRM)",
          "Advanced Analytics & Reporting",
          "Custom Backend Development",
          "Load Balancing & CDN",
          "Security Hardening",
          "24/7 Monitoring & Support",
          "White-Label Lösung",
          "Dedicated Account Manager",
          "Custom Development",
          "SLA Garantie (99.9% Uptime)",
          "Multi-Brand Support",
          "Global Content Delivery"
        ],
        tech: ["Enterprise Stack", "Microservices", "Cloud Infrastructure", "Security", "DevOps", "Global CDN"],
        category: "e-commerce"
      }
    }
  }
};

export default function TemplateDetail() {
  const { category, template } = useParams<{ category: string; template: string }>();
  const { addItem } = useCart();

  const data = category ? categoryData[category] : null;
  const templateData = data?.templates?.[template || ''];

  if (!data || !templateData) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Template nicht gefunden</h1>
          <Link to={`/templates/${category}`}>
            <Button>Zurück zur Kategorie</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'basic': return <Zap className="w-6 h-6" />;
      case 'professional': return <Shield className="w-6 h-6" />;
      case 'premium': return <Star className="w-6 h-6" />;
      case 'enterprise': return <Shield className="w-6 h-6" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-green-100 text-green-800 border-green-200';
      case 'professional': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'enterprise': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: templateData.id,
      name: templateData.name,
      price: templateData.price,
      type: "package",
      description: templateData.description
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to={`/templates/${category}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zu {data.name}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Template Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-primary/20">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={templateData.image}
                  alt={templateData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

                {/* Rabatt Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 font-bold rounded-full border border-red-200 text-lg">
                    🔥 -{templateData.discount}% RABATT
                  </span>
                </div>

                {/* Preview Button */}
                <div className="absolute top-6 right-6">
                  <Button variant="secondary" size="sm" className="backdrop-blur-sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Live Preview
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getLevelColor(templateData.level)} mb-4`}>
                {getLevelIcon(templateData.level)}
                {templateData.level.charAt(0).toUpperCase() + templateData.level.slice(1)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              {templateData.name}
            </h1>

            {/* Pricing */}
            <div className="mb-6">
              <div className="mb-2">
                <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-bold rounded-full border border-red-200">
                  🔥 Begrenztes Angebot
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-numeric font-bold text-red-600">
                  €{templateData.price}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  statt €{templateData.originalPrice}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 text-lg">
              {templateData.description}
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">Features</h2>
              <div className="grid grid-cols-1 gap-3">
                {templateData.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">Technologien</h2>
              <div className="flex flex-wrap gap-2">
                {templateData.tech.map((tech: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 shadow-gold"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                In den Warenkorb (€{templateData.price})
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Demo Download
              </Button>
            </div>

            <Card className="mt-8 p-6 glass-card border-gold/20">
              <h3 className="font-heading font-bold mb-2">✨ Inklusive Leistungen</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Responsive Design für alle Geräte</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>SEO-Optimierung & Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>1 Jahr kostenloser Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>DSGVO-konform & Sicher</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Schnelle Ladezeiten & Optimierung</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
