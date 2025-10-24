import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, LogIn } from "lucide-react";
import { LoginForm, RegisterForm } from "./AuthForms";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  children: React.ReactNode;
  defaultTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ children, defaultTab = 'login' }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const { user } = useAuth();

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleSwitchToRegister = () => {
    setActiveTab('register');
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Hallo, {user.name}</span>
        {children}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {activeTab === 'login' ? 'Anmelden' : 'Registrieren'}
          </DialogTitle>
          <DialogDescription>
            {activeTab === 'login'
              ? 'Melden Sie sich in Ihrem Konto an'
              : 'Erstellen Sie ein neues Konto'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {activeTab === 'login' ? (
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToRegister={handleSwitchToRegister}
            />
          ) : (
            <RegisterForm
              onSuccess={handleSuccess}
              onSwitchToLogin={handleSwitchToLogin}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const LoginButton: React.FC = () => {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">Hallo, {user.name}</span>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogIn className="w-4 h-4 mr-2" />
          Abmelden
        </Button>
      </div>
    );
  }

  return (
    <AuthModal defaultTab="login">
      <Button variant="outline" size="sm">
        <User className="w-4 h-4 mr-2" />
        Anmelden
      </Button>
    </AuthModal>
  );
};

export const RegisterButton: React.FC = () => {
  return (
    <AuthModal defaultTab="register">
      <Button size="sm">
        <User className="w-4 h-4 mr-2" />
        Registrieren
      </Button>
    </AuthModal>
  );
};
