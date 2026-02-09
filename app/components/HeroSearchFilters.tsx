"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FilterOptions } from "../lib/services/vehicles";

const priceRanges = [
  { label: "Any Price", min: "", max: "" },
  { label: "Under $5K", min: "0", max: "5000" },
  { label: "$5K - $10K", min: "5000", max: "10000" },
  { label: "$10K - $20K", min: "10000", max: "20000" },
  { label: "Over $20K", min: "20000", max: "" },
];

interface HeroSearchFiltersProps {
  filterOptions: FilterOptions;
}

export function HeroSearchFilters({ filterOptions }: HeroSearchFiltersProps) {
  const makes = ["All Makes", ...filterOptions.makes];
  const models = ["All Models", ...filterOptions.models];
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
