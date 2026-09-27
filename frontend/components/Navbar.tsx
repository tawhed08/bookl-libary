"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const linkClass = (href: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `rounded-lg px-3 py-2 text-sm font-medium transition ${
      active
        ? "bg-white/15 text-white"
        : "text-indigo-100 hover:bg-white/10 hover:text-white"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#101832] via-[#20275d] to-[#40327f] text-white shadow-[0_8px_28px_-18px_rgba(12,18,48,0.85)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-2 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold text-white">
          <span className="grid size-9 place-items-center rounded-xl border border-white/20 bg-white/10 font-display text-xl text-white">B</span>
          <span>Book Library</span>
        </Link>

        <div className="order-3 flex w-full items-center gap-1 sm:order-none sm:w-auto sm:gap-2">
          <Link href="/" className={linkClass("/")} aria-current={pathname === "/" ? "page" : undefined}>
            Home
          </Link>
          <Link href="/books" className={linkClass("/books")} aria-current={pathname.startsWith("/books") ? "page" : undefined}>
            Books
          </Link>
        </div>

        <div className="ml-auto">
          <Link
            href="/books/add"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white px-3.5 py-2 text-sm font-semibold text-indigo-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:px-4"
          >
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            <span>Add Book</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}