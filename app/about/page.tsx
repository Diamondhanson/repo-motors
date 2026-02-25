import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Repo Motors",
  description:
    "Learn how Bank Seized Cars sources vehicles and how to purchase bank repossessed and pre-owned cars. Transparent process, fixed pricing, risk-free inspection.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
          About Us
        </h1>
        <p className="mt-4 text-lg text-[var(--color-primary)] opacity-90">
          Bank Seized Cars connects buyers with quality bank repossessed and
          certified pre-owned vehicles. We offer transparent pricing, fixed
          rates, and a straightforward purchase process—no auctions.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            How We Source Our Vehicles
          </h2>
          <p className="mt-4 text-[var(--color-primary)] opacity-90">
            Our inventory comes directly from financial institutions and
            liquidation partners. When borrowers default on auto loans, banks
            repossess these vehicles and release them for resale. We work with
            trusted partners to acquire these units, inspect them thoroughly,
            and list them at fair liquidation prices.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
              <h4 className="font-bold text-[var(--color-primary)]">
                Bank Repossessions
              </h4>
              <p className="mt-1 text-sm text-[var(--color-primary)] opacity-90">
                Vehicles repossessed by banks and credit unions after loan
                default. Clean titles and full documentation provided.
              </p>
            </li>
            <li className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
              <h4 className="font-bold text-[var(--color-primary)]">
                Liquidations & Partnerships
              </h4>
              <p className="mt-1 text-sm text-[var(--color-primary)] opacity-90">
                We partner with financial institutions and asset managers to
                acquire batches of repossessed vehicles at competitive
                liquidation rates.
              </p>
            </li>
            <li className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
              <h4 className="font-bold text-[var(--color-primary)]">
                Quality & Transparency
              </h4>
              <p className="mt-1 text-sm text-[var(--color-primary)] opacity-90">
                Every vehicle undergoes inspection. We document condition,
                mileage, and specs so you know exactly what you&apos;re buying before
                you commit.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            How to Buy
          </h2>
          <ol className="mt-6 space-y-8">
            <li>
              <h3 className="font-bold text-[var(--color-primary)]">
                1. Browse Live Inventory
              </h3>
              <p className="mt-2 text-[var(--color-primary)] opacity-90">
                Search our real-time database of bank-seized assets and
                certified repossessed vehicles. Every listing features a
                comprehensive inspection report, transparent liquidation
                pricing, and high-resolution galleries so you know exactly what
                you&apos;re buying.
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
                2. Secure Your Vehicle
              </h3>
              <p className="mt-2 text-[var(--color-primary)] opacity-90">
                Found the right deal? Contact us via WhatsApp or Email to place
                your Reservation Deposit. This essential step &quot;locks&quot; the
                vehicle, removes it from our public inventory, and triggers our
                legal team to begin your title and paperwork processing
                immediately. Note: This deposit is 100% applied toward your
                final purchase price.
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
                3. Risk-Free Delivery &amp; Inspection
              </h3>
              <p className="mt-2 text-[var(--color-primary)] opacity-90">
                Sign your documents with confidence. Once your vehicle is
                delivered, your 2-day inspection period begins. Test drive it,
                take it to your mechanic, and ensure it&apos;s the perfect fit. Not
                satisfied? We&apos;ll arrange a pickup and provide a full refund of
                your deposit—no questions asked.
              </p>
              <Link
                href="/book-inspection"
                className="mt-3 inline-block rounded-[var(--radius-button)] border border-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:opacity-90"
              >
                Book Inspection
              </Link>
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
                All listed prices are fixed. No bidding or auctions. What you
                see is what you pay.
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
