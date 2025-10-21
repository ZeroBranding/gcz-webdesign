import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4 text-gradient-gold">
              Kontakt
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-foreground transition-colors">
                📧 info@webdesign-factory.de
              </li>
              <li className="hover:text-foreground transition-colors">
                📞 +49 (0) 123 456789
              </li>
              <li className="hover:text-foreground transition-colors">
                📍 Musterstraße 123, 12345 Berlin
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4 text-gradient-gold">
              Schnellzugriff
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/templates"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  to="/preise"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Preise
                </Link>
              </li>
              <li>
                <Link
                  to="/angebote"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Angebote
                </Link>
              </li>
              <li>
                <Link
                  to="/kontakt"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4 text-gradient-gold">
              Rechtliches
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/impressum"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  to="/datenschutz"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  to="/agbs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  AGBs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground">
          <p>&copy; {currentYear} Webdesign Factory. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};
