import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Crown,
  Zap,
  Minus
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
  const [chatState, setChatState] = useState<ChatState>("closed");
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
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [chatSize, setChatSize] = useState({ width: 320, height: 480 });
  const [lastActivity, setLastActivity] = useState(Date.now());

  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  // Load chat history from localStorage (nur für registrierte User)
  useEffect(() => {
    if (!user) return;
    
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
  }, [user]);

  // Inaktivitäts-Timer: Nach 1 Stunde Inaktivität Kontext löschen (nur für nicht-registrierte)
  useEffect(() => {
    if (user) return;
    
    const checkInactivity = setInterval(() => {
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;
      
      if (now - lastActivity > oneHour && messages.length > 1) {
        setMessages([messages[0]]);
        localStorage.removeItem("gcz_chat");
        toast.info("Chat-Verlauf wurde aufgrund von Inaktivität zurückgesetzt");
      }
    }, 60000);

    return () => clearInterval(checkInactivity);
  }, [lastActivity, messages, user]);

  // Auto-scroll to bottom bei neuen Nachrichten
  useEffect(() => {
    if (scrollRef.current && chatState === "open") {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        setTimeout(() => {
          scrollElement.scrollTo({
            top: scrollElement.scrollHeight,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [messages, chatState]);

  // Save to localStorage (nur für registrierte User)
  useEffect(() => {
    if (messages.length > 1 && user) {
      localStorage.setItem("gcz_chat", JSON.stringify(messages.slice(1)));
    }
  }, [messages, user]);

  // Drag functionality - nur am Header
  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatState !== "open") return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - chatPosition.x,
      y: e.clientY - chatPosition.y
    };
  };

  // Resize functionality
  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        const newX = e.clientX - dragStart.current.x;
        const newY = e.clientY - dragStart.current.y;
        
        const maxX = window.innerWidth - chatSize.width;
        const maxY = window.innerHeight - chatSize.height;
        
        setChatPosition({
          x: Math.min(Math.max(newX, -window.innerWidth + chatSize.width), maxX),
          y: Math.min(Math.max(newY, -window.innerHeight + 100), maxY)
        });
      } else if (isResizing) {
        e.preventDefault();
        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;
        
        setChatSize(prev => {
          let newWidth = prev.width;
          let newHeight = prev.height;
          
          if (resizeDirection.includes('e')) newWidth = Math.max(280, prev.width + deltaX);
          if (resizeDirection.includes('w')) newWidth = Math.max(280, prev.width - deltaX);
          if (resizeDirection.includes('s')) newHeight = Math.max(400, prev.height + deltaY);
          if (resizeDirection.includes('n')) newHeight = Math.max(400, prev.height - deltaY);
          
          return { width: newWidth, height: newHeight };
        });
        
        if (resizeDirection.includes('w')) {
          setChatPosition(prev => ({ ...prev, x: prev.x + deltaX }));
        }
        if (resizeDirection.includes('n')) {
          setChatPosition(prev => ({ ...prev, y: prev.y + deltaY }));
        }
        
        dragStart.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, isResizing, resizeDirection, chatSize]);

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
    setLastActivity(Date.now()); // Aktivität aktualisieren

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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={openChat}
          className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
          size="icon"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
            <Crown className="h-4 w-4 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
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
        <Card className="w-80 bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-400 shadow-xl">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-900" />
              <span className="text-yellow-900 font-medium text-sm">GCZ-Agent</span>
              <Badge className="bg-green-500 text-white text-xs">Online</Badge>
            </div>
              <div className="flex gap-1">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={maximizeChat}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-yellow-900 hover:bg-yellow-400/50 rounded-full transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={closeChat}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-yellow-900 hover:bg-red-400/50 rounded-full transition-all"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
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
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
          }
        }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        className="fixed bottom-6 right-6 z-50"
        style={{
          width: `${chatSize.width}px`,
          height: `${chatSize.height}px`,
          transform: `translate(${chatPosition.x}px, ${chatPosition.y}px)`
        }}
      >
        <Card className="w-full h-full shadow-2xl border-2 border-gold bg-gradient-to-br from-background via-background to-background/95 backdrop-blur-xl overflow-hidden flex flex-col relative">
          {/* Header */}
          <div
            className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-3 py-2 border-b-2 border-yellow-400 cursor-grab active:cursor-grabbing flex-shrink-0"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Crown className="w-6 h-6 text-yellow-900 drop-shadow-lg" />
                  <Sparkles className="w-3 h-3 text-yellow-800 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base leading-none text-yellow-900 drop-shadow-md">
                    GCZ-Agent
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-yellow-800 font-medium leading-none">
                      {user ? `${user.name} - Online` : 'Online'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-1">
                <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={minimizeChat}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-yellow-900 hover:bg-yellow-400/60 rounded-full transition-all"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.15, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={closeChat}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-yellow-900 hover:bg-red-400/60 rounded-full transition-all"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-3 bg-gradient-to-b from-background/50 to-background" ref={scrollRef}>
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-lg relative text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white ml-6"
                        : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-foreground mr-6 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {msg.role === "user" && (
                      <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2">
                        <Zap className="w-3.5 h-3.5 text-yellow-400 drop-shadow-md" />
                      </div>
                    )}

                    {msg.role === "assistant" && (
                      <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2">
                        <Crown className="w-3.5 h-3.5 text-yellow-500 drop-shadow-md" />
                      </div>
                    )}

                    <p className="text-xs leading-relaxed whitespace-pre-line">{msg.content}</p>

                    <div className={`text-xs mt-1.5 ${
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
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl px-3 py-2 border border-slate-200 dark:border-slate-700 mr-6">
                      <div className="flex items-center gap-2">
                        <Crown className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce delay-75"></div>
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">tippt...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800 flex-shrink-0">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Nachricht..."
                  className="pl-3 pr-10 text-sm border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                  maxLength={200}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                  {input.length}/200
                </div>
              </div>
              <Button
                onClick={handleSend}
                disabled={isLoading || input.trim().length < 2}
                size="icon"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 h-9 w-9"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-1.5 text-xs text-yellow-700 dark:text-yellow-300 text-center">
              💡 Fragen Sie nach Templates & Preisen!
            </div>
          </div>

          {/* Resize Handles */}
          <div 
            className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-primary/30 transition-colors z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
          />
          <div 
            className="absolute top-0 left-0 w-1 h-full cursor-ew-resize hover:bg-primary/30 transition-colors z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-primary/30 transition-colors z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 's')}
          />
          <div 
            className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-primary/30 transition-colors z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
          />
          <div 
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize hover:bg-primary/30 transition-colors z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
          />
          <div 
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize hover:bg-primary/30 transition-colors z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
          />
          <div 
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize hover:bg-primary/30 transition-colors z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
          />
          <div 
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize hover:bg-primary/30 transition-colors z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
          />
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
