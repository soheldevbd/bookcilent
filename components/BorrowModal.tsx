'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import type { Book } from '@/lib/types';
import Modal from './Modal';

const DURATIONS = [3, 5, 7, 14];

export default function BorrowModal({
  book,
  userName,
  userEmail,
  onClose,
  onBorrowed,
}: {
  book: Book;
  userName: string;
  userEmail: string;
  onClose: () => void;
  onBorrowed: () => void;
}) {
  const [days, setDays] = useState(7);
  const [busy, setBusy] = useState(false);

  const confirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const returnDate = new Date(Date.now() + days * 86_400_000).toISOString();
      await apiFetch('/borrows', {
        method: 'POST',
        body: JSON.stringify({ bookId: book._id, returnDate }),
      });
      toast.success(
        `"${book.title}" is yours for ${days} days. Happy reading!`,
      );
      onBorrowed();
    } catch (err) {
      toast.error((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <Modal title="Borrow this book" onClose={onClose}>
      <p className="mb-4 opacity-75">
        You are borrowing <strong>{book.title}</strong> by {book.author}.
      </p>
      <form onSubmit={confirm} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Your Name</span>
          <input
            value={userName}
            readOnly
            className="input input-bordered w-full opacity-70"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Your Email</span>
          <input
            value={userEmail}
            readOnly
            className="input input-bordered w-full opacity-70"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Borrow for</span>
          <select
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="select select-bordered w-full"
          >
            {DURATIONS.map(d => (
              <option key={d} value={d}>
                {d} days
              </option>
            ))}
          </select>
        </label>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={busy}>
            {busy && <span className="loading loading-spinner loading-sm" />}{' '}
            Confirm Borrow
          </button>
        </div>
      </form>
    </Modal>
  );
}
