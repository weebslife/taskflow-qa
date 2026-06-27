'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '@/presentation/components/Button';
import Input from '@/presentation/components/Input';
import { useAuthContext } from '@/presentation/layouts/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = login(email, password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  const handleDemoLogin = async () => {
    setEmail('qauser@mail.com');
    setPassword('password123');
    setError('');

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = login('qauser@mail.com', 'password123');
    if (result.success) {
      router.push('/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-cream-50 to-teal-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 overflow-hidden mx-auto">
            <Image
              src="/qa-icon.webp"
              alt="TaskFlow QA Logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">TaskFlow QA Playground</h1>
          <p className="text-gray-500 mt-1">Sign in to manage your tasks</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {error && (
            <div
              className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-700"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="qauser@mail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  error={emailError}
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                      passwordError
                        ? 'border-rose-400 focus:ring-rose-500'
                        : 'border-gray-300 focus:ring-teal-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-colors bg-white text-gray-900 placeholder-gray-400`}
                    autoComplete="current-password"
                    aria-invalid={passwordError ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="w-4 h-4 text-gray-400 hover:text-gray-600"
                    />
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1 text-sm text-rose-600" role="alert">
                    {passwordError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                Sign In
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full"
                onClick={handleDemoLogin}
              >
                Login as Demo User
              </Button>
            </div>
          </div>

          {/* Dummy credentials hint */}
          <div className="mt-6 p-4 bg-cream-100 rounded-lg border border-cream-200">
            <p className="text-xs font-medium text-gray-700 mb-1">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Email: qauser@mail.com</p>
            <p className="text-xs text-gray-500">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
