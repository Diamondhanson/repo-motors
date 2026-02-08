"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-md rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-8 shadow-lg">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
        >
          ← Back to Repo Motors
        </Link>
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">
          Admin Login
        </h1>
        <p className="mt-2 text-sm text-[var(--color-primary)] opacity-80">
          Sign in to manage vehicles and contacts
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <p className="rounded-[var(--radius-button)] bg-red-100 p-3 text-sm text-red-800">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="admin@repomotors.com"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-3 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
