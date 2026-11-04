import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "BookNook | Page Not Found" };

export default function NotFound() {
  return (
    <section className="page-wrap flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-8xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>404</p>
      <h1 className="section-title">This page is missing from the shelf</h1>
      <p className="section-sub">The page you are looking for may have been moved, returned or never existed.</p>
      <Link href="/" className="btn btn-primary mt-2">Back to Home</Link>
    </section>
  );
}
