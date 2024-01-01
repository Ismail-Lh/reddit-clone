'use client';

import React, { useState } from 'react';

import getMessageError from '@/actions/getMessageError';

function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!data.success && data.error) throw new Error(data.error);
      else console.log(data.user);

      setIsSubmitting(false);
    } catch (error: unknown) {
      const errorMessage = getMessageError(error);
      console.log(errorMessage);
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
          className="rounded-full bg-[#D93A00] px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-[#fdc3ae]"
        >
          Register
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;
