'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import GoogleButton from './GoogleButton';

function validatePassword(pw: string) {
  if (pw.length < 6) return 'Password must be at least 6 characters long';
  if (!/[A-Z]/.test(pw)) return 'Password must contain an uppercase letter';
  if (!/[a-z]/.test(pw)) return 'Password must contain a lowercase letter';
  return '';
}

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get('password'));

    const problem = validatePassword(password);
    setPasswordError(problem);
    if (problem) {
      toast.error(problem);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: String(form.get('name')),
      email: String(form.get('email')),
      image: String(form.get('photo')),
      password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      return;
    }
    toast.success('Account created! Please login to continue.');
    router.push('/login');
  };

  return (
    <section className="page-wrap flex justify-center py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-8 shadow-sm">
        <h1 className="section-title text-center">Create your account</h1>
        <p className="mt-2 text-center opacity-70">
          Join BookNook and start borrowing.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
          noValidate={false}
        >
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Name</span>
            <input
              name="name"
              required
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Photo URL</span>
            <input
              name="photo"
              type="url"
              required
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="Min 6 chars, upper & lower case"
              className={`input input-bordered w-full ${passwordError ? 'input-error' : ''}`}
              onChange={() => passwordError && setPasswordError('')}
            />
            {passwordError && (
              <span role="alert" className="mt-1 block text-sm text-error">
                {passwordError}
              </span>
            )}
          </label>
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />}{' '}
            Register
          </button>
        </form>

        <div className="divider my-6">OR</div>
        <GoogleButton callbackURL="/" />

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="link link-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
