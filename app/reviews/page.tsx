import type { Metadata } from "next";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewsList } from "../components/ReviewsList";
import { getReviews } from "../lib/services/reviews";

export const metadata: Metadata = {
  title: "Reviews | National Repo Motors",
  description:
    "Read customer reviews and share your experience. Real feedback from buyers of bank repossessed and certified pre-owned vehicles.",
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
          Client Reviews
        </h1>
        <p className="mt-4 text-lg text-[var(--color-primary)] opacity-90">
          Read what our customers say about their experience. Share your own
          review below.
        </p>

        <section className="mt-12">
          <ReviewForm />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            All Reviews
          </h2>
          <ReviewsList reviews={reviews} initialCount={5} />
        </section>
      </div>
    </main>
  );
}
