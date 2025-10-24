import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export const ChatAssistant = () => {
  // Chat ist direkt geöffnet
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Willkommen bei German Code Zero! Ich bin Ihr GCZ-Agent und helfe Ihnen gerne bei allen Fragen zu Templates, Preisen und Projekten. Wie kann ich Ihnen behilflich sein?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gcz_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;

        // Filter messages older than 30 days
        const filtered = parsed.filter(
          (msg: Message) => now - msg.timestamp < thirtyDays
        );
        setMessages(prev => [...prev.slice(0, 1), ...filtered]); // Behalte Welcome-Nachricht

        if (filtered.length !== parsed.length) {
          localStorage.setItem("gcz_chat", JSON.stringify(filtered));
        }
      } catch (e) {
        console.error("Failed to load chat history", e);
      }
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 1) { // Spare Welcome-Nachricht
      localStorage.setItem("gcz_chat", JSON.stringify(messages.slice(1)));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

    // Intent-based responses
    const response = getIntentResponse(input.toLowerCase());

    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const getIntentResponse = (input: string): string => {
    if (input.includes("preis") || input.includes("kosten") || input.includes("package")) {
      return "🤑 Unsere Premium-Pakete starten bei €49 für Basic-Templates bis €1299 für Enterprise-Lösungen. Jedes Paket ist ein absolutes Schnäppchen mit bis zu 94% Rabatt! Schauen Sie sich unsere Preisseite für alle Details an.";
    }
    if (input.includes("dauer") || input.includes("zeit") || input.includes("lange")) {
      return "⏱️ Die Umsetzungsdauer hängt vom gewählten Paket ab:\n• Basic: 1-2 Tage\n• Professional: 3-5 Tage\n• Premium: 1-2 Wochen\n• Enterprise: 2-4 Wochen\n\nAlle Templates sind sofort einsatzbereit!";
    }
    if (input.includes("template") || input.includes("vorlage") || input.includes("design")) {
      return "🎨 Wir haben über 36 Templates für 9 Branchen:\n• 🛒 E-Commerce\n• 🍽️ Gastronomie\n• 🏠 Immobilien\n• 💼 Portfolio\n• 🏛️ Corporate\n• 🚀 Startup\n• 🔧 Handwerk\n• 💄 Beauty\n• 🩺 Health\n• 🎯 Coaching\n\nAlle mit 4 Service-Levels!";
    }
    if (input.includes("kontakt") || input.includes("anfrage") || input.includes("beratung")) {
      return "📞 Gerne helfe ich Ihnen weiter! Nutzen Sie unser Kontaktformular oder schreiben Sie uns direkt an liyana240425@gmail.com. Für dringende Anfragen rufen Sie uns an!";
    }
    if (input.includes("dsgvo") || input.includes("datenschutz") || input.includes("sicher")) {
      return "🔒 Sicherheit hat höchste Priorität! Alle Websites sind:\n• ✅ DSGVO-konform\n• ✅ SSL-verschlüsselt\n• ✅ Sicher gehostet\n• ✅ Backup & Recovery\n• ✅ 99.9% Uptime Garantie\n\nIhre Daten sind bei uns sicher!";
    }
    if (input.includes("garantie") || input.includes("rückgabe") || input.includes("widerruf")) {
      return "🛡️ Bei Downloads gibt es kein Widerrufsrecht nach §312g BGB (digitale Inhalte). Bei Hosting-Services bieten wir eine freiwillige Zufriedenheitsgarantie. Alle Details finden Sie in unseren AGB.";
    }
    if (input.includes("zahlung") || input.includes("bezahl") || input.includes("rechnung")) {
      return "💳 Wir akzeptieren:\n• 💳 Kreditkarte\n• 🏦 Banküberweisung\n• 💰 PayPal\n• 📱 Apple Pay / Google Pay\n\nSichere Zahlungsabwicklung mit SSL-Verschlüsselung. Rechnung nach Zahlungseingang.";
    }
    if (input.includes("gcz") || input.includes("agent") || input.includes("hilfe")) {
      return "🤖 Ich bin der GCZ-Agent, Ihr persönlicher Assistent bei German Code Zero! Ich helfe bei:\n• Template-Auswahl\n• Preisinformationen\n• Technischen Fragen\n• Bestellprozessen\n• Support-Anfragen\n\nFragen Sie mich einfach!";
    }

    return "✨ Ich helfe Ihnen gerne weiter! Als GCZ-Agent kann ich Ihnen bei Templates, Preisen, Projektdauer, Sicherheit und allen anderen Fragen rund um German Code Zero helfen. Was möchten Sie wissen?";
  };

  return (
    <AnimatePresence>
      {/* GCZ-Agent Chat Window - Direkt geöffnet */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 2 // Erscheint nach 2 Sekunden
          }
        }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Card className="w-96 h-[600px] shadow-2xl border-2 border-gold bg-gradient-to-br from-background via-background to-background/95 backdrop-blur-xl overflow-hidden">
          {/* Gold Header */}
          <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-4 border-b-2 border-yellow-400">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="relative flex items-center gap-3">
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
                  <p className="text-xs text-yellow-800 font-medium">Online & Bereit</p>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-yellow-900 hover:bg-yellow-300/50 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
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
                    {/* Gold Accent für User Messages */}
                    {msg.role === "user" && (
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                        <Zap className="w-4 h-4 text-yellow-400 drop-shadow-md" />
                      </div>
                    )}

                    {/* Crown Icon für Agent Messages */}
                    {msg.role === "assistant" && (
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                        <Crown className="w-4 h-4 text-yellow-500 drop-shadow-md" />
                      </div>
                    )}

                    <p className="text-sm leading-relaxed">{msg.content}</p>

                    {/* Timestamp */}
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

            {/* Help Text */}
            <div className="mt-2 text-xs text-yellow-700 dark:text-yellow-300 text-center">
              💡 Fragen Sie mich nach Templates, Preisen oder Hilfe!
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Floating Re-Open Button (nur wenn geschlossen) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            size="icon"
          >
            <div className="relative">
              <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
              <Crown className="h-4 w-4 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
