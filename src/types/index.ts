// TypeScript Interface-Definitionen für die Template-Plattform

export interface TemplateData {
  id: string;
  name: string;
  originalPrice: number;
  price: number;
  discount: number;
  level: 'basic' | 'professional' | 'premium' | 'enterprise';
  image: string;
  description: string;
  features: string[];
  tech: string[];
  category: string;
}

export interface CategoryData {
  name: string;
  emoji: string;
  templates: Record<string, TemplateData>;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'package' | 'addon';
  description?: string;
  image?: string;
  category?: string;
  quantity?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: string;
  lastLogin?: string;
}

export interface Order {
  id: string;
  userId: string;
  templateId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  depositAmount: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  depositPaid: boolean;
  finalPaymentPaid: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export interface OrderContextType {
  orders: Order[];
  createOrder: (templateId: string, depositAmount: number) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  payDeposit: (orderId: string) => Promise<void>;
  payFinal: (orderId: string) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  loading: boolean;
}

export type PurchaseOption = {
  type: 'download' | 'hosting';
  price: number;
  hasMoneyBackGuarantee: boolean;
  licenseTerms: string;
};

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
