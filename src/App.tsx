import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ContrastProvider } from "./contexts/ContrastContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { RateLimitProvider } from "./contexts/RateLimitContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { OrderProvider } from "./contexts/OrderContext";
import { Layout } from "./components/Layout";
import { ChatAssistant } from "./components/ChatAssistant";
import { CookieBanner } from "./components/CookieBanner";
import { usePWA } from "./hooks/usePWA";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import TemplateCategory from "./pages/TemplateCategory";
import TemplateDetail from "./pages/TemplateDetail";
import Preise from "./pages/Preise";
import Angebote from "./pages/Angebote";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGBs from "./pages/AGBs";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // PWA initialisieren
  usePWA();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <ContrastProvider>
          <AuthProvider>
            <RateLimitProvider>
              <PaymentProvider>
                <OrderProvider>
                  <CartProvider>
                    <TooltipProvider>
                      <Toaster />
                      <Sonner />
                      <BrowserRouter>
                        <Layout>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/templates" element={<Templates />} />
                            <Route path="/templates/:category" element={<TemplateCategory />} />
                            <Route path="/templates/:category/:template" element={<TemplateDetail />} />
                            <Route path="/preise" element={<Preise />} />
                            <Route path="/angebote" element={<Angebote />} />
                            <Route path="/kontakt" element={<Kontakt />} />
                            <Route path="/impressum" element={<Impressum />} />
                            <Route path="/datenschutz" element={<Datenschutz />} />
                            <Route path="/agbs" element={<AGBs />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Layout>
                        <ChatAssistant />
                        <CookieBanner />
                      </BrowserRouter>
                    </TooltipProvider>
                  </CartProvider>
                </OrderProvider>
              </PaymentProvider>
            </RateLimitProvider>
          </AuthProvider>
        </ContrastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
