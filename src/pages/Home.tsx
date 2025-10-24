import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroBackground } from "@/components/HeroBackground";
import { FireText } from "@/components/FireText";
import { Zap, Puzzle, Lock, Palette, Gauge, Shield, Users, FileText, Clock, Award } from "lucide-react";
import logo from "@/assets/logo.png";

const stats = [
  {
    number: "100+",
    label: "Templates",
    description: "Professionelle Designs",
    icon: FileText,
    color: "text-gradient-gold"
  },
  {
    number: "500+",
    label: "Kunden",
    description: "Zufriedene Unternehmen",
    icon: Users,
    color: "text-red-500"
  },
  {
    number: "0.8s",
    label: "Ø Ladezeit",
    description: "Blitzschnelle Performance",
    icon: Gauge,
    color: "text-cyan-500"
  },
  {
    number: "24/7",
    label: "Support",
    description: "Rund um die Uhr",
    icon: Clock,
    color: "text-green-500"
  }
];

const showcaseTemplates = [
  {
    id: "ecommerce",
    name: "E-Commerce Shop",
    emoji: "🛒",
    category: "E-Commerce",
    price: "€49",
    originalPrice: "€799",
    discount: "94%",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    features: ["Produktkatalog", "Warenkorb", "Zahlung", "Responsive"]
  },
  {
    id: "gastronomie",
    name: "Restaurant Website",
    emoji: "🍽️",
    category: "Gastronomie",
    price: "€49",
    originalPrice: "€799",
    discount: "94%",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    features: ["Speisekarte", "Reservierung", "Galerie", "Kontakt"]
  },
  {
    id: "corporate",
    name: "Corporate Website",
    emoji: "🏛️",
    category: "Unternehmen",
    price: "€99",
    originalPrice: "€1499",
    discount: "93%",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    features: ["Über uns", "Services", "Team", "Karriere"]
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    emoji: "💼",
    category: "Portfolio",
    price: "€49",
    originalPrice: "€799",
    discount: "94%",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
    features: ["Projektgalerie", "About", "Kontakt", "Blog"]
  },
  {
    id: "startup",
    name: "Startup Landing",
    emoji: "🚀",
    category: "Startup",
    price: "€99",
    originalPrice: "€1499",
    discount: "93%",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
    features: ["Product Launch", "Team", "Investment", "Blog"]
  },
  {
    id: "immobilien",
    name: "Immobilien Portal",
    emoji: "🏠",
    category: "Immobilien",
    price: "€49",
    originalPrice: "€799",
    discount: "94%",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    features: ["Objektgalerie", "Suchfunktion", "Kontakt", "Team"]
  }
];

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
      {/* Logo und Webdesign Fabrik oben links */}
      <div className="fixed top-24 left-8 z-40 flex flex-col items-start gap-4">
        <motion.img
          src={logo}
          alt="German Code Zero"
          className="h-24 w-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, -3, 3, 0] }}
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FireText 
            text="Webdesign Fabrik" 
            className="text-3xl md:text-4xl font-heading"
          />
        </motion.div>
      </div>

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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              Zahlen, die überzeugen
            </h2>
            <p className="text-xl text-muted-foreground">
              Unsere Erfolge sprechen für sich
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <Card className="p-8 h-full hover-lift glass-card border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center h-full">
                    <stat.icon className={`w-12 h-12 mb-4 ${stat.color}`} />
                    <div className={`text-5xl md:text-6xl font-numeric font-bold mb-2 ${stat.color}`}>
                      {stat.number}
                    </div>
                    <div className="text-xl font-heading font-bold mb-2 text-foreground">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action after Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/templates">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg px-8 py-6 shadow-gold">
                Templates entdecken →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Portfolio/Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              Template Showcase
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Professionelle Designs für jede Branche - sofort einsatzbereit
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {showcaseTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/templates/${template.id}`}>
                  <Card className="overflow-hidden hover-lift cursor-pointer border-primary/20 h-full group-hover:border-primary/40 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                      {/* Rabatt Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-bold rounded-full border border-red-200">
                          🔥 -{template.discount} RABATT
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
                          {template.category}
                        </span>
                      </div>

                      {/* Price Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-numeric font-bold text-red-600">
                              {template.price}
                            </span>
                            <span className="text-sm text-muted-foreground font-medium">
                              statt {template.originalPrice}
                            </span>
                          </div>
                          <span className="text-lg">{template.emoji}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-2">{template.name}</h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {template.features.length > 3 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                            +{template.features.length - 3} mehr
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Details ansehen →
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {template.features.length} Features
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Call to Action after Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link to="/templates">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg px-8 py-6 shadow-gold">
                Alle Templates ansehen →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Warum Templates Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              Warum Templates?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Professionelle Websites ohne Kompromisse - zu einem Bruchteil der Kosten
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Vorteile Templates */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-heading font-bold mb-6 text-gradient-gold">
                Templates vs. Individualentwicklung
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold mb-1">Sofort einsatzbereit</h4>
                    <p className="text-muted-foreground">
                      Ihre Website ist in Minuten online, nicht in Monaten. Keine langen Entwicklungszeiten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold mb-1">94% Kosteneinsparung</h4>
                    <p className="text-muted-foreground">
                      Professionelle Qualität für €49 statt €799. Gleiche Features, minimaler Preis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold mb-1">Performance garantiert</h4>
                    <p className="text-muted-foreground">
                      Optimiert für Speed, SEO und Mobile. Bessere Performance als die meisten Custom-Websites.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold mb-1">Einfache Anpassung</h4>
                    <p className="text-muted-foreground">
                      Farben, Texte, Bilder - alles anpassbar. Ohne Programmierkenntnisse.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Kostenvergleich */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-heading font-bold mb-6 text-gradient-gold">
                  Kostenvergleich
                </h3>

                <div className="space-y-4">
                  {/* Individualentwicklung */}
                  <div className="text-left p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-bold">Individualentwicklung</span>
                      <span className="text-2xl font-numeric font-bold text-muted-foreground">€5.000+</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>✓ Custom Design</div>
                      <div>✓ 2-3 Monate Entwicklungszeit</div>
                      <div>✓ Komplexe Anpassungen</div>
                      <div>✗ Hohe Kosten</div>
                      <div>✗ Lange Wartezeiten</div>
                    </div>
                  </div>

                  {/* Template Lösung */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/10 rounded-lg animate-pulse"></div>
                    <div className="relative text-left p-4 bg-red-50 rounded-lg border-2 border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading font-bold text-red-800">Template Lösung</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-numeric font-bold line-through text-muted-foreground">€799</span>
                          <span className="text-2xl font-numeric font-bold text-red-600">€49</span>
                        </div>
                      </div>
                      <div className="text-sm text-red-700 space-y-1">
                        <div>✓ Professionelles Design</div>
                        <div>✓ Sofort einsatzbereit</div>
                        <div>✓ Einfache Anpassung</div>
                        <div>✓ Mobile optimiert</div>
                        <div>✓ 94% günstiger</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-numeric font-bold text-green-600 mb-1">94%</div>
                    <div className="text-sm font-heading font-bold text-green-800 mb-2">Kosteneinsparung</div>
                    <div className="text-xs text-green-700">
                      Gleiche Qualität, minimaler Preis
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action after Warum Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link to="/preise">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg px-8 py-6 shadow-gold">
                Jetzt sparen →
              </Button>
            </Link>
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

      {/* Prozess Section */}
      <section className="py-20 bg-gradient-to-r from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              Unser Prozess
            </h2>
            <p className="text-xl text-muted-foreground">
              Von der Idee bis zur fertigen Website - in 4 einfachen Schritten
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                step: "1",
                title: "Beratung",
                description: "Kostenloses Gespräch über Ihre Bedürfnisse und Ziele",
                icon: "💬",
                color: "bg-blue-100 text-blue-800",
                time: "30 Min"
              },
              {
                step: "2",
                title: "Template wählen",
                description: "Gemeinsam das perfekte Template für Ihr Business finden",
                icon: "🎯",
                color: "bg-green-100 text-green-800",
                time: "Sofort"
              },
              {
                step: "3",
                title: "Anpassung",
                description: "Farben, Texte und Inhalte nach Ihren Wünschen gestalten",
                icon: "🎨",
                time: "1-2 Tage"
              },
              {
                step: "4",
                title: "Live-Gang",
                description: "Website online stellen mit SSL, Hosting und Support",
                icon: "🚀",
                time: "Sofort"
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Connection line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 z-0" />
                )}

                <Card className="p-6 h-full hover-lift glass-card border-primary/20 group-hover:border-primary/40 transition-all duration-300 relative z-10">
                  <div className="text-center">
                    <div className={`w-16 h-16 ${process.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform`}>
                      {process.icon}
                    </div>

                    <div className="text-sm font-numeric font-bold text-primary mb-2">
                      Schritt {process.step}
                    </div>

                    <h3 className="text-lg font-heading font-bold mb-3 text-foreground">
                      {process.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {process.description}
                    </p>

                    <div className="inline-flex items-center px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                      ⏱️ {process.time}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200"
          >
            <h3 className="text-2xl font-heading font-bold mb-4 text-gradient-gold">
              Insgesamt nur 1-3 Tage bis zu Ihrer fertigen Website!
            </h3>
            <p className="text-muted-foreground mb-6">
              Vergleichen Sie das mit 2-3 Monaten bei klassischer Individualentwicklung
            </p>
            <Link to="/kontakt">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg px-8 py-6 shadow-gold">
                Kostenloses Beratungsgespräch →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              Was unsere Kunden sagen
            </h2>
            <p className="text-xl text-muted-foreground">
              Echte Bewertungen von echten Kunden
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Sarah Müller",
                company: "Restaurant Bella Vista",
                rating: 5,
                text: "Innerhalb von 2 Tagen hatten wir eine professionelle Website! Das Template war perfekt für unser Restaurant.",
                template: "Gastronomie Template"
              },
              {
                name: "Michael Weber",
                company: "Weber Immobilien",
                rating: 5,
                text: "Die Template-Qualität ist outstanding. Für den Preis unschlagbar. Unsere Kunden sind begeistert!",
                template: "Immobilien Template"
              },
              {
                name: "Anna Schmidt",
                company: "Freiberuflerin",
                rating: 5,
                text: "Endlich eine einfache Lösung für meine Portfolio-Website. Keine Programmierung nötig, sieht super aus!",
                template: "Portfolio Template"
              },
              {
                name: "Thomas Richter",
                company: "Tech Startup",
                rating: 5,
                text: "Von 0 auf professionelle Website in 24 Stunden. Das spart uns Monate Entwicklungszeit!",
                template: "Startup Template"
              },
              {
                name: "Lisa Hoffmann",
                company: "Beauty Studio",
                rating: 5,
                text: "Die Templates sind so einfach anzupassen. Meine Kunden buchen jetzt viel mehr online.",
                template: "Beauty Template"
              },
              {
                name: "David Klein",
                company: "Handwerksbetrieb",
                rating: 5,
                text: "Endlich eine Website, die meine Arbeit richtig präsentiert. Und das zu einem fairen Preis!",
                template: "Handwerk Template"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-6 h-full hover-lift glass-card border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="pt-3 border-t border-border/50">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {testimonial.template}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link to="/testimonials">
              <Button variant="outline" size="lg" className="font-heading text-lg px-8 py-6 border-primary hover:bg-primary/10">
                Mehr Bewertungen lesen →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Technologie-Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              Modernste Technologie
            </h2>
            <p className="text-xl text-muted-foreground">
              Gebaut mit den besten Tools der Webentwicklung
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {[
              { name: "React", color: "#61DAFB", logo: "⚛️" },
              { name: "Next.js", color: "#000000", logo: "▲" },
              { name: "TypeScript", color: "#3178C6", logo: "TS" },
              { name: "Tailwind CSS", color: "#38B2AC", logo: "🎨" },
              { name: "Framer Motion", color: "#0055FF", logo: "🎭" },
              { name: "Three.js", color: "#000000", logo: "🎲" },
              { name: "Node.js", color: "#339933", logo: "🟢" },
              { name: "Vite", color: "#646CFF", logo: "⚡" },
              { name: "ESLint", color: "#4B32C3", logo: "🔍" },
              { name: "Prettier", color: "#F7B93E", logo: "💅" },
              { name: "Git", color: "#F05032", logo: "📋" },
              { name: "VS Code", color: "#007ACC", logo: "💻" }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="text-center group"
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20 h-full hover:border-primary/40 transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl mb-3">{tech.logo}</div>
                  <div className="font-heading font-bold text-foreground mb-2">{tech.name}</div>
                  <div
                    className="w-full h-1 rounded-full bg-gradient-to-r opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${tech.color}, ${tech.color}40)` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-2xl p-8 border border-primary/20"
          >
            <h3 className="text-2xl font-heading font-bold mb-4 text-gradient-gold">
              Warum diese Tech-Stack?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-heading font-bold mb-1">Blitzschnell</div>
                <div className="text-muted-foreground">
                  Modernste Build-Tools für maximale Performance
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔧</div>
                <div className="font-heading font-bold mb-1">Developer-First</div>
                <div className="text-muted-foreground">
                  Beste Entwicklererfahrung mit TypeScript & Tools
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📱</div>
                <div className="font-heading font-bold mb-1">Future-Proof</div>
                <div className="text-muted-foreground">
                  Ständig aktualisiert mit neuesten Standards
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold mb-4 text-gradient-gold">
              Vertrauen & Sicherheit
            </h2>
            <p className="text-muted-foreground">
              Ihre Sicherheit ist uns wichtig
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "SSL Secure", icon: "🔒", description: "256-Bit Verschlüsselung" },
              { name: "DSGVO", icon: "🇪🇺", description: "EU-konform" },
              { name: "PayPal", icon: "💳", description: "Sichere Zahlung" },
              { name: "Stripe", icon: "💎", description: "Payment Gateway" },
              { name: "24/7 Support", icon: "🛟", description: "Immer da" },
              { name: "100% Secure", icon: "🛡️", description: "Garantie" }
            ].map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-primary/10 h-full hover:border-primary/30 transition-all duration-300 group-hover:bg-card">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="font-heading font-bold text-sm mb-1">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 bg-gradient-to-r from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
              Häufige Fragen
            </h2>
            <p className="text-xl text-muted-foreground">
              Die wichtigsten Antworten auf einen Blick
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {[
              {
                question: "Wie schnell ist meine Website online?",
                answer: "Sofort nach dem Kauf! Templates sind einsatzbereit und können in Minuten angepasst werden.",
                icon: "⚡"
              },
              {
                question: "Kann ich das Design anpassen?",
                answer: "Ja, alle Templates sind vollständig anpassbar - Farben, Texte, Bilder und Struktur.",
                icon: "🎨"
              },
              {
                question: "Sind die Templates mobil optimiert?",
                answer: "100% responsive! Alle Templates funktionieren perfekt auf Desktop, Tablet und Mobile.",
                icon: "📱"
              },
              {
                question: "Was ist im Preis alles enthalten?",
                answer: "Template + Hosting + SSL + Support + Updates. Keine versteckten Kosten!",
                icon: "💰"
              },
              {
                question: "Kann ich mehrere Templates kaufen?",
                answer: "Ja! Jedes Template ist einzeln verfügbar. Kombinieren Sie verschiedene Designs.",
                icon: "🔄"
              },
              {
                question: "Gibt es eine Geld-zurück-Garantie?",
                answer: "30 Tage Geld-zurück-Garantie auf alle Templates. Zufriedenheit garantiert!",
                icon: "🛡️"
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-6 h-full hover-lift glass-card border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">{faq.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link to="/faq">
              <Button variant="outline" size="lg" className="font-heading text-lg px-8 py-6 border-primary hover:bg-primary/10">
                Alle FAQ ansehen →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <Card className="p-12 glass-card border-gold/30 shadow-glow">
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 text-sm font-bold rounded-full border border-red-200 mb-4">
                  🔥 Limitiertes Angebot - Nur diese Woche!
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gradient-luxury">
                  Starten Sie noch heute
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Professionelle Website zu unschlagbaren Preisen. Keine Wartezeiten, sofort einsatzbereit.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-heading font-bold mb-1">Sofort verfügbar</div>
                  <div className="text-sm text-muted-foreground">Keine Entwicklungszeit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-heading font-bold mb-1">94% günstiger</div>
                  <div className="text-sm text-muted-foreground">Gleiche Qualität</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <div className="font-heading font-bold mb-1">100% sicher</div>
                  <div className="text-sm text-muted-foreground">Geld-zurück-Garantie</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/templates">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg px-8 py-6 shadow-gold">
                    Templates ansehen →
                  </Button>
                </Link>
                <Link to="/preise">
                  <Button size="lg" variant="outline" className="font-heading text-lg px-8 py-6 border-primary hover:bg-primary/10">
                    Preise vergleichen
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button size="lg" variant="secondary" className="font-heading text-lg px-8 py-6">
                    Kostenlos beraten
                  </Button>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Keine versteckten Kosten • 30 Tage Geld-zurück • SSL & Hosting inklusive
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
