import Link from 'next/link';
import type { Book } from '@/lib/types';

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-72 w-full overflow-hidden bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="badge badge-secondary badge-soft">
          {book.category}
        </span>
        <h3 className="line-clamp-1 text-xl font-bold">{book.title}</h3>
        <p className="line-clamp-1 opacity-70">by {book.author}</p>
        <Link
          href={`/books/${book._id}`}
          className="btn btn-primary mt-auto w-full"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
