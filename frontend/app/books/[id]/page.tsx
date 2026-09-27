"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBook } from "@/lib/api";
import type { Book } from "@/types/book";

export default function BookDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [reload, setReload] = useState(0);

	useEffect(() => {
		const controller = new AbortController();

		const fetchBook = async () => {
			setLoading(true);
			setError("");

			try {
				const data = await getBook(id, controller.signal);
				setBook(data);
			} catch (fetchError) {
				if (!controller.signal.aborted) {
					setBook(null);
					setError(
						fetchError instanceof Error
							? fetchError.message
							: "An unexpected error occurred while loading this book."
					);
				}
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		};

		void fetchBook();
		return () => controller.abort();
	}, [id, reload]);

	return (
		<main className="mx-auto min-h-[calc(100vh-5rem)] max-w-5xl px-5 py-12 sm:px-8">
			<Link href="/books" className="text-sm font-semibold text-indigo-800 transition hover:text-indigo-950">
				<span aria-hidden="true">←</span> Back to books
			</Link>

			{loading && (
				<div className="mt-6 rounded-2xl border border-indigo-100 bg-white px-6 py-16 text-center">
					<span className="mx-auto mb-4 block size-8 animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-700" aria-hidden="true" />
					<p className="font-medium text-slate-700">Loading book details...</p>
				</div>
			)}

			{!loading && error && (
				<div role="alert" className="mt-6 rounded-2xl border border-red-200 bg-white p-7 shadow-sm">
					<h1 className="font-display text-2xl font-bold text-slate-950">Book unavailable</h1>
					<p className="mt-3 wrap-break-word text-slate-700">{error}</p>
					<button
						type="button"
						onClick={() => setReload((current) => current + 1)}
						className="mt-5 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
					>
						Try again
					</button>
				</div>
			)}

			{!loading && !error && book && (
				<article className="mt-6 rounded-2xl border border-indigo-100 bg-white p-6 shadow-[0_20px_60px_-36px_rgba(31,43,99,0.38)] sm:p-10">
					<div className="flex flex-wrap gap-2">
						<span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-800">
							{book.category}
						</span>
						<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">
							{book.publishedYear}
						</span>
					</div>

					<h1 className="mt-6 max-w-3xl break-words font-display text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
						{book.title}
					</h1>
					<p className="mt-3 text-lg text-slate-600">by {book.author}</p>

					<div className="my-8 h-px bg-gradient-to-r from-indigo-200 via-slate-200 to-transparent" />

					<section aria-labelledby="description-heading">
						<h2 id="description-heading" className="text-sm font-semibold uppercase text-indigo-700">
							About this book
						</h2>
						<p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">
							{book.description || "No description has been added for this book."}
						</p>
					</section>

					<div className="mt-9 flex flex-wrap gap-3">
						<Link
							href={`/books/${book._id}/edit`}
							className="rounded-lg bg-indigo-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-800"
						>
							Edit book
						</Link>
						<Link
							href="/books"
							className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
						>
							All books
						</Link>
					</div>
				</article>
			)}
		</main>
	);
}
