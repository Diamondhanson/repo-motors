"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getInterestContactUrl } from "../lib/contact";

export interface VehicleCardProps {
  make: string;
  model: string;
  year: number;
  price: number;
  downPayment?: number;
  imageUrls: string[];
  slug: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

export function VehicleCard({
  make,
  model,
  year,
  price,
  downPayment,
  imageUrls,
  slug,
}: VehicleCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const alt = `${year} ${make} ${model}`;

  const primaryImage = imageUrls[0] ?? "";
  const secondaryImage = imageUrls[1] ?? imageUrls[0];

  return (
    <article
      className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
      style={{ borderColor: "var(--color-border)" }}
      onMouseEnter={() => setHoveredIndex(1)}
      onMouseLeave={() => setHoveredIndex(0)}
    >
      <Link href={`/inventory/${slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-border)]">
          <Image
            src={primaryImage}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out"
            style={{
              transform: hoveredIndex === 1 ? "translateX(-100%)" : "translateX(0)",
            }}
            loading="lazy"
          />
          <Image
            src={secondaryImage}
            alt={`${alt} - alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="absolute inset-0 object-cover transition-transform duration-500 ease-out"
            style={{
              transform: hoveredIndex === 1 ? "translateX(0)" : "translateX(100%)",
            }}
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[var(--color-primary)]">
          {make} {model}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-primary)] opacity-80">
          {year}
        </p>
        <div className="mt-2">
          <p className="text-lg font-bold text-[var(--color-accent)]">
            {formatPrice(price)}
          </p>
          {downPayment && downPayment > 0 && (
            <p className="mt-1 text-xs font-bold text-[var(--color-accent)]">
              Down Payment: {formatPrice(downPayment)}
            </p>
          )}
        </div>
       
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={getInterestContactUrl({ year, make, model, slug })}
            className="inline-block rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            I&apos;m Interested
          </Link>
          <Link
            href={`/inventory/${slug}`}
            className="inline-block rounded-[var(--radius-button)] border border-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:opacity-90"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
