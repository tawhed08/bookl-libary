import Link from "next/link";
import type { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  onDelete?: (id: string) => void;
}

export default function BookCard({
  book,
  onDelete,
}: BookCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-indigo-100/90 bg-white p-5 shadow-[0_12px_36px_-26px_rgba(27,39,89,0.42)] transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_22px_46px_-28px_rgba(39,48,119,0.42)] sm:p-6">
      <div className="mb-4 flex-1">
        <h2 className="font-display text-xl font-bold text-slate-950 sm:text-2xl">
          {book.title}
        </h2>

        <p className="mt-2 text-slate-600">
          by {book.author}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800">
          {book.category}
        </span>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          {book.publishedYear}
        </span>
      </div>

      {book.description && (
        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">
          {book.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        <Link
          href={`/books/${book._id}`}
          className="rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-800"
        >
          View
        </Link>

        <Link
          href={`/books/${book._id}/edit`}
          className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-900"
        >
          Edit
        </Link>

        {onDelete && (
          <button
            type="button"
            onClick={() => void onDelete(book._id)}
            className="rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:-translate-y-0.5 hover:bg-red-100"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}