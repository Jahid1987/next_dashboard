// app/ui/register-form.tsx
'use client';

import { useActionState } from 'react';
import { registerUser } from '@/app/lib/auth/actions';
import Link from 'next/link';
import { State } from '@/app/lib/auth/definations' 

export default function RegisterForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-lg bg-gray-50 p-6">
      <h1 className="text-xl font-bold">Create an account</h1>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-900" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-900" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Minimum 6 characters"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
        />
        {state.errors?.password && (
          <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      {/* Global Error Message */}
      {state.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {isPending ? 'Registering...' : 'Register'}
      </button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </div>
    </form>
  );
}