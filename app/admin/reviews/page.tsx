"use client";

import { useState, useEffect } from "react";
import type { Review } from "@/app/lib/types";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/reviews", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setReviews)
      .catch(() => setError("Failed to load reviews"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review from ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete review");
    }
  };

  if (loading) {
    return (
      <div>
        <p className="text-[var(--color-primary)] opacity-80">
          Loading reviews...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary)]">
        Reviews
      </h1>
      <p className="mt-2 text-[var(--color-primary)] opacity-80">
        Customer reviews submitted from the website
      </p>

      <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white">
        {reviews.length === 0 ? (
          <p className="p-8 text-center text-[var(--color-primary)] opacity-80">
            No reviews yet.
          </p>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {reviews.map((r) => (
              <div key={r.id} className="p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[var(--color-primary)]">
                      {r.name}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--color-primary)] opacity-90">
                      {r.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-shrink-0">
                    <p className="text-xs text-[var(--color-primary)] opacity-60">
                      {formatDate(r.createdAt)}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(r.id, r.name)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
