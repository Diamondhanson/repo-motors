"use client";

import { useState } from "react";
import type { Review } from "@/app/lib/types";

interface ReviewsListProps {
  reviews: Review[];
  initialCount?: number;
}

export function ReviewsList({ reviews, initialCount = 5 }: ReviewsListProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, initialCount);
  const hasMore = reviews.length > initialCount;

  if (reviews.length === 0) {
    return (
      <p className="mt-6 text-[var(--color-primary)] opacity-80">
        No reviews yet. Be the first to share your experience!
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <ul className="space-y-4">
        {visible.map((review) => (
          <li
            key={review.id}
            className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6"
          >
            <p className="font-bold text-[var(--color-primary)]">{review.name}</p>
            <p className="mt-2 text-[var(--color-primary)] opacity-90">
              {review.text}
            </p>
          </li>
        ))}
      </ul>
      {hasMore && !showAll && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-[var(--radius-button)] border border-[var(--color-primary)] px-6 py-3 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
          >
            View more
          </button>
        </div>
      )}
    </div>
  );
}
