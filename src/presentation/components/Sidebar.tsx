'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGauge,
  faListCheck,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthUseCase } from '@/core/usecases/AuthUseCase';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: faGauge },
  { href: '/dashboard/tasks', label: 'Tasks', icon: faListCheck },
  { href: '/profile', label: 'Profile', icon: faUser },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    const authUseCase = new AuthUseCase();
    authUseCase.logout();
    router.push('/login');
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src="/qa-icon.webp"
            alt="TaskFlow QA Logo"
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">TaskFlow</h1>
          <p className="text-xs text-gray-500">QA Playground</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Sidebar navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-gray-400'}`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
          aria-label="Logout"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5 h-5 text-gray-400" />
          Logout
        </button>
      </div>
    </aside>
  );
}
