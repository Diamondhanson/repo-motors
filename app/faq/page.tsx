import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | National Repo Motors",
  description:
    "Answers about bank repossessions, fixed-price liquidations, deposits, inspections, titles, and delivery. Buy with confidence from National Repo Motors.",
};

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <li className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
      <h4 className="font-bold text-[var(--color-primary)]">{q}</h4>
      <div className="mt-2 text-sm text-[var(--color-primary)] opacity-90 [&>p]:mt-2 [&>p:first-child]:mt-0">
        {a}
      </div>
    </li>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-[var(--color-primary)] opacity-90">
          Common questions about bank repossessions, our process, deposits, and
          delivery. Can&apos;t find what you need?{" "}
          <Link
            href="/contact"
            className="font-medium text-[var(--color-primary)] underline hover:opacity-80"
          >
            Contact us
          </Link>
          .
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            General &amp; Process
          </h2>
          <ul className="mt-6 space-y-4">
            <FaqItem
              q='What exactly is a "Bank Repossession"?'
              a={
                <p>
                  A bank-seized or repossessed vehicle is an asset reclaimed by
                  a financial institution (banks or credit unions) due to a loan
                  default. At National Repo Motors, we act as the direct
                  liquidation partner, offering these vehicles to the public at
                  wholesale prices to clear the bank&apos;s books quickly.
                </p>
              }
            />
            <FaqItem
              q="Is this an auction? Do I have to bid?"
              a={
                <p>
                  No. We specialize in Fixed-Price Liquidations. Unlike
                  traditional auctions where prices can skyrocket due to bidding
                  wars, our vehicles have a set &quot;Buy It Now&quot; price. This allows
                  for a transparent, stress-free buying experience.
                </p>
              }
            />
            <FaqItem
              q="How do I buy a vehicle from National Repo Motors?"
              a={
                <>
                  <p>
                    Our process is designed for speed and security:
                  </p>
                  <p>
                    <strong>Browse:</strong> Select your vehicle from our live
                    inventory.
                  </p>
                  <p>
                    <strong>Reserve:</strong> Contact us via WhatsApp or Email
                    to place your Reservation Deposit.
                  </p>
                  <p>
                    <strong>Finalize:</strong> Once reserved, our team processes
                    the paperwork, you pay the balance, and we coordinate pickup
                    or delivery.
                  </p>
                </>
              }
            />
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            Deposits &amp; Payments
          </h2>
          <ul className="mt-6 space-y-4">
            <FaqItem
              q="Why do I need to pay a Reservation Deposit?"
              a={
                <>
                  <p>
                    Because our inventory is priced significantly below market
                    value, vehicles sell very quickly. The deposit serves three
                    critical purposes:
                  </p>
                  <p>
                    <strong>Exclusivity:</strong> It immediately removes the
                    vehicle from the market so no one else can buy it.
                  </p>
                  <p>
                    <strong>Legal Start:</strong> It triggers our title
                    department to begin the reassignment paperwork in your name.
                  </p>
                  <p>
                    <strong>Security:</strong> It demonstrates serious intent,
                    allowing us to hold the asset for you while final logistics
                    are settled.
                  </p>
                </>
              }
            />
            <FaqItem
              q="Is the deposit an extra fee?"
              a={
                <>
                  <p>
                    Absolutely not. 100% of your Reservation Deposit is applied
                    toward the final purchase price. For example:
                  </p>
                  <p>
                    If a vehicle is priced at $15,000 and your deposit is $500,
                    your remaining balance at pickup will be exactly $14,500.
                  </p>
                </>
              }
            />
            <FaqItem
              q="What payment methods do you accept?"
              a={
                <p>
                  We accept secure bank wire transfers, certified checks, and
                  major credit/debit cards for reservation deposits.
                </p>
              }
            />
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            Condition &amp; Inspections
          </h2>
          <ul className="mt-6 space-y-4">
            <FaqItem
              q="What is the condition of these vehicles?"
              a={
                <p>
                  Most of our inventory consists of &quot;Fairly Used&quot; vehicles. Each
                  car undergoes a 50-point intake inspection upon seizure. We
                  provide detailed photos and condition reports for every
                  listing to ensure full transparency regarding the interior,
                  exterior, and mechanical state.
                </p>
              }
            />
            <FaqItem
              q="Can I inspect the vehicle before the final payment?"
              a={
                <p>
                  Yes. Once a vehicle is reserved, we can coordinate a viewing
                  or a third-party inspection at our holding facility. We want
                  you to be 100% confident in your purchase.
                </p>
              }
            />
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            Titles &amp; Delivery
          </h2>
          <ul className="mt-6 space-y-4">
            <FaqItem
              q="How long does the title transfer take?"
              a={
                <p>
                  We pride ourselves on having the fastest turnaround in the
                  industry. Because we work directly with the seizing banks, we
                  typically guarantee a Clear Title transfer within 3–5 business
                  days of the final sale.
                </p>
              }
            />
            <FaqItem
              q="Do you offer shipping or delivery?"
              a={
                <p>
                  Yes. While many customers prefer to pick up their vehicles in
                  person, we can coordinate professional transport to any
                  location nationwide. Shipping costs are calculated based on
                  mileage from our nearest liquidation hub.
                </p>
              }
            />
          </ul>
        </section>

        <section className="mt-12 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            Still have questions?
          </h2>
          <p className="mt-3 text-[var(--color-primary)] opacity-90">
            Reach out via WhatsApp or our contact form. We&apos;re here to help.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block rounded-[var(--radius-button)] bg-[var(--color-primary)] px-6 py-3 text-base font-bold text-white hover:opacity-90"
            >
              Contact Us
            </Link>
            <Link
              href="/inventory"
              className="inline-block rounded-[var(--radius-button)] border border-[var(--color-primary)] px-6 py-3 text-base font-bold text-[var(--color-primary)] hover:opacity-90"
            >
              View Inventory
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
