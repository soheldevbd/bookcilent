import type { Metadata } from "next";
import Link from "next/link";
import { FaBookMedical, FaBookOpenReader, FaChild, FaEllipsis, FaFeatherPointed, FaFlask, FaLandmark, FaRotateLeft } from "react-icons/fa6";
import BookCard from "@/components/BookCard";
import HeroSlider from "@/components/HeroSlider";
import Reveal from "@/components/Reveal";
import { getBooks } from "@/lib/api";

export const metadata: Metadata = { title: "BookNook | Home" };
export const dynamic = "force-dynamic";

const steps = [
  { Icon: FaBookMedical, title: "1. Add a book", text: "Share a book from your shelf with the community in under a minute." },
  { Icon: FaBookOpenReader, title: "2. Borrow a book", text: "Open any book, pick a return date and confirm. One copy is reserved for you." },
  { Icon: FaRotateLeft, title: "3. Return a book", text: "Finished reading? Return it from My Borrows so the next reader can enjoy it." },
];

const categories = [
  { name: "Fiction", Icon: FaFeatherPointed },
  { name: "Science", Icon: FaFlask },
  { name: "History", Icon: FaLandmark },
  { name: "Kids", Icon: FaChild },
  { name: "Others", Icon: FaEllipsis },
];

export default async function HomePage() {
  const latest = await getBooks({ limit: 6 });

  return (
    <>
      <HeroSlider />

      <section className="page-wrap py-16">
        <Reveal>
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-sub">The latest books added to the BookNook shelves.</p>
        </Reveal>
        {latest.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((book, i) => (
              <Reveal key={book._id} delay={i * 0.05} className="h-full">
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-box border border-dashed border-base-300 p-10 text-center opacity-70">
            No books yet. Be the first to add one!
          </p>
        )}
        <div className="mt-10 text-center">
          <Link href="/books" className="btn btn-primary btn-lg">See All Books</Link>
        </div>
      </section>

      <section className="bg-base-200 py-16">
        <div className="page-wrap">
          <Reveal className="text-center">
            <h2 className="section-title">How Borrowing Works</h2>
            <p className="section-sub mx-auto">Three simple steps. That is all it takes.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col items-center gap-3 rounded-box border border-base-300 bg-base-100 p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                    <Icon aria-hidden />
                  </span>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="leading-relaxed opacity-75">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap py-16">
        <Reveal>
          <h2 className="section-title">Top Categories</h2>
          <p className="section-sub">Jump straight to the kind of story you are in the mood for.</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map(({ name, Icon }, i) => (
            <Reveal key={name} delay={i * 0.05} className="h-full">
              <Link
                href={`/books?category=${name}`}
                className="flex h-full flex-col items-center gap-3 rounded-box border border-base-300 bg-base-100 p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <Icon className="text-4xl text-secondary" aria-hidden />
                <span className="font-semibold">{name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
