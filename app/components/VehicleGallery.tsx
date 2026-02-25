"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

interface VehicleGalleryProps {
  imageUrls: string[];
  alt: string;
  sold?: boolean;
}

function ExpandIcon() {
  return (
    <svg
      className="size-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function VehicleGallery({ imageUrls, alt, sold }: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!fullscreenOpen) return;
      if (e.key === "Escape") setFullscreenOpen(false);
      if (e.key === "ArrowLeft")
        setSelectedIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1));
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i === imageUrls.length - 1 ? 0 : i + 1));
    },
    [fullscreenOpen, imageUrls.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const currentImage = imageUrls[selectedIndex] ?? imageUrls[0];

  return (
    <>
      <div className="animate-[fadeIn_0.5s_ease-out]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-border)]">
          <Image
            src={currentImage}
            alt={`${alt} - image ${selectedIndex + 1}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 65vw"
          />
          {sold && (
            <span className="absolute left-3 top-3 z-10 rounded bg-green-600 px-3 py-1 text-xs font-bold text-white">
              Sold
            </span>
          )}
          <span className="absolute right-3 top-3 z-10 rounded bg-[var(--color-accent)] px-3 py-1 text-xs font-bold text-white">
            Bank Seized
          </span>
          <button
            type="button"
            onClick={() => setFullscreenOpen(true)}
            className="absolute bottom-3 right-3 flex items-center gap-2 rounded-[var(--radius-button)] bg-black/60 px-3 py-2 text-sm font-medium text-white hover:bg-black/80"
            aria-label="View full screen"
          >
            <ExpandIcon />
            Full Screen
          </button>
        </div>

        {imageUrls.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {imageUrls.map((url, i) => (
              <button
                key={url}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded border-2 transition-colors ${
                  i === selectedIndex
                    ? "border-[var(--color-primary)]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{
                  borderColor:
                    i === selectedIndex ? "var(--color-primary)" : undefined,
                }}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {fullscreenOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal
          aria-label="Image gallery fullscreen"
        >
          <button
            type="button"
            onClick={() => setFullscreenOpen(false)}
            className="absolute right-4 top-4 rounded-[var(--radius-button)] p-2 text-white hover:bg-white/20"
            aria-label="Close fullscreen"
          >
            <CloseIcon />
          </button>
          <div className="relative h-full w-full max-w-5xl px-4 py-16">
            <Image
              src={currentImage}
              alt={`${alt} - fullscreen`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {imageUrls.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((i) =>
                    i === 0 ? imageUrls.length - 1 : i - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-[var(--radius-button)] bg-white/20 p-2 text-white hover:bg-white/40"
                aria-label="Previous image"
              >
                <svg
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((i) =>
                    i === imageUrls.length - 1 ? 0 : i + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-[var(--radius-button)] bg-white/20 p-2 text-white hover:bg-white/40"
                aria-label="Next image"
              >
                <svg
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
