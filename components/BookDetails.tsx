"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";
import type { Book } from "@/lib/types";
import BorrowModal from "./BorrowModal";
import Spinner from "./Spinner";

export default function BookDetails({ id }: { id: string }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setBook(await apiFetch<Book>(`/books/${id}`));
    } catch (err) {
      setError((err as Error).message);
    }
  }, [id]);

  useEffect(() => {
    if (session) load();
  }, [session, load]);

  if (isPending || (!book && !error)) return <Spinner label="Loading book details..." />;

  if (error || !book || !session) {
    return (
      <section className="page-wrap flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="section-title">We couldn&apos;t find that book</h1>
        <p className="section-sub">{error || "It may have been removed."}</p>
        <Link href="/books" className="btn btn-primary">Back to All Books</Link>
      </section>
    );
  }

  const unavailable = book.availableCopies <= 0;

  return (
    <section className="page-wrap py-12">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-box border border-base-300 bg-base-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={book.image} alt={book.title} className="aspect-[3/4] w-full object-cover" />
          </div>
        </div>

        <div className="space-y-5 md:col-span-3">
          <span className="badge badge-secondary badge-soft badge-lg">{book.category}</span>
          <h1 className="section-title">{book.title}</h1>
          <p className="text-lg opacity-75">by {book.author}</p>
          <p className="leading-relaxed">{book.description}</p>

          <dl className="grid grid-cols-2 gap-4 rounded-box border border-base-300 bg-base-200 p-5 text-sm">
            <div>
              <dt className="opacity-60">Added by</dt>
              <dd className="font-semibold">{book.userName || "Unknown"}</dd>
              <dd className="opacity-70">{book.userEmail}</dd>
            </div>
            <div>
              <dt className="opacity-60">Added on</dt>
              <dd className="font-semibold">{formatDate(book.createdAt)}</dd>
            </div>
            <div>
              <dt className="opacity-60">Copies available</dt>
              <dd className="font-semibold">{book.availableCopies} of {book.totalCopies}</dd>
            </div>
          </dl>

          <button className="btn btn-primary btn-lg" disabled={unavailable} onClick={() => setOpen(true)}>
            {unavailable ? "Not Available" : "Borrow This Book"}
          </button>
        </div>
      </div>

      {open && (
        <BorrowModal
          book={book}
          userName={session.user.name}
          userEmail={session.user.email}
          onClose={() => setOpen(false)}
          onBorrowed={() => {
            setOpen(false);
            router.push("/my-borrows");
          }}
        />
      )}
    </section>
  );
}
