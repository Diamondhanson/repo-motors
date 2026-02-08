"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const makes = ["All Makes", "Toyota", "Honda", "Ford", "BMW", "Mercedes-Benz"];
const models = ["All Models", "Camry", "Accord", "F-150", "3 Series", "C-Class"];
const priceRanges = [
  { label: "Any Price", min: "", max: "" },
  { label: "Under ₦5M", min: "0", max: "5000000" },
  { label: "₦5M - ₦10M", min: "5000000", max: "10000000" },
  { label: "₦10M - ₦20M", min: "10000000", max: "20000000" },
  { label: "Over ₦20M", min: "20000000", max: "" },
];

export function HeroSearchFilters() {
  const router = useRouter();
  const [make, setMake] = useState("All Makes");
  const [model, setModel] = useState("All Models");
  const [priceRange, setPriceRange] = useState("Any Price");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make && make !== "All Makes") params.set("make", make);
    if (model && model !== "All Models") params.set("model", model);
    const range = priceRanges.find((r) => r.label === priceRange);
    if (range?.min) params.set("minPrice", range.min);
    if (range?.max) params.set("maxPrice", range.max);
    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-8 flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end sm:gap-4 md:p-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex-1 sm:min-w-[140px]">
        <label
          htmlFor="make-filter"
          className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
        >
          Make
        </label>
        <select
          id="make-filter"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          style={{ borderColor: "var(--color-border)" }}
        >
          {makes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 sm:min-w-[140px]">
        <label
          htmlFor="model-filter"
          className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
        >
          Model
        </label>
        <select
          id="model-filter"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          style={{ borderColor: "var(--color-border)" }}
        >
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 sm:min-w-[140px]">
        <label
          htmlFor="price-filter"
          className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
        >
          Price Range
        </label>
        <select
          id="price-filter"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          style={{ borderColor: "var(--color-border)" }}
        >
          {priceRanges.map((r) => (
            <option key={r.label} value={r.label}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="rounded-[var(--radius-button)] bg-[var(--color-primary)] px-6 py-2 text-sm font-bold text-white hover:opacity-90"
      >
        Search Inventory
      </button>
    </form>
  );
}
