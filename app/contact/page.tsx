import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { ContactSocialLinks } from "../components/ContactSocialLinks";

export const metadata: Metadata = {
  title: "Contact Us | Repo Motors",
  description:
    "Get in touch to express interest in a vehicle, book an inspection, or ask questions about our bank repossessed cars.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; stockId?: string; vehicle?: string }>;
}) {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-3xl px-4 py-12 md:max-w-4xl md:px-6 lg:max-w-5xl xl:max-w-6xl lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-[var(--color-primary)] opacity-90">
          Interested in a vehicle or need to book an inspection? Send us a
          message and we&apos;ll get back to you soon.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm searchParams={searchParams} />
          </div>

          <aside className="lg:col-span-2">
            <ContactSocialLinks />
          </aside>
        </div>
      </div>
    </main>
  );
}
