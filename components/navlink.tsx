'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import getMessageError from '@/actions/getMessageError';

type NavLinkProps = {
  href: string;
  link: string;
  handleClick?: boolean;
};

function NavLink({ href, link, handleClick }: NavLinkProps) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
      });

      await res.json();

      router.refresh();
    } catch (error: unknown) {
      const errorMessage = getMessageError(error);
      console.log(errorMessage);
    }
  };
  return (
    <Link
      href={href}
      className="capitalize"
      onClick={handleClick ? handleLogout : undefined}
    >
      {link}
    </Link>
  );
}

export default NavLink;
