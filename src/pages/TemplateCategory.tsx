import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search, Zap, Shield, Star, Clock, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import templatesData from "@/data/templates.json";

export default function TemplateCategory() {
  const { category } = useParams<{ category: string }>();
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const data = category ? templatesData[category as keyof typeof templatesData] : null;

  // Filter und Sortierung - useMemo vor early return
  const filteredTemplates = useMemo(() => {
    if (!data) return [];

    let templates = data.templates;

    // Suchfilter
    if (searchTerm) {
      templates = templates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Level-Filter
    if (levelFilter !== "all") {
      templates = templates.filter(template => template.level === levelFilter);
    }

    // Sortierung
    templates.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "discount":
          return b.discount - a.discount;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return templates;
  }, [data, searchTerm, levelFilter, sortBy]);

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

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'basic': return <Zap className="w-4 h-4" />;
      case 'professional': return <Shield className="w-4 h-4" />;
      case 'premium': return <Star className="w-4 h-4" />;
      case 'enterprise': return <Clock className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
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

  const handleAddToCart = (template: any) => {
    addItem({
      id: template.id,
      name: template.name,
      price: template.price,
      type: "package",
      description: template.description,
      image: template.image,
      category: template.category
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
            {data.icon} {data.name} Templates
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Professionelle {data.name.toLowerCase()} Websites - von Basic bis Enterprise
          </p>

          {/* Filter und Suche */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Templates durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Level filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Level</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sortieren nach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Preis (niedrig)</SelectItem>
                <SelectItem value="price-high">Preis (hoch)</SelectItem>
                <SelectItem value="discount">Rabatt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ergebnisse Anzahl */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredTemplates.length} Template{filteredTemplates.length !== 1 ? 's' : ''} gefunden
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/templates/${category}/${template.id}`}>
                <Card className="overflow-hidden hover-lift cursor-pointer border-primary/20 h-full group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                    {/* Rabatt Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-200">
                        🔥 -{template.discount}% RABATT
                      </span>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(template.level as any)}`}>
                        {getLevelIcon(template.level as any)}
                        {template.level.charAt(0).toUpperCase() + template.level.slice(1)}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="secondary" size="sm" className="backdrop-blur-sm">
                        Details ansehen →
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-bold mb-2 line-clamp-2">
                      {template.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-numeric font-bold text-red-600">
                          €{template.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          €{template.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Begrenztes Angebot
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.tech.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                            {tech}
                          </span>
                        ))}
                        {template.tech.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{template.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(template);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        In den Warenkorb
                      </Button>
                      <Button size="sm" className="flex-1">
                        Live Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Keine Templates gefunden</h3>
              <p>Versuchen Sie es mit anderen Suchbegriffen oder Filtern.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setLevelFilter("all");
              }}
            >
              Filter zurücksetzen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
