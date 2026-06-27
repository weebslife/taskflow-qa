'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUseCase } from '@/core/usecases/AuthUseCase';
import { User } from '@/core/entities/User';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; user?: User; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authUseCase = new AuthUseCase();
    const { isAuthenticated: auth, user: currentUser } = authUseCase.checkAuth();
    setIsAuthenticated(auth);
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const authUseCase = new AuthUseCase();
    const result = authUseCase.login(email, password);
    if (result.success && result.user) {
      setIsAuthenticated(true);
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    const authUseCase = new AuthUseCase();
    authUseCase.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
