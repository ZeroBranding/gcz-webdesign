import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, ShoppingCart, Sun, Moon, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ContrastSlider } from "@/components/ContrastSlider";
import { LoginButton } from "@/components/auth/AuthModal";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const { total, items } = useCart();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Contrast Slider */}
          <div className="hidden lg:block min-w-[200px]">
            <ContrastSlider />
          </div>

          {/* Center: Logo with Animation */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
            <motion.img
              src={logo}
              alt="German Code Zero"
              className="h-12 w-auto"
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            />
          </Link>

          {/* Right: Navigation Items */}
          <div className="flex items-center gap-3">
            {/* Startseite Button */}
            <Link to="/">
              <Button variant="ghost" size="sm" className="hidden md:flex hover-lift">
                🏠 Startseite
              </Button>
            </Link>

            <LanguageSelector />

            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-muted rounded-lg">
              <span className="text-sm font-numeric font-bold text-gradient-gold">
                €{total}
              </span>
            </div>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover-lift">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Button */}
            <div className="hidden md:block">
              <LoginButton />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover-lift hidden md:flex"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover-lift"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mega Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[73px] left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border shadow-elegant"
          >
            <div className="container mx-auto px-4 py-8">
              {/* Main Navigation */}
              <div className="mb-8">
                <nav className="flex flex-wrap justify-center gap-6 pb-6 border-b border-border">
                  <Link
                    to="/"
                    className="text-lg font-heading hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🏠 Startseite
                  </Link>
                  <Link
                    to="/templates"
                    className="text-lg font-heading hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🎨 Templates
                  </Link>
                  <Link
                    to="/preise"
                    className="text-lg font-heading hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    💰 Preise
                  </Link>
                  <Link
                    to="/angebote"
                    className="text-lg font-heading hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🔥 Angebote
                  </Link>
                  <Link
                    to="/kontakt"
                    className="text-lg font-heading hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✉️ Kontakt
                  </Link>
                </nav>
              </div>

              {/* Template Categories */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-6 text-center text-gradient-gold">
                  Template-Kategorien
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                  {[
                    { icon: "🛒", name: "E-Commerce", path: "e-commerce" },
                    { icon: "🍽️", name: "Gastronomie", path: "gastronomie" },
                    { icon: "🏠", name: "Immobilien", path: "immobilien" },
                    { icon: "💼", name: "Portfolio", path: "portfolio" },
                    { icon: "🏛️", name: "Corporate", path: "corporate" },
                    { icon: "🚀", name: "Startup", path: "startup" },
                    { icon: "🔧", name: "Handwerk", path: "handwerk" },
                    { icon: "💄", name: "Beauty", path: "beauty" },
                    { icon: "🩺", name: "Health", path: "health" },
                    { icon: "🎯", name: "Coaching", path: "coaching" },
                  ].map((cat) => (
                    <Link
                      key={cat.path}
                      to={`/templates/${cat.path}`}
                      className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-primary/10 hover:scale-105 transition-all hover-lift"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-3xl mb-2">{cat.icon}</span>
                      <span className="text-sm font-medium text-center">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal Footer */}
              <div className="mt-8 pt-6 border-t border-border">
                <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <Link
                    to="/impressum"
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Impressum
                  </Link>
                  <Link
                    to="/datenschutz"
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Datenschutz
                  </Link>
                  <Link
                    to="/agbs"
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    AGB
                  </Link>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
