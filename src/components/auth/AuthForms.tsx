import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, Mail, Lock, User, Chrome, Apple } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRateLimit } from "@/contexts/RateLimitContext";

// Input Validation Utilities
const validateEmail = (email: string): string | null => {
  if (!email) return "E-Mail-Adresse ist erforderlich";
  if (email.length > 254) return "E-Mail-Adresse ist zu lang";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Ungültige E-Mail-Adresse";
  if (email.includes('..')) return "E-Mail-Adresse enthält doppelte Punkte";
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return "Passwort ist erforderlich";
  if (password.length < 8) return "Passwort muss mindestens 8 Zeichen lang sein";
  if (password.length > 128) return "Passwort ist zu lang";
  if (!/(?=.*[a-z])/.test(password)) return "Passwort muss mindestens einen Kleinbuchstaben enthalten";
  if (!/(?=.*[A-Z])/.test(password)) return "Passwort muss mindestens einen Großbuchstaben enthalten";
  if (!/(?=.*\d)/.test(password)) return "Passwort muss mindestens eine Zahl enthalten";
  if (!/(?=.*[@$!%*?&])/.test(password)) return "Passwort muss mindestens ein Sonderzeichen enthalten";
  return null;
};

const validateName = (name: string): string | null => {
  if (!name) return "Name ist erforderlich";
  if (name.length < 2) return "Name muss mindestens 2 Zeichen lang sein";
  if (name.length > 50) return "Name ist zu lang";
  if (!/^[a-zA-ZäöüÄÖÜß\s-]+$/.test(name)) return "Name enthält ungültige Zeichen";
  if (name.trim() !== name) return "Name darf keine führenden oder nachfolgenden Leerzeichen enthalten";
  return null;
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>"&]/g, '');
};

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const { login, loginWithGoogle, loginWithApple, loading } = useAuth();
  const { checkRateLimit, recordAttempt, getRemainingTime } = useRateLimit();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Rate limiting check
    if (!checkRateLimit('login')) {
      const remainingTime = getRemainingTime('login');
      const minutes = Math.ceil(remainingTime / 60000);
      setError(`Zu viele Login-Versuche. Bitte versuchen Sie es in ${minutes} Minuten erneut.`);
      return;
    }

    // Input sanitization
    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

    // Client-side validation
    const emailError = validateEmail(cleanEmail);
    if (emailError) {
      setError(emailError);
      recordAttempt('login');
      return;
    }

    const passwordError = validatePassword(cleanPassword);
    if (passwordError) {
      setError(passwordError);
      recordAttempt('login');
      return;
    }

    try {
      await login(cleanEmail, cleanPassword);
      onSuccess?.();
    } catch (error) {
      setError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.");
      recordAttempt('login');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onSuccess?.();
    } catch (error) {
      setError("Google-Login fehlgeschlagen.");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await loginWithApple();
      onSuccess?.();
    } catch (error) {
      setError("Apple-Login fehlgeschlagen.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-heading">Anmelden</CardTitle>
        <CardDescription>
          Melden Sie sich in Ihrem Konto an, um fortzufahren
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="ihre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ihr Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Anmelden...
              </>
            ) : (
              "Anmelden"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Oder fortfahren mit</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleGoogleLogin} disabled={loading}>
            <Chrome className="w-4 h-4 mr-2" />
            Google
          </Button>
          <Button variant="outline" onClick={handleAppleLogin} disabled={loading}>
            <Apple className="w-4 h-4 mr-2" />
            Apple
          </Button>
        </div>

        {onSwitchToRegister && (
          <div className="text-center">
            <Button variant="link" onClick={onSwitchToRegister}>
              Noch kein Konto? Registrieren
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const { register, loading } = useAuth();
  const { checkRateLimit, recordAttempt, getRemainingTime } = useRateLimit();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Rate limiting check
    if (!checkRateLimit('register')) {
      const remainingTime = getRemainingTime('register');
      const minutes = Math.ceil(remainingTime / 60000);
      setError(`Zu viele Registrierungsversuche. Bitte versuchen Sie es in ${minutes} Minuten erneut.`);
      return;
    }

    // Input sanitization
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);
    const cleanConfirmPassword = sanitizeInput(confirmPassword);

    // Client-side validation
    const nameError = validateName(cleanName);
    if (nameError) {
      setError(nameError);
      recordAttempt('register');
      return;
    }

    const emailError = validateEmail(cleanEmail);
    if (emailError) {
      setError(emailError);
      recordAttempt('register');
      return;
    }

    const passwordError = validatePassword(cleanPassword);
    if (passwordError) {
      setError(passwordError);
      recordAttempt('register');
      return;
    }

    if (cleanPassword !== cleanConfirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      recordAttempt('register');
      return;
    }

    if (!acceptTerms) {
      setError("Bitte akzeptieren Sie die AGB und Datenschutzbestimmungen.");
      return;
    }

    try {
      await register(cleanEmail, cleanPassword, cleanName);
      onSuccess?.();
    } catch (error) {
      setError("Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
      recordAttempt('register');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-heading">Registrieren</CardTitle>
        <CardDescription>
          Erstellen Sie ein Konto, um Templates zu kaufen und zu verwalten
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="name"
                type="text"
                placeholder="Ihr vollständiger Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="ihre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mindestens 8 Zeichen"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Passwort wiederholen"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="rounded focus:ring-primary focus:ring-2"
              required
              aria-describedby="terms-description"
              aria-label="AGB und Datenschutzbestimmungen akzeptieren"
            />
            <Label htmlFor="terms" className="text-sm">
              Ich akzeptiere die{" "}
              <a href="/agbs" className="text-primary hover:underline">
                AGB
              </a>{" "}
              und{" "}
              <a href="/datenschutz" className="text-primary hover:underline">
                Datenschutzbestimmungen
              </a>
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registrieren...
              </>
            ) : (
              "Konto erstellen"
            )}
          </Button>
        </form>

        {onSwitchToLogin && (
          <div className="text-center">
            <Button variant="link" onClick={onSwitchToLogin}>
              Bereits ein Konto? Anmelden
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
