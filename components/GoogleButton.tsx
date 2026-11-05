'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export default function GoogleButton({
  callbackURL = '/',
}: {
  callbackURL?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL,
    });
    if (error) {
      toast.error(error.message || 'Google sign-in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="btn btn-outline w-full"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FcGoogle className="text-xl" />
      )}
      Continue with Google
    </button>
  );
}
