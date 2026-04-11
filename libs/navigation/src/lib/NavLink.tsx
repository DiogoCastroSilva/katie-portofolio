import Link from 'next/link';
import type { ComponentProps, PropsWithChildren } from 'react';

type NavLinkProps = PropsWithChildren<
  Omit<ComponentProps<typeof Link>, 'className'>
> & {
  className?: string;
};

export function NavLink({ children, className, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      className={
        className ??
        'rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white'
      }
    >
      {children}
    </Link>
  );
}
