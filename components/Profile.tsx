'use client';

import { authClient } from '@/lib/auth-client';
import Spinner from './Spinner';

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending || !session) return <Spinner />;
  const { user } = session;

  return (
    <section className="page-wrap flex justify-center py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-8 text-center shadow-sm">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                user.image ||
                `https://ui-avatars.com/api/?background=2f6f62&color=fff&name=${encodeURIComponent(user.name)}`
              }
              alt={user.name}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <h1 className="section-title mt-5">{user.name}</h1>
        <p className="mt-1 opacity-70">{user.email}</p>
      </div>
    </section>
  );
}
