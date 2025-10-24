import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Shield,
  CheckCircle,
  Star,
  Clock,
  Award,
  Crown
} from "lucide-react";

interface StripePaymentProps {
  amount: number;
  currency: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
}

export const StripePayment: React.FC<StripePaymentProps> = ({
  amount,
  currency,
  onSuccess,
  onError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStripePayment = async () => {
    setIsProcessing(true);

    try {
      // Mock Stripe Payment Intent
      const paymentIntent = {
        id: `pi_${Math.random().toString(36).substr(2, 9)}`,
        amount,
        currency,
        status: "succeeded",
        created: Date.now()
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      onSuccess(paymentIntent);
    } catch (error) {
      onError("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stripe Benefits */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-blue-800 dark:text-blue-200">
                Stripe Secure Payment
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-300">
                Weltweit vertrauenswürdig
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-blue-700 dark:text-blue-300">SSL-verschlüsselt</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-blue-700 dark:text-blue-300">PCI DSS konform</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-blue-700 dark:text-blue-300">Keine Datenspeicherung</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-blue-700 dark:text-blue-300">24/7 Support</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Amount */}
      <Card className="border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient-gold">
            <Crown className="w-5 h-5" />
            Zahlungsbetrag
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient-gold mb-2">
              €{amount}
            </div>
            <div className="text-sm text-muted-foreground">
              {currency.toUpperCase()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center border-green-200">
          <CardContent className="p-4">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-medium text-green-800 dark:text-green-200">
              Bank-Level Security
            </div>
            <div className="text-xs text-green-600 dark:text-green-300">
              256-bit SSL Encryption
            </div>
          </CardContent>
        </Card>

        <Card className="text-center border-blue-200">
          <CardContent className="p-4">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-medium text-blue-800 dark:text-blue-200">
              PCI DSS Compliant
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-300">
              Highest Security Standard
            </div>
          </CardContent>
        </Card>

        <Card className="text-center border-purple-200">
          <CardContent className="p-4">
            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-medium text-purple-800 dark:text-purple-200">
              Trusted Worldwide
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-300">
              Millions of Transactions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <Button
        onClick={handleStripePayment}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-6 text-lg"
      >
        {isProcessing ? (
          <>
            <Clock className="w-5 h-5 mr-2 animate-spin" />
            Verarbeitung...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            €{amount} mit Stripe bezahlen
          </>
        )}
      </Button>

      <div className="text-center text-xs text-muted-foreground">
        Durch Klick auf "Bezahlen" stimmen Sie unseren AGB zu
      </div>
    </div>
  );
};
