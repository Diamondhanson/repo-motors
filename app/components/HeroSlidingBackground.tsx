"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80",
    alt: "Silver sedan on display",
  },
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&q=80",
    alt: "Luxury car exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80",
    alt: "SUV vehicle",
  },
];

const SLIDE_DURATION_MS = 5000;

export function HeroSlidingBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((img, index) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-[var(--color-primary)]/60"
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}
