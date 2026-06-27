import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/presentation/layouts/AuthProvider';
import { StoreInitializer } from '@/presentation/components/StoreInitializer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TaskFlow QA Playground',
  description: 'A task management application for QA Manual testing practice and portfolio building.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full bg-cream-50 text-gray-900">
        <StoreInitializer />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
