"use client";

import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import { deleteBook, getBooks } from "@/lib/api";
import type { Book } from "@/types/book";

export default function BooksPage() {
	const [books, setBooks] = useState<Book[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [actionError, setActionError] = useState("");
	const [reload, setReload] = useState(0);

	useEffect(() => {
		const controller = new AbortController();

		const fetchBooks = async () => {
			try {
				setError("");
				const data = await getBooks({ search, category }, controller.signal);
				setBooks(data);
				if (!search && !category) {
					setCategories([...new Set(data.map((book) => book.category))]);
				}
			} catch (fetchError) {
				if (!controller.signal.aborted) {
					setError(
						fetchError instanceof Error
							? fetchError.message
							: "An unexpected error occurred while loading books."
					);
				}
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		};

		const timer = setTimeout(() => {
			setLoading(true);
			void fetchBooks();
		}, 300);

		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	}, [search, category, reload]);

	const handleDelete = async (id: string) => {
		try {
			setActionError("");
			await deleteBook(id);
			setBooks((currentBooks) =>
				currentBooks.filter((book) => book._id !== id)
			);
		} catch (deleteError) {
			setActionError(
				deleteError instanceof Error
					? deleteError.message
					: "An unexpected error occurred while deleting the book."
			);
		}
	};

	return (
		<main className="mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-5 py-12 sm:px-8">
			<header className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="mb-2 text-sm font-semibold uppercase text-indigo-700">
					The collection
					</p>
					<h1 className="font-display text-4xl font-bold text-slate-950 sm:text-5xl">
						All books
					</h1>
					<p className="mt-3 max-w-xl text-slate-600">
						Find your next read across every shelf in your library.
					</p>
				</div>
				<p className="text-sm font-medium text-slate-500">
					{loading ? "Updating collection" : `${books.length} books`}
				</p>
			</header>

			<div className="mb-8 grid gap-3 rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-[0_12px_40px_-28px_rgba(38,47,105,0.35)] sm:grid-cols-[1fr_16rem] sm:p-5">
				<SearchBar value={search} onChange={setSearch} />
				<CategoryFilter
					value={category}
					onChange={setCategory}
					categories={categories}
				/>
			</div>

			{actionError && (
				<div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
					{actionError}
				</div>
			)}

			{loading && (
				<div className="rounded-2xl border border-indigo-100 bg-white px-6 py-16 text-center">
					<span className="mx-auto mb-4 block size-8 animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-700" aria-hidden="true" />
					<p className="font-medium text-slate-700">Loading your books...</p>
				</div>
			)}

			{!loading && error && (
				<div role="alert" className="rounded-2xl border border-red-200 bg-white p-7 shadow-sm sm:p-9">
					<p className="text-sm font-semibold uppercase text-red-700">Unable to load books</p>
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

			{!loading && !error && books.length === 0 && (
				<div className="rounded-2xl border border-indigo-100 bg-white px-6 py-16 text-center shadow-[0_14px_45px_-32px_rgba(38,47,105,0.38)]">
					<h2 className="font-display text-2xl font-bold text-slate-900">
						No books found
					</h2>
					<p className="mt-2 text-slate-600">
						Try another search or add a new book.
					</p>
				</div>
			)}

			{!loading && !error && books.length > 0 && (
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{books.map((book) => (
						<BookCard key={book._id} book={book} onDelete={handleDelete} />
					))}
				</div>
			)}
		</main>
	);
}
