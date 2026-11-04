"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/imgbb";
import { CATEGORIES, type Book } from "@/lib/types";

export interface BookFormValues {
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
}

export default function BookForm({
  initial,
  userName,
  userEmail,
  submitLabel,
  onSubmit,
}: {
  initial?: Book;
  userName: string;
  userEmail: string;
  submitLabel: string;
  onSubmit: (values: BookFormValues) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get("image") as File | null;

    setBusy(true);
    try {
      let image = initial?.image ?? "";
      if (file && file.size > 0) image = await uploadImage(file);
      if (!image) {
        toast.error("Please choose a book cover image");
        return;
      }
      await onSubmit({
        title: String(form.get("title")).trim(),
        author: String(form.get("author")).trim(),
        category: String(form.get("category")),
        description: String(form.get("description")).trim(),
        totalCopies: Number(form.get("totalCopies")),
        image,
      });
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Book Title</span>
        <input name="title" required defaultValue={initial?.title} placeholder="e.g. The Hobbit" className="input input-bordered w-full" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Author Name</span>
        <input name="author" required defaultValue={initial?.author} placeholder="e.g. J.R.R. Tolkien" className="input input-bordered w-full" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Category</span>
        <select name="category" required defaultValue={initial?.category ?? "Fiction"} className="select select-bordered w-full">
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Total Copies</span>
        <input name="totalCopies" type="number" min={1} max={1000} required defaultValue={initial?.totalCopies ?? 1} className="input input-bordered w-full" />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1 block text-sm font-medium">
          Book Image {initial && <span className="font-normal opacity-60">(leave empty to keep the current one)</span>}
        </span>
        <input name="image" type="file" accept="image/*" required={!initial} className="file-input file-input-bordered w-full" />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1 block text-sm font-medium">Short Description</span>
        <textarea name="description" required rows={4} defaultValue={initial?.description} placeholder="What is this book about?" className="textarea textarea-bordered w-full" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Your Name</span>
        <input value={userName} readOnly className="input input-bordered w-full opacity-70" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Your Email</span>
        <input value={userEmail} readOnly className="input input-bordered w-full opacity-70" />
      </label>
      <button className="btn btn-primary sm:col-span-2" disabled={busy}>
        {busy && <span className="loading loading-spinner loading-sm" />} {submitLabel}
      </button>
    </form>
  );
}
