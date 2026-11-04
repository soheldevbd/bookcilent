import type { Metadata } from "next";
import AddBook from "@/components/AddBook";

export const metadata: Metadata = { title: "BookNook | Add Book" };

export default function AddBookPage() {
  return <AddBook />;
}
