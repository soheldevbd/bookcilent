import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import { CATEGORIES } from "@/lib/types";

export const metadata: Metadata = { title: "BookNook | All Books" };
export const dynamic = "force-dynamic";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "" } = await searchParams;
  const books = await getBooks({ q, category });

  return (
    <section className="page-wrap py-12">
      <h1 className="section-title">All Books</h1>
      <p className="section-sub">Every book on the BookNook shelves. Open one to see details and borrow it.</p>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/books">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by title or author"
          className="input input-bordered w-full sm:max-w-sm"
          aria-label="Search books"
        />
        <select name="category" defaultValue={category} className="select select-bordered w-full sm:w-48" aria-label="Category">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button className="btn btn-primary">Search</button>
      </form>

      {books.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-box border border-dashed border-base-300 p-12 text-center opacity-70">
          No books found. Try a different search or category.
        </p>
      )}
    </section>
  );
}
