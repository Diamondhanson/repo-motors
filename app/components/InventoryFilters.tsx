"use client";

import { useCallback } from "react";

export interface FilterState {
  search: string;
  makes: string[];
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
  minMileage: number;
  maxMileage: number;
}

const MAKES = ["Toyota", "Honda", "Ford", "BMW", "Mercedes-Benz"];
const YEARS = Array.from({ length: 15 }, (_, i) => 2011 + i).reverse();
const PRICE_MAX = 25_000_000;
const MILEAGE_MAX = 200_000;

interface InventoryFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply?: () => void;
  compact?: boolean;
}

export function InventoryFilters({
  filters,
  onChange,
  onApply,
  compact = false,
}: InventoryFiltersProps) {
  const update = useCallback(
    (updates: Partial<FilterState>) => {
      onChange({ ...filters, ...updates });
    },
    [filters, onChange]
  );

  const toggleMake = (make: string) => {
    const makes = filters.makes.includes(make)
      ? filters.makes.filter((m) => m !== make)
      : [...filters.makes, make];
    update({ makes });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="inventory-search"
          className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
        >
          Search
        </label>
        <input
          id="inventory-search"
          type="search"
          placeholder="e.g. Toyota"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-[var(--color-primary)] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          style={{ borderColor: "var(--color-border)" }}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-primary)]">
          Make / Model
        </p>
        <div className="flex flex-col gap-2">
          {MAKES.map((make) => (
            <label
              key={make}
              className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-primary)]"
            >
              <input
                type="checkbox"
                checked={filters.makes.includes(make)}
                onChange={() => toggleMake(make)}
                className="rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              {make}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-primary)]">
          Year Range
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="min-year" className="sr-only">
              Min Year
            </label>
            <select
              id="min-year"
              value={filters.minYear}
              onChange={(e) =>
                update({ minYear: Number(e.target.value) })
              }
              className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="max-year" className="sr-only">
              Max Year
            </label>
            <select
              id="max-year"
              value={filters.maxYear}
              onChange={(e) =>
                update({ maxYear: Number(e.target.value) })
              }
              className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-primary)]">
          Price (₦) {filters.minPrice > 0 || filters.maxPrice < PRICE_MAX ? `— ₦${(filters.minPrice / 1_000_000).toFixed(1)}M - ₦${(filters.maxPrice / 1_000_000).toFixed(1)}M` : ""}
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            step={500_000}
            value={filters.minPrice}
            onChange={(e) =>
              update({
                minPrice: Math.min(
                  Number(e.target.value),
                  filters.maxPrice - 500_000
                ),
              })
            }
            className="w-full accent-[var(--color-primary)]"
          />
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            step={500_000}
            value={filters.maxPrice}
            onChange={(e) =>
              update({
                maxPrice: Math.max(
                  Number(e.target.value),
                  filters.minPrice + 500_000
                ),
              })
            }
            className="w-full accent-[var(--color-primary)]"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-primary)]">
          Mileage (km) {filters.minMileage > 0 || filters.maxMileage < MILEAGE_MAX ? `— ${(filters.minMileage / 1000).toFixed(0)}k - ${(filters.maxMileage / 1000).toFixed(0)}k` : ""}
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={0}
            max={MILEAGE_MAX}
            step={10000}
            value={filters.minMileage}
            onChange={(e) =>
              update({
                minMileage: Math.min(
                  Number(e.target.value),
                  filters.maxMileage - 10000
                ),
              })
            }
            className="w-full accent-[var(--color-primary)]"
          />
          <input
            type="range"
            min={0}
            max={MILEAGE_MAX}
            step={10000}
            value={filters.maxMileage}
            onChange={(e) =>
              update({
                maxMileage: Math.max(
                  Number(e.target.value),
                  filters.minMileage + 10000
                ),
              })
            }
            className="w-full accent-[var(--color-primary)]"
          />
        </div>
      </div>

      {compact && onApply && (
        <button
          type="button"
          onClick={onApply}
          className="rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}
