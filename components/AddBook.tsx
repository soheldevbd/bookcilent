'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import BookForm from './BookForm';
import Spinner from './Spinner';

export default function AddBook() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  if (isPending || !session) return <Spinner />;

  return (
    <section className="page-wrap py-12">
      <div className="mx-auto max-w-3xl rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="section-title">Add a Book</h1>
        <p className="section-sub mb-6">
          Share a book with other readers. It will appear in New Arrivals right
          away.
        </p>
        <BookForm
          userName={session.user.name}
          userEmail={session.user.email}
          submitLabel="Add Book"
          onSubmit={async values => {
            await apiFetch('/books', {
              method: 'POST',
              body: JSON.stringify({ ...values, userName: session.user.name }),
            });
            toast.success('Book added successfully!');
            router.push('/my-books');
          }}
        />
      </div>
    </section>
  );
}
