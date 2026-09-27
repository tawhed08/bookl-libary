"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section
        className="relative isolate overflow-hidden bg-gradient-to-br from-[#111a3a] via-[#252b68] to-[#51419a] text-white"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(14, 22, 51, .96) 0%, rgba(25, 32, 82, .86) 52%, rgba(53, 45, 117, .62) 100%), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=85')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div aria-hidden="true" className="absolute -right-28 -top-36 -z-10 size-[28rem] rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center px-5 py-20 sm:min-h-[550px] sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase text-indigo-200">
              A place for every good story
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-white sm:text-7xl">
              Book Library
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-100 sm:text-xl">
              Keep your reading life in one thoughtful collection, from the books you love to the ones you have yet to discover.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/books"
                className="rounded-lg bg-white px-5 py-3 font-semibold text-indigo-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Browse Books
              </Link>
              <Link
                href="/books/add"
                className="rounded-lg border border-white/40 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                Add New Book
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-16">
        <div>
          <p className="text-sm font-semibold uppercase text-indigo-700">
            Turn the next page
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-950 sm:text-4xl">
            A little more room for wonder.
          </h2>
        </div>
        <Link
          href="/books"
          className="w-fit border-b border-indigo-300 pb-1 font-semibold text-indigo-800 transition hover:border-indigo-700 hover:text-indigo-950"
        >
          Explore the collection <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}