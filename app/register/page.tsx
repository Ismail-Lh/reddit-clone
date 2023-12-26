'use client';

import React, { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex w-1/2 flex-col gap-y-4"
        onSubmit={(e) => handleRegister(e)}
      >
        <input
          className="rounded-2xl border border-gray-400 px-4 py-2"
          type="text"
          name="username"
          id="username"
          placeholder="Enter your reddit username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="rounded-2xl border border-gray-400 px-4 py-2"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your reddit password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-full bg-[#D93A00] px-4 py-2 text-white"
        >
          Register
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;
