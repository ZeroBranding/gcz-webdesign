import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors"
              aria-label="Toggle theme"
            >
              <span className={theme === "light" ? "text-gold" : "text-muted-foreground"}>
                ☀️
              </span>
              <span className={theme === "dark" ? "text-gold" : "text-muted-foreground"}>
                🌙
              </span>
            </button>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gradient-gold hover:scale-105 transition-transform">
              WEBDESIGN FACTORY
            </h1>
          </Link>

          {/* Right: Navigation */}
          <div className="flex items-center gap-4">
            {/* Desktop Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Cart Button */}
            <Link to="/kontakt">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mega Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 w-80 h-[calc(100vh-73px)] bg-card border-r border-border overflow-y-auto shadow-elegant"
          >
            <div className="p-6 space-y-6">
              {/* Main Categories */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                  Hauptmenü
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors text-lg"
                    >
                      🏠 Startseite
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/templates"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors text-lg"
                    >
                      🎨 Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/preise"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors text-lg"
                    >
                      💰 Preise
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/angebote"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors text-lg"
                    >
                      🔥 Angebote
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/kontakt"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors text-lg"
                    >
                      📧 Kontakt
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template Categories */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                  Template Kategorien
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/templates/e-commerce"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      🛒 E-Commerce
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/templates/gastronomie"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      🍽️ Gastronomie
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/templates/immobilien"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      🏢 Immobilien
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/templates/portfolio"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      💼 Portfolio
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                  Rechtliches
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/impressum"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors text-sm"
                    >
                      Impressum
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/datenschutz"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors text-sm"
                    >
                      Datenschutz
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/agbs"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors text-sm"
                    >
                      AGBs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
