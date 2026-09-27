"use client";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories?: string[];
}

const predefinedCategories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "History",
  "Biography",
];

export default function CategoryFilter({
  value,
  onChange,
  categories = [],
}: CategoryFilterProps) {
  const options = [...new Set([...categories, ...predefinedCategories])].sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="w-full">
      <label htmlFor="book-category" className="mb-2 block text-xs font-semibold uppercase text-slate-500">
        Category
      </label>
      <select
        id="book-category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}