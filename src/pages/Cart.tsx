import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeItem, clearCart, total } = useCart();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-8 text-gradient-gold text-center">
            Warenkorb
          </h1>

          {items.length === 0 ? (
            <Card className="p-12 text-center border-primary/20">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-heading font-bold mb-2">Ihr Warenkorb ist leer</h2>
              <p className="text-muted-foreground mb-6">
                Fügen Sie Pakete oder Add-ons hinzu, um fortzufahren
              </p>
              <Link to="/preise">
                <Button className="bg-primary hover:bg-primary/90">
                  Zu den Preisen
                </Button>
              </Link>
            </Card>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="p-6 border-primary/20 hover-lift">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold mb-1">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          )}
                          <span className="inline-block mt-2 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                            {item.type === "package" ? "Paket" : "Add-on"}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-numeric font-bold text-gradient-gold">
                            €{item.price}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="mt-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Entfernen
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="p-8 border-gold animate-glow-pulse shadow-glow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-heading font-bold">Gesamtsumme</h3>
                  <p className="text-4xl font-numeric font-bold text-gradient-gold">
                    €{total}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1"
                  >
                    Warenkorb leeren
                  </Button>
                  <Link to="/kontakt" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 shadow-gold">
                      Zur Kasse
                    </Button>
                  </Link>
                </div>
              </Card>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
