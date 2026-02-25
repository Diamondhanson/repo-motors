import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "./components/JsonLd";
import { HeroSearchFilters } from "./components/HeroSearchFilters";
import { HeroSlidingBackground } from "./components/HeroSlidingBackground";
import { VehicleCard } from "./components/VehicleCard";
import { RevealOnScroll } from "./components/RevealOnScroll";
import { getVehicles, getFeaturedVehiclesForHomePage } from "./data/inventory";
import { getFilterOptions } from "./lib/services/vehicles";
import { getReviewsForHome } from "./lib/services/reviews";

export const revalidate = 600; // Revalidate every 10 minutes (ISR)

export const metadata: Metadata = {
  title: "Fairly Used & Bank Repossessed Cars - Repo Motors",
  description:
    "Discover transparent pricing on certified bank repossessed and quality pre-owned vehicles. No auctions, just direct purchases. Find your next car today!",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Repo Motors",
  url: "https://repomotors.com",
  description:
    "Trust-first marketplace for certified bank repossessed and pre-owned vehicles. Fixed prices, no auctions.",
};

function SearchIcon() {
  return (
    <svg
      className="size-12 text-[var(--color-primary)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      className="size-12 text-[var(--color-primary)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg
      className="size-12 text-[var(--color-primary)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}

const SAMPLE_REVIEWS = [
  {
    name: "John M.",
    text: "Smooth process from start to finish. Got a great deal on a 2019 Camry. Title came in 4 days. Highly recommend.",
  },
  {
    name: "Sarah K.",
    text: "I was skeptical about buying a repo car, but the inspection report gave me confidence. The car runs perfectly.",
  },
  {
    name: "Michael T.",
    text: "No auctions, no pressure. Fixed price and transparent. Will buy from them again.",
  },
  {
    name: "Jennifer L.",
    text: "Reserved my vehicle with a deposit, inspected it, and drove it home. Exactly as described. Great experience.",
  },
];

const howItWorksSteps = [
  {
    icon: SearchIcon,
    title: "Browse Live Inventory",
    href: "/inventory",
    description:
      "Search our real-time database of bank-seized assets and certified repossessed vehicles. Every listing features a comprehensive inspection report, transparent liquidation pricing, and high-resolution galleries so you know exactly what you're buying.",
  },
  {
    icon: ClipboardIcon,
    title: "Secure Your Vehicle",
    href: "/about",
    description:
      'Found the right deal? Contact us via WhatsApp or Email to place your Reservation Deposit. This essential step "locks" the vehicle, removes it from our public inventory, and triggers our legal team to begin your title and paperwork processing immediately. Note: This deposit is 100% applied toward your final purchase price.',
  },
  {
    icon: CreditCardIcon,
    title: "Risk-Free Delivery & Inspection",
    href: "/book-inspection",
    description:
      "Sign your documents with confidence. Once your vehicle is delivered, your 2-day inspection period begins. Test drive it, take it to your mechanic, and ensure it's the perfect fit. Not satisfied? We'll arrange a pickup and provide a full refund of your deposit—no questions asked.",
  },
];

export default async function Home() {
  const [filterOptions, reviews, featuredVehicles] = await Promise.all([
    getFilterOptions(),
    getReviewsForHome(4),
    getFeaturedVehiclesForHomePage(),
  ]);
  const displayReviews = reviews.length >= 4 ? reviews.slice(0, 4) : SAMPLE_REVIEWS.slice(0, 4);

  return (
    <>
      <JsonLd data={organizationSchema} />

      <main>
        <section
          className="relative min-h-[420px] overflow-hidden px-4 py-12 md:px-6 md:py-[var(--section-padding)] lg:px-8"
          aria-label="Hero"
        >
          <HeroSlidingBackground />
          <div className="relative z-10 mx-auto max-w-7xl">
            <RevealOnScroll>
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Fairly Used & Bank Repossessed Cars
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white md:text-xl">
                Discover quality pre-owned vehicles and certified bank
                repossessed cars at transparent, fixed prices. Used cars for
                sale—no auctions, just affordable cars you can trust.
              </p>
              <HeroSearchFilters filterOptions={filterOptions} />
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-t border-[var(--color-border)] px-4 py-12 md:px-6 md:py-[var(--section-padding)] lg:px-8"
          style={{ borderColor: "var(--color-border)" }}
          aria-label="How it works"
        >
          <div className="mx-auto max-w-7xl">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold text-[var(--color-primary)] md:text-3xl">
                How it Works
              </h2>
            </RevealOnScroll>
            <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-8">
              {howItWorksSteps.map((step) => (
                <RevealOnScroll
                  key={step.title}
                  className="flex flex-col items-start"
                >
                  <Link
                    href={step.href}
                    className="block w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <step.icon />
                    <h3 className="mt-4 text-lg font-bold text-[var(--color-primary)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[var(--color-primary)] opacity-80">
                      {step.description}
                    </p>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        

        <section
          className="border-t border-[var(--color-border)] bg-[#f5f2ed] px-4 py-12 md:px-6 md:py-[var(--section-padding)] lg:px-8"
          style={{ borderColor: "var(--color-border)" }}
          aria-label="Featured vehicles"
        >
          <div className="mx-auto max-w-7xl">
            <RevealOnScroll className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] md:text-3xl">
                Featured Repossessed Units
              </h2>
              <Link
                href="/inventory"
                className="rounded-[var(--radius-button)] border border-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:opacity-90"
              >
                View All Inventory
              </Link>
            </RevealOnScroll>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredVehicles.map((vehicle) => (
                <RevealOnScroll key={vehicle.slug}>
                  <VehicleCard {...vehicle} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
        <section
          className="border-t border-[var(--color-border)] px-4 py-12 md:px-6 md:py-[var(--section-padding)] lg:px-8"
          style={{ borderColor: "var(--color-border)" }}
          aria-label="Client reviews"
        >
          <div className="mx-auto max-w-7xl">
            <RevealOnScroll className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] md:text-3xl">
                Client Reviews
              </h2>
              <Link
                href="/reviews"
                className="rounded-[var(--radius-button)] border border-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:opacity-90"
              >
                View more
              </Link>
            </RevealOnScroll>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayReviews.map((review, i) => (
                <RevealOnScroll key={String(i)}>
                  <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
                    <p className="font-bold text-[var(--color-primary)]">{review.name}</p>
                    <p className="mt-2 text-sm text-[var(--color-primary)] opacity-90">
                      {review.text}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
