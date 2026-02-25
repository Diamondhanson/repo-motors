"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReviewFormProps {
  onSuccess?: () => void;
}

export function ReviewForm({ onSuccess }: ReviewFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", text: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, text: formData.text }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit review");
      }
      setStatus("success");
      setFormData({ name: "", text: "" });
      router.refresh();
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  const inputClass =
    "w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";
  const labelClass = "mb-1 block text-sm font-medium text-[var(--color-primary)]";

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Write a Review
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="review-name" className={labelClass}>
            Name *
          </label>
          <input
            id="review-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="review-text" className={labelClass}>
            Your Review *
          </label>
          <textarea
            id="review-text"
            rows={5}
            required
            value={formData.text}
            onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
            className={inputClass}
            placeholder="Share your experience with us..."
          />
        </div>
        {status === "success" && (
          <p className="rounded-[var(--radius-button)] bg-green-100 p-3 text-sm text-green-800">
            Thank you! Your review has been submitted.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-[var(--radius-button)] bg-red-100 p-3 text-sm text-red-800">
            Failed to submit review. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-3 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
