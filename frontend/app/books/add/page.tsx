"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BookForm from "@/components/BookForm";
import { createBook } from "@/lib/api";

export default function AddBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    title: string;
    author: string;
    category: string;
    description: string;
    publishedYear: number;
  }) => {
    try {
      setLoading(true);
      setError("");

      await createBook(data);

      router.push("/books");
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto min-h-[calc(100vh-5rem)] max-w-4xl px-5 py-12 sm:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-indigo-700">
          Expand your shelves
        </p>
        <h1 className="font-display text-4xl font-bold text-slate-950 sm:text-5xl">
          Add a new book
        </h1>
        <p className="mt-3 text-slate-600">
          Give a favorite read a place in your collection.
        </p>
      </header>

      {error && (
        <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <BookForm onSubmit={handleSubmit} loading={loading} />
    </main>
  );
}