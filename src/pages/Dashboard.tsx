import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useOrder } from "@/contexts/OrderContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  Euro,
  Crown,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { orders, getOrdersByCustomer, payDeposit, payFinal } = useOrder();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Bitte anmelden</CardTitle>
            <CardDescription>
              Melden Sie sich an, um Ihr Dashboard zu sehen
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/login">
              <Button>Zum Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userOrders = getOrdersByCustomer(user.id);
  const activeOrders = userOrders.filter(order =>
    !["completed", "cancelled"].includes(order.status)
  );
  const completedOrders = userOrders.filter(order => order.status === "completed");

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-500",
      deposit_paid: "bg-blue-500",
      in_progress: "bg-purple-500",
      review: "bg-orange-500",
      final_payment_due: "bg-red-500",
      completed: "bg-green-500",
      cancelled: "bg-gray-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: "Ausstehend",
      deposit_paid: "Anzahlung bezahlt",
      in_progress: "In Bearbeitung",
      review: "Review",
      final_payment_due: "Abschlusszahlung",
      completed: "Abgeschlossen",
      cancelled: "Storniert"
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-yellow-900" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-gradient-gold">
              Willkommen zurück, {user.name}!
            </h1>
            <p className="text-muted-foreground">
              Verwalten Sie Ihre Bestellungen und Downloads
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-gold/20 hover:border-gold/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Bestellungen</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient-gold">{activeOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                In Bearbeitung
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-gold/20 hover:border-gold/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abgeschlossene Projekte</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient-gold">{completedOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Bereit zum Download
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-gold/20 hover:border-gold/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesamt investiert</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient-gold">
                €{userOrders.reduce((sum, order) =>
                  sum + (order.finalPaymentPaid ? order.finalPayment : 0), 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                In Premium-Websites
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-heading font-bold mb-6 text-gradient-gold">
            Aktive Bestellungen
          </h2>
          <div className="grid gap-6">
            {activeOrders.map((order) => (
              <Card key={order.id} className="border-gold/20 hover:border-gold/40 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {order.templateName}
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {order.category} • {order.serviceLevel} Level
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient-gold">
                        €{order.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        statt €{order.originalPrice}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Steps */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {order.depositPaid ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                        <span className="text-sm">Anzahlung</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.status === "in_progress" ? (
                          <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
                        ) : (
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="text-sm">Entwicklung</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.finalPaymentPaid ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="text-sm">Abschluss</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {!order.depositPaid && (
                        <Button
                          onClick={() => payDeposit(order.id)}
                          className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Anzahlung bezahlen (€{order.deposit})
                        </Button>
                      )}

                      {order.depositPaid && !order.finalPaymentPaid && order.status === "final_payment_due" && (
                        <Button
                          onClick={() => payFinal(order.id)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Abschlusszahlung (€{order.finalPayment})
                        </Button>
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Erstellt:</span>
                        <div className="text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('de-DE')}
                        </div>
                      </div>
                      {order.deliveryDate && (
                        <div>
                          <span className="font-medium">Lieferung:</span>
                          <div className="text-muted-foreground">
                            {new Date(order.deliveryDate).toLocaleDateString('de-DE')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Completed Orders */}
      {completedOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-heading font-bold mb-6 text-gradient-gold">
            Abgeschlossene Projekte
          </h2>
          <div className="grid gap-6">
            {completedOrders.map((order) => (
              <Card key={order.id} className="border-green-200 hover:border-green-300 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {order.templateName}
                        <Badge className="bg-green-500 text-white">
                          Abgeschlossen
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {order.category} • {order.serviceLevel} Level
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient-gold">
                        €{order.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        statt €{order.originalPrice}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Download Section */}
                    <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Download className="w-8 h-8 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800 dark:text-green-200">
                          Website bereit zum Download
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Alle Dateien sind verfügbar
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                          <a href={order.downloadUrl} download>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={order.invoiceUrl} target="_blank">
                            <FileText className="w-4 h-4 mr-2" />
                            Rechnung
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-medium mb-2">Inkludierte Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {order.features.map((feature, index) => (
                          <Badge key={index} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="font-medium mb-2">Technologie-Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {order.tech.map((tech, index) => (
                          <Badge key={index} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Order Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Abgeschlossen:</span>
                        <div className="text-muted-foreground">
                          {new Date(order.updatedAt).toLocaleDateString('de-DE')}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Bestell-Nr:</span>
                        <div className="text-muted-foreground font-mono">
                          #{order.id}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {userOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-12 h-12 text-yellow-900" />
          </div>
          <h3 className="text-xl font-heading font-bold mb-2 text-gradient-gold">
            Noch keine Bestellungen
          </h3>
          <p className="text-muted-foreground mb-6">
            Entdecken Sie unsere Premium-Templates und starten Sie Ihr nächstes Projekt
          </p>
          <Link to="/templates">
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
              Templates entdecken
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
