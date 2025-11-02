import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type NavLinkProps = PropsWithChildren<{
  href: string;
}>;

export function NavLink({ children, href }: NavLinkProps) {
  // const pathname = usePathname();

  return (
    <Link
      href={href}
      className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
    >
      {children}
    </Link>
  );
}
