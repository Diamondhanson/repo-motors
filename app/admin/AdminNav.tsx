"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/reviews", label: "Reviews" },
];

export function AdminNav() {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-full border-b border-[var(--color-border)] bg-white p-4 lg:w-56 lg:flex-shrink-0 lg:border-b-0 lg:border-r lg:p-6">
      <Link
        href="/admin"
        className="block text-lg font-bold text-[var(--color-primary)]"
      >
        Repo Motors Admin
      </Link>
      <nav className="mt-4 flex flex-wrap gap-2 lg:mt-8 lg:flex-col lg:gap-0" aria-label="Admin navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-[var(--radius-button)] px-4 py-2 text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                : "text-[var(--color-primary)] hover:bg-[var(--color-border)]/30"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-4 border-t border-[var(--color-border)] pt-4 lg:mt-8 lg:pt-6">
        <Link
          href="/"
          className="mb-2 block text-sm text-[var(--color-primary)] opacity-80 hover:opacity-100"
        >
          View Site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="block text-sm font-medium text-red-600 hover:underline lg:mt-0"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
