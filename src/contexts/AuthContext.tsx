import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Lade User aus localStorage beim Start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Speichere User in localStorage
  const saveUser = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simuliere API-Aufruf (später echte API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock-Login - in Produktion echte API verwenden
      if (email && password) {
        const userData: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          role: 'customer',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        saveUser(userData);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock-Registrierung
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'customer',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      saveUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      // Simuliere Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: 'user@gmail.com',
        name: 'Google User',
        avatar: 'https://via.placeholder.com/40',
        role: 'customer',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      saveUser(userData);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithApple = async () => {
    setLoading(true);
    try {
      // Simuliere Apple OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: 'user@icloud.com',
        name: 'Apple User',
        role: 'customer',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      saveUser(userData);
    } catch (error) {
      console.error('Apple login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    loginWithGoogle,
    loginWithApple,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
