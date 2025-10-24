import React, { createContext, useContext, useState } from "react";

// Rate Limiting Hook für Authentifizierung
interface RateLimitState {
  attempts: number;
  lastAttempt: number;
  isBlocked: boolean;
  blockUntil: number;
}

interface RateLimitContextType {
  checkRateLimit: (action: string) => boolean;
  recordAttempt: (action: string) => void;
  getRemainingTime: (action: string) => number;
  resetRateLimit: (action: string) => void;
}

const RateLimitContext = createContext<RateLimitContextType | undefined>(undefined);

const RATE_LIMITS = {
  login: { maxAttempts: 5, windowMs: 15 * 60 * 1000, blockDurationMs: 30 * 60 * 1000 }, // 5 Versuche, 15min Window, 30min Block
  register: { maxAttempts: 3, windowMs: 60 * 60 * 1000, blockDurationMs: 60 * 60 * 1000 }, // 3 Versuche, 1h Window, 1h Block
  passwordReset: { maxAttempts: 3, windowMs: 60 * 60 * 1000, blockDurationMs: 24 * 60 * 60 * 1000 }, // 3 Versuche, 1h Window, 24h Block
};

export const RateLimitProvider = ({ children }: { children: React.ReactNode }) => {
  const [rateLimits, setRateLimits] = useState<Record<string, RateLimitState>>({});

  const checkRateLimit = (action: string): boolean => {
    const limit = RATE_LIMITS[action as keyof typeof RATE_LIMITS];
    if (!limit) return true;

    const now = Date.now();
    const state = rateLimits[action];

    if (!state) return true;

    // Check if still blocked
    if (state.isBlocked && now < state.blockUntil) {
      return false;
    }

    // Check if window expired
    if (now - state.lastAttempt > limit.windowMs) {
      setRateLimits(prev => ({
        ...prev,
        [action]: { attempts: 0, lastAttempt: 0, isBlocked: false, blockUntil: 0 }
      }));
      return true;
    }

    return state.attempts < limit.maxAttempts;
  };

  const recordAttempt = (action: string) => {
    const limit = RATE_LIMITS[action as keyof typeof RATE_LIMITS];
    if (!limit) return;

    const now = Date.now();
    const state = rateLimits[action] || { attempts: 0, lastAttempt: 0, isBlocked: false, blockUntil: 0 };

    const newState = { ...state, attempts: state.attempts + 1, lastAttempt: now };

    // Check if should be blocked
    if (newState.attempts >= limit.maxAttempts) {
      newState.isBlocked = true;
      newState.blockUntil = now + limit.blockDurationMs;
    }

    setRateLimits(prev => ({ ...prev, [action]: newState }));

    // Auto cleanup after block duration
    if (newState.isBlocked) {
      setTimeout(() => {
        setRateLimits(prev => ({
          ...prev,
          [action]: { attempts: 0, lastAttempt: 0, isBlocked: false, blockUntil: 0 }
        }));
      }, limit.blockDurationMs);
    }
  };

  const getRemainingTime = (action: string): number => {
    const state = rateLimits[action];
    if (!state?.isBlocked) return 0;

    const now = Date.now();
    return Math.max(0, state.blockUntil - now);
  };

  const resetRateLimit = (action: string) => {
    setRateLimits(prev => ({
      ...prev,
      [action]: { attempts: 0, lastAttempt: 0, isBlocked: false, blockUntil: 0 }
    }));
  };

  return (
    <RateLimitContext.Provider value={{ checkRateLimit, recordAttempt, getRemainingTime, resetRateLimit }}>
      {children}
    </RateLimitContext.Provider>
  );
};

export const useRateLimit = () => {
  const context = useContext(RateLimitContext);
  if (!context) {
    throw new Error("useRateLimit must be used within RateLimitProvider");
  }
  return context;
};
