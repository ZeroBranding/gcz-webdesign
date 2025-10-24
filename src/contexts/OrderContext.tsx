import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export interface Order {
  id: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  templateId: string;
  templateName: string;
  category: string;
  serviceLevel: string;
  status: OrderStatus;
  price: number;
  originalPrice: number;
  discount: number;
  deposit: number;
  depositPaid: boolean;
  finalPayment: number;
  finalPaymentPaid: boolean;
  features: string[];
  tech: string[];
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
  downloadUrl?: string;
  invoiceUrl?: string;
}

export type OrderStatus =
  | "pending"
  | "deposit_paid"
  | "in_progress"
  | "review"
  | "final_payment_due"
  | "completed"
  | "cancelled";

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  payDeposit: (orderId: string) => Promise<boolean>;
  payFinal: (orderId: string) => Promise<boolean>;
  getOrdersByCustomer: (customerId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    if (!user) {
      toast.error("Bitte melden Sie sich an, um eine Bestellung aufzugeben");
      throw new Error("User not authenticated");
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerId: user.id,
      customerEmail: user.email,
      customerName: user.name,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deposit: orderData.price ? orderData.price * 0.3 : 0, // 30% Anzahlung
      depositPaid: false,
      finalPayment: orderData.price || 0,
      finalPaymentPaid: false,
      ...orderData
    } as Order;

    setOrders(prev => [...prev, newOrder]);
    setCurrentOrder(newOrder);

    // Save to localStorage
    const savedOrders = localStorage.getItem("gcz_orders");
    const ordersArray = savedOrders ? JSON.parse(savedOrders) : [];
    ordersArray.push(newOrder);
    localStorage.setItem("gcz_orders", JSON.stringify(ordersArray));

    toast.success("Bestellung erfolgreich erstellt!");
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));

    // Update localStorage
    const savedOrders = localStorage.getItem("gcz_orders");
    if (savedOrders) {
      const ordersArray = JSON.parse(savedOrders);
      const updatedOrders = ordersArray.map((order: Order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      );
      localStorage.setItem("gcz_orders", JSON.stringify(updatedOrders));
    }

    toast.success(`Bestellung #${orderId} Status: ${getStatusLabel(status)}`);
  };

  const payDeposit = async (orderId: string): Promise<boolean> => {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      toast.error("Bestellung nicht gefunden");
      return false;
    }

    try {
      // Payment processing (Mock)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setOrders(prev => prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              depositPaid: true,
              status: "deposit_paid" as OrderStatus,
              updatedAt: new Date().toISOString()
            }
          : o
      ));

      toast.success("Anzahlung erfolgreich bezahlt!");
      return true;
    } catch (error) {
      toast.error("Anzahlung fehlgeschlagen");
      return false;
    }
  };

  const payFinal = async (orderId: string): Promise<boolean> => {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      toast.error("Bestellung nicht gefunden");
      return false;
    }

    try {
      // Payment processing (Mock)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setOrders(prev => prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              finalPaymentPaid: true,
              status: "completed" as OrderStatus,
              updatedAt: new Date().toISOString(),
              downloadUrl: `/downloads/${order.templateId}.zip`,
              invoiceUrl: `/invoices/${order.id}.pdf`
            }
          : o
      ));

      toast.success("Website erfolgreich bezahlt und bereit zum Download!");
      return true;
    } catch (error) {
      toast.error("Zahlung fehlgeschlagen");
      return false;
    }
  };

  const getOrdersByCustomer = (customerId: string): Order[] => {
    return orders.filter(order => order.customerId === customerId);
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const labels = {
      pending: "Ausstehend",
      deposit_paid: "Anzahlung bezahlt",
      in_progress: "In Bearbeitung",
      review: "Review",
      final_payment_due: "Abschlusszahlung fällig",
      completed: "Abgeschlossen",
      cancelled: "Storniert"
    };
    return labels[status];
  };

  // Load orders from localStorage on mount
  React.useEffect(() => {
    const savedOrders = localStorage.getItem("gcz_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    }
  }, []);

  const value: OrderContextType = {
    orders,
    currentOrder,
    createOrder,
    updateOrderStatus,
    payDeposit,
    payFinal,
    getOrdersByCustomer,
    getOrderById
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
