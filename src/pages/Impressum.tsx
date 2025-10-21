import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Impressum() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-heading font-bold mb-8 text-gradient-gold">
            Impressum
          </h1>
          
          <Card className="p-8 border-primary/20">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-heading font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="mb-6 text-muted-foreground">
                Webdesign Factory<br />
                Musterstraße 123<br />
                12345 Berlin<br />
                Deutschland
              </p>

              <h3 className="text-xl font-heading font-bold mb-3 mt-8">Kontakt</h3>
              <p className="mb-6 text-muted-foreground">
                Telefon: +49 (0) 123 456789<br />
                E-Mail: info@webdesign-factory.de
              </p>

              <h3 className="text-xl font-heading font-bold mb-3 mt-8">Vertreten durch</h3>
              <p className="mb-6 text-muted-foreground">
                Max Mustermann<br />
                Geschäftsführer
              </p>

              <h3 className="text-xl font-heading font-bold mb-3 mt-8">Registereintrag</h3>
              <p className="mb-6 text-muted-foreground">
                Eintragung im Handelsregister<br />
                Registergericht: Amtsgericht Berlin<br />
                Registernummer: HRB 12345
              </p>

              <h3 className="text-xl font-heading font-bold mb-3 mt-8">Umsatzsteuer-ID</h3>
              <p className="mb-6 text-muted-foreground">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                DE123456789
              </p>

              <h3 className="text-xl font-heading font-bold mb-3 mt-8">Haftungsausschluss</h3>
              <h4 className="text-lg font-semibold mb-2 mt-4">Haftung für Inhalte</h4>
              <p className="mb-4 text-muted-foreground">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>

              <h4 className="text-lg font-semibold mb-2 mt-4">Haftung für Links</h4>
              <p className="mb-4 text-muted-foreground">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              </p>

              <h4 className="text-lg font-semibold mb-2 mt-4">Urheberrecht</h4>
              <p className="text-muted-foreground">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
