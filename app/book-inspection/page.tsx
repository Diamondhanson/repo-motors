import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book Inspection | Repo Motors",
  description:
    "Schedule a physical inspection for any vehicle in our inventory. View and test-drive before you buy.",
};

export default function BookInspectionPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
          Book a Physical Inspection
        </h1>
        <p className="mt-4 text-lg text-[var(--color-primary)] opacity-90">
          Want to see a vehicle in person before you buy? We arrange physical
          inspections so you can view and test-drive before making a decision.
        </p>

        <section className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            How It Works
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--color-primary)] opacity-90">
            <li>Find the vehicle you like in our inventory</li>
            <li>Note the Stock ID (e.g. RM-2019-001)</li>
            <li>Email us with the Stock ID and your preferred dates</li>
            <li>We’ll confirm a time and location for the inspection</li>
          </ol>

          <Link
            href="/contact?type=inspection"
            className="mt-6 flex w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-primary)] px-6 py-3 text-base font-bold text-white hover:opacity-90"
          >
            Book Inspection
          </Link>
        </section>

        <p className="mt-8 text-center text-sm text-[var(--color-primary)] opacity-80">
          You can also book directly from any vehicle detail page.
        </p>
        <Link
          href="/inventory"
          className="mt-4 block text-center font-medium text-[var(--color-primary)] hover:opacity-80"
        >
          Browse Inventory →
        </Link>
      </div>
    </main>
  );
}
