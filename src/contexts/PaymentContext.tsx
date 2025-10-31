import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export interface PaymentMethod {
  id: string;
  name: string;
  type: "card" | "paypal" | "apple" | "google";
  icon: string;
  description: string;
  fees: number;
}

export interface OrderData {
  templateId: string;
  templateName: string;
  category: string;
  serviceLevel: string;
  price: number;
  originalPrice: number;
  discount: number;
  customerEmail: string;
  customerName: string;
  features: string[];
  tech: string[];
}

interface PaymentContextType {
  paymentMethods: PaymentMethod[];
  selectedMethod: PaymentMethod | null;
  orderData: OrderData | null;
  isProcessing: boolean;
  setSelectedMethod: (method: PaymentMethod) => void;
  setOrderData: (data: OrderData) => void;
  processPayment: (orderId: string) => Promise<boolean>;
  calculateFees: (amount: number) => number;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within PaymentProvider");
  }
  return context;
};

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: "stripe",
      name: "Kreditkarte",
      type: "card",
      icon: "💳",
      description: "Visa, Mastercard, American Express",
      fees: 0
    },
    {
      id: "paypal",
      name: "PayPal",
      type: "paypal",
      icon: "💰",
      description: "Schnell und sicher über PayPal",
      fees: 2.9
    },
    {
      id: "apple",
      name: "Apple Pay",
      type: "apple",
      icon: "📱",
      description: "Touch ID oder Face ID",
      fees: 0
    },
    {
      id: "google",
      name: "Google Pay",
      type: "google",
      icon: "🔍",
      description: "Schnelle Zahlung über Google",
      fees: 0
    }
  ];

  const calculateFees = (amount: number): number => {
    if (!selectedMethod) return 0;
    return (amount * selectedMethod.fees) / 100;
  };

  const processPayment = async (_orderId: string): Promise<boolean> => {
    if (!selectedMethod || !orderData) {
      toast.error("Bitte wählen Sie eine Zahlungsmethode aus");
      return false;
    }

    setIsProcessing(true);

    try {
      // Stripe Payment Intent erstellen (Mock)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // PayPal Integration (Mock)
      if (selectedMethod.type === "paypal") {
        // Hier würde echte PayPal API-Integration kommen
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Apple Pay Integration (Mock)
      if (selectedMethod.type === "apple") {
        // Hier würde echte Apple Pay API-Integration kommen
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Google Pay Integration (Mock)
      if (selectedMethod.type === "google") {
        // Hier würde echte Google Pay API-Integration kommen
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      toast.success("Zahlung erfolgreich verarbeitet!");
      return true;

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const value: PaymentContextType = {
    paymentMethods,
    selectedMethod,
    orderData,
    isProcessing,
    setSelectedMethod,
    setOrderData,
    processPayment,
    calculateFees
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};
