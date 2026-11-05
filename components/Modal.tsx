'use client';

import { useEffect } from 'react';

export default function Modal({
  title,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={`modal-box ${wide ? 'max-w-2xl' : ''}`}>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="mb-4 pr-8 text-2xl font-bold">{title}</h3>
        {children}
      </div>
      <div className="modal-backdrop bg-black/40" onClick={onClose} />
    </div>
  );
}
