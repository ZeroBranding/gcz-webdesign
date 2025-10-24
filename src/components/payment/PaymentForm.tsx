import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePayment } from "@/contexts/PaymentContext";
import { useOrder } from "@/contexts/OrderContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  CheckCircle,
  AlertCircle,
  Shield,
  Lock,
  Zap,
  Crown
} from "lucide-react";
import { toast } from "sonner";

interface PaymentFormProps {
  orderId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  orderId,
  amount,
  onSuccess,
  onCancel
}) => {
  const { paymentMethods, selectedMethod, setSelectedMethod, processPayment, calculateFees, isProcessing } = usePayment();
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });

  const totalAmount = amount + calculateFees(amount);

  const handlePayment = async () => {
    try {
      const success = await processPayment(orderId);
      if (success) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Zahlung fehlgeschlagen");
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-heading font-bold mb-4 text-gradient-gold">
          Zahlungsmethode wählen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  selectedMethod?.id === method.id
                    ? "border-gold bg-gold/5"
                    : "border-border hover:border-gold/50"
                }`}
                onClick={() => setSelectedMethod(method)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {method.description}
                      </div>
                    </div>
                    {selectedMethod?.id === method.id && (
                      <CheckCircle className="w-5 h-5 text-gold" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Card Details (for card payments) */}
      {selectedMethod?.type === "card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Kreditkarten-Daten
              </CardTitle>
              <CardDescription>
                Sichere SSL-verschlüsselte Übertragung
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Kartennummer</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails(prev => ({
                      ...prev,
                      number: formatCardNumber(e.target.value)
                    }))}
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Karteninhaber</Label>
                  <Input
                    id="cardName"
                    placeholder="Max Mustermann"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Ablaufdatum</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/JJ"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails(prev => ({
                      ...prev,
                      expiry: formatExpiry(e.target.value)
                    }))}
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails(prev => ({
                      ...prev,
                      cvc: e.target.value.replace(/\D/g, "").slice(0, 4)
                    }))}
                    maxLength={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-green-800 dark:text-green-200">
                100% Sichere Zahlung
              </div>
              <div className="text-sm text-green-600 dark:text-green-300">
                SSL-verschlüsselt • PCI DSS konform • Keine Speicherung von Kartendaten
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="border-gold/20">
        <CardHeader>
          <CardTitle className="text-gradient-gold">Bestellübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Bestellung #{orderId}</span>
              <span className="font-bold">€{amount}</span>
            </div>
            {calculateFees(amount) > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Gebühren ({selectedMethod?.name})</span>
                <span>€{calculateFees(amount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold text-gradient-gold">
              <span>Gesamt</span>
              <span>€{totalAmount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
        >
          {isProcessing ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              Verarbeitung...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              €{totalAmount} Bezahlen
            </>
          )}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
      </div>
    </div>
  );
};
