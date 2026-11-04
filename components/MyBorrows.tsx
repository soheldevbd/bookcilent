"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";
import type { Borrow } from "@/lib/types";
import Spinner from "./Spinner";

export default function MyBorrows() {
  const { data: session, isPending } = authClient.useSession();
  const [borrows, setBorrows] = useState<Borrow[] | null>(null);
  const [returning, setReturning] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    apiFetch<Borrow[]>("/borrows")
      .then(setBorrows)
      .catch((err) => {
        toast.error((err as Error).message);
        setBorrows([]);
      });
  }, [session]);

  if (isPending || !session || !borrows) return <Spinner label="Loading your borrows..." />;

  const handleReturn = async (b: Borrow) => {
    setReturning(b._id);
    try {
      await apiFetch(`/borrows/${b._id}`, { method: "DELETE" });
      setBorrows((prev) => prev?.filter((x) => x._id !== b._id) ?? []);
      toast.success(`"${b.bookTitle}" returned. Thank you!`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setReturning(null);
    }
  };

  return (
    <section className="page-wrap py-12">
      <h1 className="section-title">My Borrows</h1>
      <p className="section-sub">Books you currently have on loan.</p>

      {borrows.length === 0 ? (
        <div className="mt-8 rounded-box border border-dashed border-base-300 p-12 text-center">
          <p className="opacity-70">You have not borrowed any books yet.</p>
          <Link href="/books" className="btn btn-primary mt-4">Browse Books</Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.bookImage} alt={b.bookTitle} className="h-16 w-12 rounded object-cover" />
                  </td>
                  <td className="font-semibold">{b.bookTitle}</td>
                  <td>{formatDate(b.borrowDate)}</td>
                  <td>{formatDate(b.returnDate)}</td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-primary" onClick={() => handleReturn(b)} disabled={returning === b._id}>
                      {returning === b._id && <span className="loading loading-spinner loading-xs" />} Return Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
