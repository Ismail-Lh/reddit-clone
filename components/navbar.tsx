import React from 'react';

import fetchUser from '@/actions/fetchUser';
import NavLink from './navlink';

async function Navbar() {
  const user = await fetchUser();

  return (
    <nav className="px-24 pt-6 ">
      <ul className="flex items-center justify-evenly gap-3  py-2">
        <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
          <NavLink href="/" link="home" />
        </li>
        <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
          <NavLink href="subreddits" link="subreddits" />
        </li>
        {!user?.id ? (
          <>
            <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
              <NavLink href="/login" link="login" />
            </li>
            <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
              <NavLink href="/register" link="register" />
            </li>
          </>
        ) : (
          <li className="rounded-full bg-[#D93A00] px-4 py-2 text-white">
            <NavLink href="/" link="logout" handleClick />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
