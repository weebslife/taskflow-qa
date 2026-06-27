'use client';

import React from 'react';
import Link from 'next/link';
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

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    const authUseCase = new AuthUseCase();
    authUseCase.logout();
    router.push('/login');
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'text-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
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
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500"
          aria-label="Logout"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5 h-5 text-gray-400" />
          Logout
        </button>
      </div>
    </nav>
  );
}
