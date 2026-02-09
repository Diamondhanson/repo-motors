"use client";

import { useEffect } from "react";
import { InventoryFilters } from "./InventoryFilters";
import type { FilterState } from "./InventoryFilters";
import type { FilterOptions } from "@/app/lib/services/vehicles";

interface InventoryFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset?: () => void;
  filterOptions: FilterOptions;
}

export function InventoryFilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  filterOptions,
}: InventoryFilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--color-border)] bg-[var(--color-background)] p-6 shadow-lg md:hidden"
        style={{ borderColor: "var(--color-border)" }}
        aria-label="Filter vehicles"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--color-primary)]">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[var(--radius-button)] p-2 text-[var(--color-primary)] hover:bg-[var(--color-border)]"
            aria-label="Close filters"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <InventoryFilters
          filters={filters}
          onChange={onChange}
          onApply={onClose}
          onReset={onReset ? () => { onReset(); onClose(); } : undefined}
          compact
          filterOptions={filterOptions}
        />
      </aside>
    </>
  );
}
