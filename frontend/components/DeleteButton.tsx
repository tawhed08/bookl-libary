"use client";

import { useState } from "react";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
}

export default function DeleteButton({
  onDelete,
}: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      await onDelete();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}