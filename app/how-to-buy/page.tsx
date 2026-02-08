import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Buy | Repo Motors",
  description:
    "Learn how to purchase bank repossessed and pre-owned vehicles. Browse, signal interest, optional inspection, and complete your purchase.",
};

export default function HowToBuyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
          How to Buy
        </h1>
        <p className="mt-4 text-lg text-[var(--color-primary)] opacity-90">
          Straightforward process to purchase bank repossessed and pre-owned
          vehicles. No auctions—just fixed prices and clear steps.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            The Process
          </h2>
          <ol className="mt-6 space-y-8">
            <li>
              <h3 className="font-bold text-[var(--color-primary)]">
                1. Browse Our Inventory
              </h3>
              <p className="mt-2 text-[var(--color-primary)] opacity-90">
                Explore our listings of bank repossessed and pre-owned vehicles.
                Each listing shows photos, specs, price, mileage, and vehicle
                inspection report summaries. Use filters to narrow by make,
                model, year, price, and mileage.
              </p>
              <Link
                href="/inventory"
                className="mt-3 inline-block font-medium text-[var(--color-primary)] hover:opacity-80"
              >
                View Inventory →
              </Link>
            </li>

            <li>
              <h3 className="font-bold text-[var(--color-primary)]">
                2. See the Car & Signal Your Interest
              </h3>
              <p className="mt-2 text-[var(--color-primary)] opacity-90">
                When you find a vehicle you like, signal your interest by
                sending us an email or message via WhatsApp. Include the
                vehicle’s Stock ID (e.g. RM-2019-001) and we’ll respond promptly
                to discuss next steps.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-block rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <h3 className="font-bold text-[var(--color-primary)]">
                3. Book a Physical Inspection (Optional)
              </h3>
              <p className="mt-2 text-[var(--color-primary)] opacity-90">
                Want to see and test-drive the vehicle before deciding? You can
                book a physical inspection. We’ll arrange a time and location for
                you to view the car in person.
              </p>
              <Link
                href="/contact?type=inspection"
                className="mt-3 inline-block rounded-[var(--radius-button)] border border-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:opacity-90"
              >
                Book Inspection
              </Link>
            </li>

            <li>
              <h3 className="font-bold text-[var(--color-primary)]">
                4. Complete the Purchase
              </h3>
              <p className="mt-2 text-[var(--color-primary)] opacity-90">
                Once you’re ready, we’ll guide you through paperwork and payment.
                All our vehicles are bank repossessed; title transfer is
                guaranteed within 3–5 business days after completion.
              </p>
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            Policies
          </h2>
          <ul className="mt-6 space-y-4">
            <li className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
              <h4 className="font-bold text-[var(--color-primary)]">
                Fixed Pricing
              </h4>
              <p className="mt-1 text-sm text-[var(--color-primary)] opacity-90">
                All listed prices are fixed. No bidding or auctions. What you see
                is what you pay.
              </p>
            </li>
            <li className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
              <h4 className="font-bold text-[var(--color-primary)]">
                Title Transfer
              </h4>
              <p className="mt-1 text-sm text-[var(--color-primary)] opacity-90">
                Bank repossessed units come with clean title. Transfer is
                guaranteed within 3–5 business days after purchase.
              </p>
            </li>
            <li className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
              <h4 className="font-bold text-[var(--color-primary)]">
                Vehicle Inspection Reports
              </h4>
              <p className="mt-1 text-sm text-[var(--color-primary)] opacity-90">
                Every listing includes inspection report summaries. Full reports
                are available on request. You may also book a physical
                inspection before buying.
              </p>
            </li>
            <li className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
              <h4 className="font-bold text-[var(--color-primary)]">
                Bank Seized Units
              </h4>
              <p className="mt-1 text-sm text-[var(--color-primary)] opacity-90">
                Our inventory consists of bank repossessed and quality pre-owned
                vehicles. All units are sold as seen, with documentation
                provided.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-12 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-[var(--color-primary)] opacity-90">
            Browse our inventory and use &quot;I&apos;m Interested&quot; on any vehicle to
            begin.
          </p>
          <Link
            href="/inventory"
            className="mt-4 inline-block rounded-[var(--radius-button)] bg-[var(--color-primary)] px-6 py-3 text-base font-bold text-white hover:opacity-90"
          >
            View Inventory
          </Link>
        </section>
      </div>
    </main>
  );
}
