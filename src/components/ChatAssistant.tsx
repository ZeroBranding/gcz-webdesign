import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Crown,
  Zap,
  Minimize2,
  Maximize2,
  Minus,
  Phone,
  Mail,
  MapPin,
  Clock,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

type ChatState = "open" | "minimized" | "closed";

interface GCZAgentKnowledge {
  company: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    hours: {
      weekday: string;
      saturday: string;
      sunday: string;
    };
  };
  templates: {
    categories: string[];
    total: number;
    levels: string[];
  };
  pricing: {
    basic: string;
    professional: string;
    premium: string;
    enterprise: string;
  };
  features: string[];
}

const gczKnowledge: GCZAgentKnowledge = {
  company: {
    name: "German Code Zero",
    email: "ki@gcz-webdesign.de",
    phone: "01632419823",
    whatsapp: "01633338242",
    address: "Ostmarkstraße 56, 48145 Münster",
    hours: {
      weekday: "10:00-22:00 Uhr",
      saturday: "12:00-17:00 Uhr",
      sunday: "nach Vereinbarung"
    }
  },
  templates: {
    categories: [
      "E-Commerce", "Gastronomie", "Immobilien", "Portfolio",
      "Corporate", "Startup", "Handwerk", "Beauty", "Health", "Coaching"
    ],
    total: 36,
    levels: ["Basic", "Professional", "Premium", "Enterprise"]
  },
  pricing: {
    basic: "€49-€179",
    professional: "€99-€349",
    premium: "€199-€699",
    enterprise: "€399-€1299"
  },
  features: [
    "Responsive Design", "SEO-Optimierung", "SSL-Zertifikat",
    "Admin-Panel", "Payment Integration", "Multi-Language",
    "Analytics", "Performance Optimization", "DSGVO-konform"
  ]
};

