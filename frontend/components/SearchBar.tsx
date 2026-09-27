"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="w-full">
      <label htmlFor="book-search" className="mb-2 block text-xs font-semibold uppercase text-slate-500">
        Search the collection
      </label>
      <input
        id="book-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or author..."
        autoComplete="off"
        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}