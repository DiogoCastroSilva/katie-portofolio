'use client';

import Link from 'next/link';
import { navigation } from '../feature/config.js';

type NavBarProps = {
  currentPath?: string;
  isMenuOpen: boolean;
};

export function MobileNavLinks({ currentPath, isMenuOpen }: NavBarProps) {
  return (
    <div
      className={`space-y-1 px-2 pt-2 pb-3 sm:px-3 ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
    >
      {navigation.map((item) => (
        <Link
          href={item.href}
          aria-current={currentPath === item.href ? 'page' : undefined}
          className="px-3 block py-2 text-base font-medium dark:text-white hover:text-cyan-200 hover:bg-white/5"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
