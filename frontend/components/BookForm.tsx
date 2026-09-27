"use client";

import { useState } from "react";
import type { Book } from "@/types/book";

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: {
    title: string;
    author: string;
    category: string;
    description: string;
    publishedYear: number;
  }) => void;
  loading?: boolean;
}

export default function BookForm({
  initialData,
  onSubmit,
  loading = false,
}: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [publishedYear, setPublishedYear] = useState(
    initialData?.publishedYear?.toString() || ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title,
      author,
      category,
      description,
      publishedYear: Number(publishedYear),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-indigo-100 bg-white p-5 shadow-[0_18px_54px_-32px_rgba(31,43,99,0.35)] sm:p-8"
    >
      <div>
        <label htmlFor="book-title" className="mb-2 block text-sm font-semibold text-slate-800">
          Book Title
        </label>

        <input
          id="book-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="book-author" className="mb-2 block text-sm font-semibold text-slate-800">
          Author
        </label>

        <input
          id="book-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="book-category" className="mb-2 block text-sm font-semibold text-slate-800">
          Category
        </label>

        <input
          id="book-category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Fiction"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="book-year" className="mb-2 block text-sm font-semibold text-slate-800">
          Published Year
        </label>

        <input
          id="book-year"
          type="number"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          placeholder="e.g. 1988"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="book-description" className="mb-2 block text-sm font-semibold text-slate-800">
          Description
        </label>

        <textarea
          id="book-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter book description"
          rows={5}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-700 to-violet-700 px-5 py-3.5 font-semibold text-white shadow-md shadow-indigo-900/15 transition hover:-translate-y-0.5 hover:from-indigo-800 hover:to-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : initialData
            ? "Update Book"
            : "Add Book"}
      </button>
    </form>
  );
}