"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RevealOnScroll } from "./RevealOnScroll";
import { getInterestContactUrl } from "../lib/contact";
import type { InventoryVehicle } from "../data/inventory";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

const formatMileage = (km: number) =>
  `${(km / 1000).toFixed(0)}k km`;

interface InventoryCardProps {
  vehicle: InventoryVehicle;
}

export function InventoryCard({ vehicle }: InventoryCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const { make, model, year, price, mileage, imageUrls, slug } = vehicle;
  const alt = `${year} ${make} ${model} - Bank Repossessed Vehicle`;
  const primaryImage = imageUrls[0] ?? "";
  const secondaryImage = imageUrls[1] ?? imageUrls[0];

  return (
    <RevealOnScroll>
      <article
        className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[#f5f2ed] transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)] lg:flex-row"
        style={{ borderColor: "var(--color-border)" }}
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => setHoveredIndex(0)}
      >
        <Link
          href={`/inventory/${slug}`}
          className="relative block flex-shrink-0 lg:w-72"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-border)] lg:aspect-[16/10] lg:h-full lg:min-h-[140px]">
            <Image
              src={primaryImage}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 288px"
              className="object-cover transition-transform duration-500 ease-out"
              style={{
                transform:
                  hoveredIndex === 1 ? "translateX(-100%)" : "translateX(0)",
              }}
              loading="lazy"
            />
            <Image
              src={secondaryImage}
              alt={`${alt} - alternate view`}
              fill
              sizes="(max-width: 1024px) 100vw, 288px"
              className="absolute inset-0 object-cover transition-transform duration-500 ease-out"
              style={{
                transform:
                  hoveredIndex === 1 ? "translateX(0)" : "translateX(100%)",
              }}
              loading="lazy"
            />
            <span
              className="absolute right-2 top-2 rounded bg-[var(--color-accent)] px-2 py-0.5 text-xs font-bold text-white"
              aria-hidden
            >
              Bank Seized
            </span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col justify-between p-4 lg:flex-row lg:items-center lg:p-6">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[var(--color-primary)]">
              {year} {make} {model}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-primary)] opacity-80">
              {formatMileage(mileage)} • Bank Repossessed
            </p>
            <div className="mt-2 rounded border border-[var(--color-border)] bg-white/60 px-3 py-2">
              <p className="text-xs font-medium text-[var(--color-primary)] opacity-80">
                Vehicle Inspection Reports
              </p>
              <p className="text-sm text-[var(--color-primary)]">
                Available on request
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-start gap-3 lg:mt-0 lg:items-end">
            <div className="text-right">
              <p className="text-xl font-bold text-[var(--color-accent)]">
                {formatPrice(price)}
              </p>
              {vehicle.downPayment && vehicle.downPayment > 0 && (
                <p className="mt-1 text-xs font-bold text-[var(--color-accent)]">
                  Down Payment: {formatPrice(vehicle.downPayment)}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={getInterestContactUrl({ year, make, model, stockId: vehicle.stockId, slug })}
                className="rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
              >
                I&apos;m Interested
              </Link>
              <Link
                href={`/inventory/${slug}`}
                className="rounded-[var(--radius-button)] border border-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:opacity-90"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  );
}
