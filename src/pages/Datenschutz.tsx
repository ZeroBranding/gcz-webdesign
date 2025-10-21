import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Datenschutz() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-heading font-bold mb-8 text-gradient-gold">
            Datenschutzerklärung
          </h1>
          
          <Card className="p-8 border-primary/20">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-heading font-bold mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-xl font-heading font-bold mb-3 mt-6">Allgemeine Hinweise</h3>
              <p className="mb-4 text-muted-foreground">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">2. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-xl font-heading font-bold mb-3 mt-6">Cookies</h3>
              <p className="mb-4 text-muted-foreground">
                Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem
                Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot
                nutzerfreundlicher, effektiver und sicherer zu machen.
              </p>

              <h3 className="text-xl font-heading font-bold mb-3 mt-6">Server-Log-Dateien</h3>
              <p className="mb-4 text-muted-foreground">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>

              <h3 className="text-xl font-heading font-bold mb-3 mt-6">Kontaktformular</h3>
              <p className="mb-4 text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">3. Ihre Rechte</h2>
              <p className="mb-4 text-muted-foreground">
                Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
                Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
                die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">4. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="mb-4 text-muted-foreground">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
                Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
                daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">5. Datenschutzbeauftragter</h2>
              <p className="text-muted-foreground">
                Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br />
                datenschutz@webdesign-factory.de
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
