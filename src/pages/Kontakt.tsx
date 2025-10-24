import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast.error("Bitte akzeptieren Sie die Datenschutzerklärung");
      return;
    }

    toast.success("Nachricht gesendet! Wir melden uns in Kürze.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gradient-gold">
            Kontakt
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Lassen Sie uns gemeinsam Ihr Projekt besprechen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-primary/20">
              <h2 className="text-2xl font-heading font-bold mb-6">Nachricht senden</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-Mail *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Nachricht *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacy}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, privacy: checked as boolean })
                    }
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground">
                    Ich habe die Datenschutzerklärung gelesen und akzeptiere diese. *
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-gold">
                  Nachricht senden
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Card className="p-8 border-primary/20">
              <h2 className="text-2xl font-heading font-bold mb-6">Kontaktinformationen</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">E-Mail</h3>
                    <p className="text-muted-foreground">ki@gcz-webdesign.de</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-muted-foreground">01632419823</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground">
                      Ostmarkstraße 56<br />
                      48145 Münster<br />
                      Deutschland
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 glass-card border-gold/30">
              <h3 className="text-xl font-heading font-bold mb-4 text-gradient-gold">
                🚀 Kostenlose Erstberatung
              </h3>
              <p className="text-muted-foreground mb-4">
                Vereinbaren Sie jetzt ein unverbindliches Beratungsgespräch und
                lassen Sie uns gemeinsam Ihre Vision Wirklichkeit werden.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 30-minütiges Strategiegespräch</li>
                <li>✓ Individuelle Projektanalyse</li>
                <li>✓ Unverbindliches Angebot</li>
              </ul>
            </Card>

            <Card className="p-8 border-primary/20">
              <h3 className="text-xl font-heading font-bold mb-4">Öffnungszeiten</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Montag - Freitag: 10:00 - 22:00 Uhr</p>
                <p>Samstag: 12:00 - 17:00 Uhr</p>
                <p>Sonntag: Nach Vereinbarung</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
