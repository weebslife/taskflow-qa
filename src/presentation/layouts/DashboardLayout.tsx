'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/presentation/components/Sidebar';
import BottomNav from '@/presentation/components/BottomNav';
import { useAuthContext } from '@/presentation/layouts/AuthProvider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* BUG #9: Logout bug - Back button still shows dashboard
           After logout, clicking browser back button will still show the dashboard
           because we allow rendering when isAuthenticated changes but the browser
           caches the page state. This is intentional. */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-0 pb-20 md:pb-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
