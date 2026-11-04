"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch, getBooks } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";
import type { Book } from "@/lib/types";
import BookForm from "./BookForm";
import Modal from "./Modal";
import Spinner from "./Spinner";

export default function MyBooks() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user.email;
  const [books, setBooks] = useState<Book[] | null>(null);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (email) setBooks(await getBooks({ email }));
  }, [email]);

  useEffect(() => {
    load();
  }, [load]);

  if (isPending || !session || !books) return <Spinner label="Loading your books..." />;

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((prev) => prev?.filter((b) => b._id !== deleting._id) ?? []);
      toast.success(`"${deleting.title}" was deleted`);
      setDeleting(null);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="page-wrap py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">My Books</h1>
          <p className="section-sub">Books you have added. Edit the details or remove them.</p>
        </div>
        <Link href="/add-book" className="btn btn-primary">Add Book</Link>
      </div>

      {books.length === 0 ? (
        <p className="mt-8 rounded-box border border-dashed border-base-300 p-12 text-center opacity-70">
          You have not added any books yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Book</th>
                <th>Category</th>
                <th>Copies</th>
                <th>Added</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.image} alt={b.title} className="h-16 w-12 rounded object-cover" />
                      <div>
                        <Link href={`/books/${b._id}`} className="font-semibold hover:text-primary">{b.title}</Link>
                        <div className="text-sm opacity-60">{b.author}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-secondary badge-soft">{b.category}</span></td>
                  <td>{b.availableCopies} / {b.totalCopies}</td>
                  <td>{formatDate(b.createdAt)}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-sm btn-primary btn-outline" onClick={() => setEditing(b)}>Edit</button>
                      <button className="btn btn-sm btn-error btn-outline" onClick={() => setDeleting(b)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title="Edit Book" wide onClose={() => setEditing(null)}>
          <BookForm
            initial={editing}
            userName={session.user.name}
            userEmail={session.user.email}
            submitLabel="Save Changes"
            onSubmit={async (values) => {
              await apiFetch(`/books/${editing._id}`, { method: "PATCH", body: JSON.stringify(values) });
              toast.success("Book updated successfully!");
              setEditing(null);
              await load();
            }}
          />
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete this book?" onClose={() => setDeleting(null)}>
          <p className="opacity-80">
            <strong>{deleting.title}</strong> will be permanently removed, along with any active borrows of it. This cannot be undone.
          </p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => setDeleting(null)}>Cancel</button>
            <button className="btn btn-error" onClick={confirmDelete} disabled={busy}>
              {busy && <span className="loading loading-spinner loading-sm" />} Yes, Delete
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
