import React from 'react';
import Link from 'next/link';

import fetchUser from '@/actions/fetchUser';

async function Navbar() {
  const user = await fetchUser();

  return (
    <nav className="px-24 pt-6 ">
      <ul className="flex items-center justify-evenly gap-3  py-2">
        <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
          <Link href="/">Home</Link>
        </li>
        <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
          <Link href="/subreddits">Subreddits</Link>
        </li>
        {!user?.id && (
          <>
            <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
              <Link href="/login">Login</Link>
            </li>
            <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
        {user?.id && (
          <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
            <Link href="/login">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
