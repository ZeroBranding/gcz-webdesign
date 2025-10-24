import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ContrastSlider } from "@/components/ContrastSlider";
import { LoginButton } from "@/components/auth/AuthModal";
import { FireText } from "@/components/FireText";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const { total, items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ESC-Taste Handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80 safe-area-inset">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Startseite Button mit Logo */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover-lift group relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <img 
                  src={logo} 
                  alt="Webdesign Fabrik Logo" 
                  className="h-5 w-5 mr-2 relative z-10 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                />
                <span className="relative z-10 font-semibold bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent">
                  Startseite
                </span>
              </Button>
            </Link>
          </div>

          {/* Center: Webdesign Fabrik mit Feuer */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <FireText 
              text="Webdesign Fabrik" 
              className="text-2xl lg:text-3xl font-heading"
            />
          </div>

          {/* Right: Navigation Items */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg border border-primary/30 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <span className="text-sm font-numeric font-bold text-gradient-gold-luxury drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]">
                €{total}
              </span>
            </div>

            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover-lift group bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-primary via-yellow-500 to-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(234,179,8,0.6)] animate-pulse">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover-lift touch-target group bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-300"
              aria-label="Menü öffnen"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="group-hover:scale-110 transition-transform duration-300"
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

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mega Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-[73px] left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border shadow-elegant z-50"
          >
            <div className="container mx-auto px-4 py-6 lg:py-8">
              {/* Main Navigation */}
              <div className="mb-6 lg:mb-8">
                <nav className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 lg:gap-6 pb-6 border-b border-border">
                  <Link
                    to="/"
                    className="text-base lg:text-lg font-heading hover:text-primary transition-colors focus-ring py-2 px-3 rounded-lg hover:bg-muted/50"
                    onClick={closeMenu}
                  >
                    🏠 Startseite
                  </Link>
                  <Link
                    to="/templates"
                    className="text-base lg:text-lg font-heading hover:text-primary transition-colors focus-ring py-2 px-3 rounded-lg hover:bg-muted/50"
                    onClick={closeMenu}
                  >
                    🎨 Templates
                  </Link>
                  <Link
                    to="/preise"
                    className="text-base lg:text-lg font-heading hover:text-primary transition-colors focus-ring py-2 px-3 rounded-lg hover:bg-muted/50"
                    onClick={closeMenu}
                  >
                    💰 Preise
                  </Link>
                  <Link
                    to="/angebote"
                    className="text-base lg:text-lg font-heading hover:text-primary transition-colors focus-ring py-2 px-3 rounded-lg hover:bg-muted/50"
                    onClick={closeMenu}
                  >
                    🔥 Angebote
                  </Link>
                  <Link
                    to="/kontakt"
                    className="text-base lg:text-lg font-heading hover:text-primary transition-colors focus-ring py-2 px-3 rounded-lg hover:bg-muted/50"
                    onClick={closeMenu}
                  >
                    ✉️ Kontakt
                  </Link>
                </nav>
              </div>

              {/* Template Categories */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-heading font-bold mb-4 lg:mb-6 text-center text-gradient-gold">
                  Template-Kategorien
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 max-w-5xl mx-auto">
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
                      className="flex flex-col items-center justify-center p-3 lg:p-4 bg-muted rounded-lg hover:bg-primary/10 hover:scale-105 transition-all hover-lift focus-ring"
                      onClick={closeMenu}
                    >
                      <span className="text-2xl lg:text-3xl mb-2">{cat.icon}</span>
                      <span className="text-xs lg:text-sm font-medium text-center leading-tight">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile-specific sections */}
              {isMobile && (
                <div className="mb-6 space-y-4">
                  {/* Mobile Auth */}
                  <div className="flex justify-center">
                    <LoginButton />
                  </div>

                  {/* Mobile Language Selector */}
                  <div className="flex justify-center">
                    <LanguageSelector />
                  </div>

                  {/* Mobile Contrast Slider */}
                  <div className="flex justify-center px-4">
                    <ContrastSlider />
                  </div>
                </div>
              )}

              {/* Legal Footer */}
              <div className="pt-4 lg:pt-6 border-t border-border">
                <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm text-muted-foreground">
                  <Link
                    to="/impressum"
                    className="hover:text-primary transition-colors focus-ring py-1 px-2 rounded"
                    onClick={closeMenu}
                  >
                    Impressum
                  </Link>
                  <Link
                    to="/datenschutz"
                    className="hover:text-primary transition-colors focus-ring py-1 px-2 rounded"
                    onClick={closeMenu}
                  >
                    Datenschutz
                  </Link>
                  <Link
                    to="/agbs"
                    className="hover:text-primary transition-colors focus-ring py-1 px-2 rounded"
                    onClick={closeMenu}
                  >
                    AGB
                  </Link>
                </nav>
              </div>

              {/* Close Instructions */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Drücken Sie ESC oder tippen Sie außerhalb, um zu schließen
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
