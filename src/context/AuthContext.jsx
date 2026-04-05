import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const PLANS = {
  free: {
    id: 'free',
    label: 'Free',
    price: 0,
    billing: 'forever',
    color: 'text-slate-400',
    accent: 'rgba(148,163,184,0.15)',
    border: 'rgba(148,163,184,0.3)',
    features: [
      'Up to 3 bank accounts',
      'Basic transaction history (30 days)',
      'Monthly spending overview',
      'Standard support',
    ],
    limitations: [
      'No AI Assistant',
      'No portfolio tracking',
      'No advanced analytics',
    ],
  },
  pro: {
    id: 'pro',
    label: 'Pro',
    price: 12,
    billing: 'per month',
    color: 'text-accent-cyan',
    accent: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.35)',
    features: [
      'Unlimited bank accounts',
      'Full transaction history',
      'Advanced analytics & charts',
      'AI Financial Assistant',
      'Portfolio & investment tracking',
      'Goals & savings planner',
      'Priority support',
      'CSV / PDF export',
    ],
    limitations: [],
  },
};

const STORAGE_KEY = 'moneta-auth';

function loadAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveAuth(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const saved = loadAuth();
    return saved || {
      isAuthenticated: false,
      user: null,
      plan: 'free',
      screen: 'login',
    };
  });

  useEffect(() => {
    saveAuth(authState);
  }, [authState]);

  const login = (email, password) => {
    setAuthState(prev => ({
      ...prev,
      isAuthenticated: true,
      user: {
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email,
        initials: email.slice(0, 2).toUpperCase(),
      },
    }));
  };

  const signup = (name, email, password, plan) => {
    setAuthState(prev => ({
      ...prev,
      isAuthenticated: true,
      plan,
      user: { name, email, initials: name.slice(0, 2).toUpperCase() },
    }));
  };

  const logout = () => {
    const next = { isAuthenticated: false, user: null, plan: 'free', screen: 'login' };
    setAuthState(next);
    saveAuth(next);
  };

  const setScreen = (screen) => setAuthState(prev => ({ ...prev, screen }));
  const setPlan = (plan) => setAuthState(prev => ({ ...prev, plan }));

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, setScreen, setPlan }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
