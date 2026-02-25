"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Vehicle } from "@/app/lib/types";

const FEATURED_MAX = 6;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

export default function AdminProductsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/vehicles", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setVehicles)
      .catch(() => setError("Failed to load vehicles"))
      .finally(() => setLoading(false));
  }, []);

  const featuredCount = vehicles.filter((v) => v.featured).length;

  const handleToggleFeatured = async (v: Vehicle) => {
    if (v.featured) {
      try {
        const res = await fetch(`/api/admin/vehicles/${v.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ featured: false }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Failed");
        setVehicles((prev) =>
          prev.map((item) =>
            item.slug === v.slug ? { ...item, featured: false } : item
          )
        );
        toast.success("Removed from featured");
      } catch {
        toast.error("Failed to remove from featured");
      }
      return;
    }
    if (featuredCount >= FEATURED_MAX) {
      toast.error("Maximum 6 featured vehicles. Remove one to add another.");
      return;
    }
    try {
      const res = await fetch(`/api/admin/vehicles/${v.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ featured: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed");
      setVehicles((prev) =>
        prev.map((item) =>
          item.slug === v.slug ? { ...item, featured: true } : item
        )
      );
      toast.success("Added to featured");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed";
      toast.error(msg.includes("Maximum 6") ? msg : "Failed to add to featured");
    }
  };

  const handleToggleSold = async (v: Vehicle) => {
    try {
      const res = await fetch(`/api/admin/vehicles/${v.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sold: !v.sold }),
      });
      if (!res.ok) throw new Error("Failed");
      setVehicles((prev) =>
        prev.map((item) =>
          item.slug === v.slug ? { ...item, sold: !item.sold } : item
        )
      );
      toast.success(v.sold ? "Marked as unsold" : "Tagged as sold");
    } catch {
      toast.error("Failed to update sold status");
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/vehicles/${slug}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setVehicles((prev) => prev.filter((v) => v.slug !== slug));
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div>
        <p className="text-[var(--color-primary)] opacity-80">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          Add Vehicle
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white">
        {vehicles.length === 0 ? (
          <p className="p-8 text-center text-[var(--color-primary)] opacity-80">
            No vehicles yet. Add your first vehicle.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
                <th className="px-4 py-3 text-sm font-bold text-[var(--color-primary)]">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-sm font-bold text-[var(--color-primary)]">
                  Stock ID
                </th>
                <th className="px-4 py-3 text-sm font-bold text-[var(--color-primary)]">
                  Price
                </th>
                <th className="px-4 py-3 text-sm font-bold text-[var(--color-primary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr
                  key={v.slug}
                  className="border-b border-[var(--color-border)] last:border-0"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-[var(--color-primary)]">
                      {v.year} {v.make} {v.model}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-primary)]">
                    {v.stockId}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-primary)]">
                    {formatPrice(v.price)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleSold(v)}
                        className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                      >
                        {v.sold ? "Mark as unsold" : "Tag as sold"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(v)}
                        disabled={
                          !v.featured && featuredCount >= FEATURED_MAX
                        }
                        className="text-sm font-medium text-[var(--color-primary)] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {v.featured ? "Remove from featured" : "Add to featured"}
                      </button>
                      <Link
                        href={`/admin/products/${v.slug}/edit`}
                        className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/inventory/${v.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--color-primary)] opacity-80 hover:underline"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(v.slug, `${v.year} ${v.make} ${v.model}`)
                        }
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
