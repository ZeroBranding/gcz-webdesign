import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("zdf_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("zdf_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("zdf_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-6 left-6 right-6 md:left-auto md:w-[400px] p-6 shadow-elegant z-50 border-primary/20">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={handleDecline}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <h3 className="font-heading font-bold text-lg mb-2">Cookie-Einstellungen</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Wir verwenden Cookies nur mit Ihrer Zustimmung, um die Nutzung unserer Website zu analysieren. 
        Ihre Daten werden nicht für Profiling oder KI-Training verwendet.
      </p>
      
      <div className="flex gap-2">
        <Button onClick={handleAccept} className="flex-1">
          Akzeptieren
        </Button>
        <Button onClick={handleDecline} variant="outline" className="flex-1">
          Ablehnen
        </Button>
      </div>
    </Card>
  );
};
