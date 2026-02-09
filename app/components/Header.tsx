"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/how-to-buy", label: "How to Buy" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]"
      style={{ borderColor: "var(--color-border)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity"
          aria-label="Bank Seized Cars - Home"
        >
          <Image
            src="/images/logo.png"
            alt="Bank Seized Cars"
            width={140}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-[4px] bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            I&apos;m Interested
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-[4px] p-2 text-[var(--color-primary)] hover:bg-[var(--color-border)] md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 md:hidden"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
<Link
                href="/contact"
                className="rounded-[4px] bg-[var(--color-primary)] px-4 py-2 text-center text-sm font-bold text-white hover:opacity-90"
                onClick={() => setMobileMenuOpen(false)}
              >
                I&apos;m Interested
              </Link>
          </div>
        </div>
      )}
    </header>
  );
}
