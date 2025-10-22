import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("zdf_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        
        // Filter messages older than 30 days
        const filtered = parsed.filter(
          (msg: Message) => now - msg.timestamp < thirtyDays
        );
        setMessages(filtered);
        
        if (filtered.length !== parsed.length) {
          localStorage.setItem("zdf_chat", JSON.stringify(filtered));
        }
      } catch (e) {
        console.error("Failed to load chat history", e);
      }
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("zdf_chat", JSON.stringify(messages));
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

    // TODO: Integrate with Lovable Cloud AI
    // For now, simple intent-based responses
    const response = getIntentResponse(input.toLowerCase());
    
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  const getIntentResponse = (input: string): string => {
    if (input.includes("preis") || input.includes("kosten") || input.includes("package")) {
      return "Unsere Pakete starten bei €49 für einen Onepager. Schauen Sie sich unsere Preisseite an für alle Details!";
    }
    if (input.includes("dauer") || input.includes("zeit") || input.includes("lange")) {
      return "Die Umsetzungsdauer hängt vom gewählten Paket ab. Ein Onepager ist in wenigen Tagen fertig, Business-Pakete benötigen 1-2 Wochen.";
    }
    if (input.includes("template") || input.includes("vorlage") || input.includes("design")) {
      return "Wir haben Templates für verschiedene Branchen: E-Commerce, Gastronomie, Immobilien, Portfolio und mehr. Schauen Sie sich unsere Template-Galerie an!";
    }
    if (input.includes("kontakt") || input.includes("anfrage") || input.includes("beratung")) {
      return "Gerne! Nutzen Sie unser Kontaktformular oder schreiben Sie uns direkt an liyana240425@gmail.com";
    }
    if (input.includes("dsgvo") || input.includes("datenschutz") || input.includes("sicher")) {
      return "Alle unsere Websites sind DSGVO-konform und erfüllen höchste Sicherheitsstandards. SSL-Verschlüsselung ist selbstverständlich.";
    }
    
    return "Ich helfe Ihnen gerne weiter! Sie können mich nach Preisen, Templates, Projektdauer oder anderen Fragen rund um Webdesign fragen.";
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow z-50 hover-lift"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-elegant z-50 flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-heading font-bold text-lg">Assistent GCZ</h3>
            <p className="text-xs text-muted-foreground">Ich helfe Ihnen gerne weiter</p>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  Stellen Sie mir eine Frage zu Preisen, Templates oder Ihrer Website!
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ihre Frage..."
              className="flex-1"
              maxLength={200}
            />
            <Button onClick={handleSend} size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};
