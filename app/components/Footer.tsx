import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/how-to-buy", label: "How to Buy" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer
      className="border-t border-white/10 bg-[#1a2b3c] py-[var(--section-padding)]"
      style={{ borderColor: "rgba(255,255,255,0.1)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-white">
              Repo Motors
            </p>
            <p className="mt-1 text-sm text-white/80">
              Trust-first marketplace for certified bank repossessed and
              pre-owned vehicles. No auctions, just transparent pricing.
            </p>
          </div>
          <nav
            className="flex flex-col items-center gap-3 md:flex-row md:gap-8"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
