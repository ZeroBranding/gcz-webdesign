import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function AGBs() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-heading font-bold mb-8 text-gradient-gold">
            Allgemeine Geschäftsbedingungen
          </h1>
          
          <Card className="p-8 border-primary/20">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-heading font-bold mb-4">§ 1 Geltungsbereich</h2>
              <p className="mb-6 text-muted-foreground">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über
                Webdesign-Leistungen, die zwischen der Webdesign Factory und dem Kunden
                geschlossen werden.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">§ 2 Vertragsgegenstand</h2>
              <p className="mb-4 text-muted-foreground">
                Gegenstand des Vertrages ist die Erstellung und/oder Pflege von Websites sowie
                damit zusammenhängender Dienstleistungen nach Maßgabe der getroffenen
                Vereinbarungen.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">§ 3 Leistungsumfang</h2>
              <p className="mb-4 text-muted-foreground">
                Der Umfang der zu erbringenden Leistungen ergibt sich aus der Leistungsbeschreibung
                im jeweiligen Angebot. Nachträgliche Änderungen des Leistungsinhalts bedürfen der
                Schriftform.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">§ 4 Mitwirkungspflichten des Kunden</h2>
              <p className="mb-4 text-muted-foreground">
                Der Kunde stellt uns alle für die Durchführung des Auftrags erforderlichen Inhalte,
                insbesondere Texte, Bilder und Grafiken in einem elektronisch verwertbaren Format
                zur Verfügung.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">§ 5 Vergütung und Zahlung</h2>
              <p className="mb-4 text-muted-foreground">
                Die Vergütung richtet sich nach dem vereinbarten Paket. Alle Preise verstehen sich
                inklusive der gesetzlichen Mehrwertsteuer. Eine Anzahlung von 50% wird bei
                Auftragserteilung fällig, die restlichen 50% bei Projektabschluss.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">§ 6 Urheberrechte</h2>
              <p className="mb-4 text-muted-foreground">
                Alle im Rahmen des Auftrags geschaffenen Werke sind urheberrechtlich geschützt.
                Der Kunde erwirbt nach vollständiger Bezahlung ein einfaches, nicht ausschließliches
                Nutzungsrecht für die vereinbarten Zwecke.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">§ 7 Gewährleistung</h2>
              <p className="mb-4 text-muted-foreground">
                Wir gewährleisten, dass die Website bei Abnahme die vereinbarten Funktionen
                erfüllt und frei von wesentlichen Mängeln ist. Die Gewährleistungsfrist beträgt
                12 Monate ab Abnahme.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">§ 8 Haftung</h2>
              <p className="mb-4 text-muted-foreground">
                Wir haften unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers
                oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden.
                Im Übrigen ist die Haftung auf Vorsatz und grobe Fahrlässigkeit beschränkt.
              </p>

              <h2 className="text-2xl font-heading font-bold mb-4 mt-8">§ 9 Schlussbestimmungen</h2>
              <p className="text-muted-foreground">
                Es gilt das Recht der Bundesrepublik Deutschland. Erfüllungsort und Gerichtsstand
                ist Berlin, sofern der Kunde Kaufmann ist.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
