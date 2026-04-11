'use client';

import Link from 'next/link';
import { navigation } from './config.js';

type NavBarProps = {
  currentPath?: string;
};

export function NavBar({ currentPath }: NavBarProps) {
  return (
    <nav className="relative after:pointer-events-none after:absolute after:inset-x-0 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a
                href="#"
                aria-current="page"
                className="dark:text-white hover:text-cyan-200"
              >
                Kathleen Miller
              </a>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={currentPath === item.href ? 'page' : undefined}
                  className="dark:text-white hover:text-cyan-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
