'use client';

import { useState, useEffect } from 'react';
import { AuthUseCase } from '@/core/usecases/AuthUseCase';
import { User } from '@/core/entities/User';

export function useAuth() {
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

  return { isAuthenticated, user, isLoading, login, logout };
}