export const ChatAssistant = () => {
  const { user } = useAuth();
  const [chatState, setChatState] = useState<ChatState>("open");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: user
        ? `👋 Herzlich willkommen bei German Code Zero, ${user.name}! Ich bin Ihr GCZ-Agent und helfe Ihnen gerne bei allen Fragen zu Templates, Preisen und Projekten. Wie kann ich Ihnen behilflich sein?`
        : "👋 Willkommen bei German Code Zero! Ich bin Ihr GCZ-Agent und helfe Ihnen gerne bei allen Fragen zu Templates, Preisen und Projekten. Wie kann ich Ihnen behilflich sein?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [chatSize, setChatSize] = useState({ width: 384, height: 600 });
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });

  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gcz_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;

        const filtered = parsed.filter(
          (msg: Message) => now - msg.timestamp < thirtyDays
        );
        setMessages(prev => [prev[0], ...filtered]);

        if (filtered.length !== parsed.length) {
          localStorage.setItem("gcz_chat", JSON.stringify(filtered));
        }
      } catch (e) {
        console.error("Failed to load chat history", e);
      }
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current && chatState === "open") {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    }
  }, [messages, chatState]);

  // Save to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("gcz_chat", JSON.stringify(messages.slice(1)));
    }
  }, [messages]);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatState !== "open") return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - chatPosition.x,
      y: e.clientY - chatPosition.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setChatPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Generate intelligent LLM-style response
  const generateResponse = async (userInput: string): Promise<string> => {
    const input = userInput.toLowerCase();

    // Personalisierte Begrüßung/Abschied
    if (user && (input.includes("tschüss") || input.includes("auf wiedersehen") || input.includes("bye"))) {
      return `👋 Auf Wiedersehen, ${user.name}! Ich freue mich auf unsere nächste Unterhaltung. Bei Fragen stehe ich gerne zur Verfügung! 🌟`;
    }

    // Kontaktinformationen
    if (input.includes("kontakt") || input.includes("telefon") || input.includes("email") || input.includes("adresse")) {
      return `📞 **Kontaktinformationen German Code Zero:**

📧 **E-Mail:** ${gczKnowledge.company.email}
📱 **Telefon:** ${gczKnowledge.company.phone}
💬 **WhatsApp:** ${gczKnowledge.company.whatsapp}
📍 **Adresse:** ${gczKnowledge.company.address}

🏢 **Öffnungszeiten:**
• Montag-Freitag: ${gczKnowledge.company.hours.weekday}
• Samstag: ${gczKnowledge.company.hours.saturday}
• Sonntag: ${gczKnowledge.company.hours.sunday}

Gerne helfe ich Ihnen bei allen Fragen!`;
    }

    // Templates und Kategorien
    if (input.includes("template") || input.includes("vorlage") || input.includes("design")) {
      return `🎨 **Unsere Template-Kategorien:**

${gczKnowledge.templates.categories.map(cat => `• ${cat}`).join('\n')}

📊 **${gczKnowledge.templates.total} Templates** in **${gczKnowledge.templates.levels.length} Service-Levels:**
${gczKnowledge.templates.levels.map(level => `• **${level}**`).join('\n')}

💰 **Preisspannen:**
• Basic: ${gczKnowledge.pricing.basic}
• Professional: ${gczKnowledge.pricing.professional}
• Premium: ${gczKnowledge.pricing.premium}
• Enterprise: ${gczKnowledge.pricing.enterprise}

✨ Alle Templates sind responsive, SEO-optimiert und sofort einsatzbereit!`;
    }

    // Preise
    if (input.includes("preis") || input.includes("kosten") || input.includes("rabatt")) {
      return `💰 **Preisübersicht German Code Zero:**

🎯 **Service-Levels & Preise:**
• **Basic:** ${gczKnowledge.pricing.basic} (perfekt für Einsteiger)
• **Professional:** ${gczKnowledge.pricing.professional} (erweiterte Features)
• **Premium:** ${gczKnowledge.pricing.premium} (komplette Lösungen)
• **Enterprise:** ${gczKnowledge.pricing.enterprise} (maßgeschneiderte Projekte)

🔥 **Bis zu 94% Rabatt** auf alle Pakete!
⚡ **Sofort-Download** nach Zahlung
🛡️ **Zufriedenheitsgarantie** auf alle Services

📞 Bei Fragen zu Preisen helfe ich gerne persönlich weiter!`;
    }

    // Öffnungszeiten
    if (input.includes("öffnungszeit") || input.includes("geöffnet") || input.includes("erreichbar")) {
      return `🕐 **Öffnungszeiten German Code Zero:**

📅 **Montag - Freitag:** ${gczKnowledge.company.hours.weekday}
📅 **Samstag:** ${gczKnowledge.company.hours.saturday}
📅 **Sonntag:** ${gczKnowledge.company.hours.sunday}

📱 **Außerhalb der Öffnungszeiten:**
• E-Mail: ${gczKnowledge.company.email}
• WhatsApp: ${gczKnowledge.company.whatsapp}
• Kontaktformular auf der Website

🚀 **Schnelle Rückmeldung** garantiert - wir sind für Sie da!`;
    }

    // Features und Technik
    if (input.includes("feature") || input.includes("technik") || input.includes("funktion")) {
      return `⚡ **Premium-Features aller Templates:**

${gczKnowledge.features.map(feature => `✅ ${feature}`).join('\n')}

🛠️ **Technische Highlights:**
• **React/Next.js** - Modernste Technologie
• **TypeScript** - Typsicherheit
• **Responsive Design** - Alle Geräte
• **Performance** - Blitzschnell
• **SEO** - Suchmaschinenoptimiert
• **Security** - SSL & DSGVO

🎯 **Branchenspezifische Features** je nach Kategorie verfügbar!`;
    }

    // Bestellung und Prozess
    if (input.includes("bestell") || input.includes("kauf") || input.includes("prozess")) {
      return `🛒 **Bestellprozess bei German Code Zero:**

1️⃣ **Template auswählen** aus ${gczKnowledge.templates.total} verfügbaren Designs
2️⃣ **Service-Level wählen** (Basic, Professional, Premium, Enterprise)
3️⃣ **In den Warenkorb** und zur Kasse
4️⃣ **Sichere Zahlung** (Kreditkarte, PayPal, Apple Pay)
5️⃣ **Sofort-Download** der Website-Dateien

⚡ **Dauer:** 1-2 Minuten bis zur fertigen Website!
💳 **Zahlungsmethoden:** Stripe, PayPal, Apple Pay, Google Pay
📁 **Lieferung:** ZIP-Datei mit allen Quellcodes

🎉 **Starten Sie jetzt Ihr Online-Projekt!**`;
    }

    // Support und Hilfe
    if (input.includes("hilfe") || input.includes("support") || input.includes("problem")) {
      return `🆘 **Support bei German Code Zero:**

🤖 **Sofort-Hilfe:**
• Ich helfe bei allen Fragen zu Templates und Preisen
• Technische Beratung für Ihr Projekt
• Anleitung zur Website-Einrichtung

📞 **Persönlicher Support:**
• **Telefon:** ${gczKnowledge.company.phone}
• **WhatsApp:** ${gczKnowledge.company.whatsapp}
• **E-Mail:** ${gczKnowledge.company.email}

⏰ **Erreichbarkeit:** ${gczKnowledge.company.hours.weekday}
📍 **Adresse:** ${gczKnowledge.company.address}

💪 **Wir sind für Sie da** - professionell und zuverlässig!`;
    }

    // Impressum
    if (input.includes("impressum") || input.includes("rechtlich") || input.includes("agb")) {
      return `📋 **Impressum German Code Zero:**

🏢 **Anschrift:**
${gczKnowledge.company.address}

📞 **Kontakt:**
• E-Mail: ${gczKnowledge.company.email}
• Telefon: ${gczKnowledge.company.phone}
• WhatsApp: ${gczKnowledge.company.whatsapp}

🕐 **Öffnungszeiten:**
• Montag-Freitag: ${gczKnowledge.company.hours.weekday}
• Samstag: ${gczKnowledge.company.hours.saturday}
• Sonntag: ${gczKnowledge.company.hours.sunday}

📄 **Rechtliche Informationen:**
• Vollständiges Impressum auf /impressum
• AGB und Datenschutz auf /agbs und /datenschutz
• DSGVO-konform und transparent

✅ **Vertrauen und Transparenz** sind uns wichtig!`;
    }

    // Fallback - LLM-style intelligente Antwort
    const fallbackResponses = [
      `🤔 Interessante Frage! Als Ihr GCZ-Agent helfe ich gerne bei allen Themen rund um Webdesign und Templates. ${user ? `Was möchten Sie als nächstes wissen, ${user.name}?` : 'Was kann ich für Sie tun?'}`,

      `💡 Gute Frage! Bei German Code Zero finden Sie professionelle Lösungen für alle Branchen. ${user ? `${user.name}, ` : ''}Ich erkläre gerne alle Details zu Templates, Preisen oder Services.`,

      `✨ Das ist ein spannendes Thema! Als Experte für Premium-Webdesign helfe ich gerne weiter. ${user ? `Möchten Sie mehr zu einem bestimmten Bereich wissen, ${user.name}?` : 'Was interessiert Sie besonders?'}`,

      `🚀 Vielen Dank für Ihre Frage! German Code Zero bietet ${gczKnowledge.templates.total} Templates in ${gczKnowledge.templates.categories.length} Kategorien. ${user ? `${user.name}, ` : ''}Wie kann ich Ihnen am besten helfen?`
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSend = async () => {
    if (input.trim().length < 2) {
      toast.error("Bitte mindestens 2 Zeichen eingeben");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Generate intelligent response
    try {
      const response = await generateResponse(input);
      setTimeout(() => {
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 800 + Math.random() * 400); // Variable typing time
    } catch (error) {
      setIsLoading(false);
      toast.error("Entschuldigung, es gab einen Fehler bei der Antwortgenerierung.");
    }
  };

  const minimizeChat = () => {
    setChatState("minimized");
  };

  const maximizeChat = () => {
    setChatState("open");
  };

  const closeChat = () => {
    setChatState("closed");
  };

  const openChat = () => {
    setChatState("open");
  };

  // Render different chat states
  if (chatState === "closed") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={openChat}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          size="icon"
        >
          <div className="relative">
            <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
            <Crown className="h-4 h-4 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </Button>
      </motion.div>
    );
  }

  if (chatState === "minimized") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Card className="w-96 bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-400 shadow-xl">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-900" />
              <span className="text-yellow-900 font-medium text-sm">GCZ-Agent</span>
              <Badge className="bg-green-500 text-white text-xs">Online</Badge>
            </div>
            <div className="flex gap-1">
              <Button
                onClick={maximizeChat}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-yellow-900 hover:bg-yellow-400"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button
                onClick={closeChat}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-yellow-900 hover:bg-yellow-400"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={chatRef}
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: chatPosition.x,
          y: chatPosition.y,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 2
          }
        }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        className="fixed bottom-6 right-6 z-50"
        style={{
          width: chatSize.width,
          height: chatSize.height,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <Card className="w-full h-full shadow-2xl border-2 border-gold bg-gradient-to-br from-background via-background to-background/95 backdrop-blur-xl overflow-hidden">
          {/* Gold Header */}
          <div
            className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-4 border-b-2 border-yellow-400 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Crown className="w-8 h-8 text-yellow-900 drop-shadow-lg" />
                  <Sparkles className="w-4 h-4 text-yellow-800 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-yellow-900 drop-shadow-md">
                    GCZ-Agent
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-yellow-800 font-medium">
                      {user ? `${user.name} - Online & Bereit` : 'Online & Bereit'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-1">
                <Button
                  onClick={minimizeChat}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-yellow-900 hover:bg-yellow-300/50 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={closeChat}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-yellow-900 hover:bg-yellow-300/50 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-background/50 to-background" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg relative ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white ml-8"
                        : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-foreground mr-8 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {msg.role === "user" && (
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                        <Zap className="w-4 h-4 text-yellow-400 drop-shadow-md" />
                      </div>
                    )}

                    {msg.role === "assistant" && (
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                        <Crown className="w-4 h-4 text-yellow-500 drop-shadow-md" />
                      </div>
                    )}

                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>

                    <div className={`text-xs mt-2 ${
                      msg.role === "user" ? "text-yellow-100" : "text-muted-foreground"
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading Animation */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-700 mr-8">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-500 animate-pulse" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">tippt...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Gold Input Area */}
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Schreiben Sie Ihre Nachricht..."
                  className="pl-4 pr-12 border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                  maxLength={200}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                  {input.length}/200
                </div>
              </div>
              <Button
                onClick={handleSend}
                disabled={isLoading || input.trim().length < 2}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 text-xs text-yellow-700 dark:text-yellow-300 text-center">
              💡 Fragen Sie mich nach Templates, Preisen oder Hilfe!
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
