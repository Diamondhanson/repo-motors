"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { InventoryVehicle } from "@/app/data/inventory";
import { InventoryFilters, type FilterState } from "../components/InventoryFilters";
import { InventoryFilterDrawer } from "../components/InventoryFilterDrawer";
import { InventoryCard } from "../components/InventoryCard";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  makes: [],
  minYear: 2011,
  maxYear: 2025,
  minPrice: 0,
  maxPrice: 25_000_000,
  minMileage: 0,
  maxMileage: 200_000,
};

type SortOption = "price-asc" | "price-desc" | "newest";

interface InventoryContentProps {
  vehicles: InventoryVehicle[];
}

export function InventoryContent({ vehicles }: InventoryContentProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("price-asc");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (make || model || minPrice || maxPrice) {
      setFilters((prev) => ({
        ...prev,
        search: model || make || prev.search,
        makes: make ? [make] : prev.makes,
        minPrice: minPrice ? Number(minPrice) : prev.minPrice,
        maxPrice: maxPrice ? Number(maxPrice) : prev.maxPrice,
      }));
    }
  }, [searchParams]);

  const filteredAndSorted = useMemo(() => {
    let list = vehicles.filter((v) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !v.make.toLowerCase().includes(q) &&
          !v.model.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (filters.makes.length > 0 && !filters.makes.includes(v.make)) {
        return false;
      }
      if (v.year < filters.minYear || v.year > filters.maxYear) return false;
      if (v.price < filters.minPrice || v.price > filters.maxPrice)
        return false;
      if (v.mileage < filters.minMileage || v.mileage > filters.maxMileage)
        return false;
      return true;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      list = [...list].sort((a, b) => b.year - a.year);
    }

    return list;
  }, [vehicles, filters, sort]);

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-primary)] md:text-3xl">
            Bank Repossessed & Pre-Owned Vehicles
          </h1>
          <p className="mt-2 text-[var(--color-primary)] opacity-80">
            Browse our inventory of certified used cars at fixed prices.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside
            className="lg:sticky lg:top-24 lg:h-fit lg:w-1/4 lg:flex-shrink-0"
            aria-label="Filter vehicles"
          >
            <div className="hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 lg:block">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--color-primary)]">
                Filters
              </h2>
              <InventoryFilters filters={filters} onChange={setFilters} />
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-primary)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] lg:hidden"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </button>
          </aside>

          <section className="flex-1 lg:w-3/4" aria-label="Vehicle listings">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[var(--color-primary)]">
                Showing <strong>{filteredAndSorted.length}</strong> available
                vehicles
              </p>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-inventory"
                  className="text-sm font-medium text-[var(--color-primary)]"
                >
                  Sort by
                </label>
                <select
                  id="sort-inventory"
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value as SortOption)
                  }
                  className="rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filteredAndSorted.length > 0 ? (
                filteredAndSorted.map((vehicle) => (
                  <InventoryCard key={vehicle.slug} vehicle={vehicle} />
                ))
              ) : (
                <p className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-12 text-center text-[var(--color-primary)] opacity-80">
                  No vehicles match your filters. Try adjusting your criteria.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      <InventoryFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
      />
    </main>
  );
}
