"use client";

import { useCallback } from "react";
import type { FilterOptions } from "@/app/lib/services/vehicles";

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

interface InventoryFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply?: () => void;
  onReset?: () => void;
  compact?: boolean;
  filterOptions: FilterOptions;
}

function rangeKey(min: number, max: number) {
  return `${min}-${max}`;
}

export function InventoryFilters({
  filters,
  onChange,
  onApply,
  onReset,
  compact = false,
  filterOptions,
}: InventoryFiltersProps) {
  const update = useCallback(
    (updates: Partial<FilterState>) => {
      onChange({ ...filters, ...updates });
    },
    [filters, onChange]
  );

  const selectedPriceKey = rangeKey(filters.minPrice, filters.maxPrice);
  const selectedMileageKey = rangeKey(filters.minMileage, filters.maxMileage);

  const toggleMake = (make: string) => {
    const makes = filters.makes.includes(make)
      ? filters.makes.filter((m) => m !== make)
      : [...filters.makes, make];
    update({ makes });
  };

  return (
    <div className="flex flex-col gap-6">
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="rounded-[var(--radius-button)] border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-border)]"
          style={{ borderColor: "var(--color-border)" }}
        >
          Reset Filters
        </button>
      )}
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
          {filterOptions.makes.map((make) => (
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
              {filterOptions.years.map((y) => (
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
              {filterOptions.years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="price-filter"
          className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
        >
          Price
        </label>
        <select
          id="price-filter"
          value={
            filterOptions.priceRanges.find(
              (r) => rangeKey(r.min, r.max) === selectedPriceKey
            )?.label ?? filterOptions.priceRanges[0]?.label ?? "Any Price"
          }
          onChange={(e) => {
            const range = filterOptions.priceRanges.find(
              (r) => r.label === e.target.value
            );
            if (range) {
              update({ minPrice: range.min, maxPrice: range.max });
            }
          }}
          className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          {filterOptions.priceRanges.map((r) => (
            <option key={rangeKey(r.min, r.max)} value={r.label}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="mileage-filter"
          className="mb-1 block text-sm font-medium text-[var(--color-primary)]"
        >
          Mileage
        </label>
        <select
          id="mileage-filter"
          value={
            filterOptions.mileageRanges.find(
              (r) => rangeKey(r.min, r.max) === selectedMileageKey
            )?.label ?? filterOptions.mileageRanges[0]?.label ?? "Any Mileage"
          }
          onChange={(e) => {
            const range = filterOptions.mileageRanges.find(
              (r) => r.label === e.target.value
            );
            if (range) {
              update({ minMileage: range.min, maxMileage: range.max });
            }
          }}
          className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          {filterOptions.mileageRanges.map((r) => (
            <option key={rangeKey(r.min, r.max)} value={r.label}>
              {r.label}
            </option>
          ))}
        </select>
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
