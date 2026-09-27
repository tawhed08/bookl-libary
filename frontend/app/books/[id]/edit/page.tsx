"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookForm from "@/components/BookForm";
import { getBook, updateBook } from "@/lib/api";
import type { Book } from "@/types/book";

export default function EditBookPage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
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

	const handleSubmit = async (data: {
		title: string;
		author: string;
		category: string;
		description: string;
		publishedYear: number;
	}) => {
		try {
			setSaving(true);
			setError("");
			await updateBook(id, data);
			router.push(`/books/${id}`);
		} catch (saveError) {
			setError(
				saveError instanceof Error
					? saveError.message
					: "An unexpected error occurred while saving this book."
			);
		} finally {
			setSaving(false);
		}
	};

	return (
		<main className="mx-auto min-h-[calc(100vh-5rem)] max-w-4xl px-5 py-12 sm:px-8">
			<header className="mb-8">
				<p className="mb-2 text-sm font-semibold uppercase text-indigo-700">
					Your collection
				</p>
				<h1 className="font-display text-4xl font-bold text-slate-950 sm:text-5xl">
					Edit book
				</h1>
				<p className="mt-3 text-slate-600">Update the details in your library.</p>
			</header>

			{loading && (
				<div className="rounded-2xl border border-indigo-100 bg-white px-6 py-16 text-center">
					<span className="mx-auto mb-4 block size-8 animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-700" aria-hidden="true" />
					<p className="font-medium text-slate-700">Loading book details...</p>
				</div>
			)}

			{!loading && error && !book && (
				<div role="alert" className="rounded-2xl border border-red-200 bg-white p-7 shadow-sm">
					<h2 className="font-display text-2xl font-bold text-slate-950">Book unavailable</h2>
					<p className="mt-3 text-slate-700" style={{ overflowWrap: "anywhere" }}>
						{error}
					</p>
					<button
						type="button"
						onClick={() => setReload((current) => current + 1)}
						className="mt-5 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
					>
						Try again
					</button>
				</div>
			)}

			{!loading && error && book && (
				<div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
					{error}
				</div>
			)}

			{!loading && book && <BookForm key={book._id} initialData={book} onSubmit={handleSubmit} loading={saving} />}
		</main>
	);
}
