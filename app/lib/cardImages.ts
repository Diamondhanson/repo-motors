/** Allowed in next.config remotePatterns (via.placeholder.com). */
export const CARD_IMAGE_PLACEHOLDER =
  "https://via.placeholder.com/640x480/e5e5e5/666666?text=No+image";

function trimNonEmpty(urls: string[] | undefined): string[] {
  return (urls ?? []).map((u) => u?.trim()).filter((u): u is string => Boolean(u));
}

/** Primary / secondary for hover cards; never returns empty strings. */
export function resolveCardHoverImages(imageUrls: string[] | undefined): {
  primary: string;
  secondary: string;
  hasSecond: boolean;
} {
  const valid = trimNonEmpty(imageUrls);
  if (valid.length === 0) {
    return {
      primary: CARD_IMAGE_PLACEHOLDER,
      secondary: CARD_IMAGE_PLACEHOLDER,
      hasSecond: false,
    };
  }
  if (valid.length === 1) {
    return { primary: valid[0], secondary: valid[0], hasSecond: false };
  }
  return { primary: valid[0], secondary: valid[1], hasSecond: true };
}

/** Gallery / detail: non-empty list with at least one URL for Next/Image. */
export function galleryImageUrls(imageUrls: string[] | undefined): string[] {
  const valid = trimNonEmpty(imageUrls);
  return valid.length > 0 ? valid : [CARD_IMAGE_PLACEHOLDER];
}
