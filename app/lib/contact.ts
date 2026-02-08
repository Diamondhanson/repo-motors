export const CONTACT_EMAIL = "info@repomotors.com";
export const WHATSAPP_NUMBER = "2348012345678";
export const TIKTOK_USERNAME = "repomotors";

function buildContactUrl(
  type: "interest" | "inspection",
  vehicle?: { year: number; make: string; model: string; stockId?: string; slug?: string }
) {
  const params = new URLSearchParams();
  params.set("type", type);
  if (vehicle) {
    params.set("vehicle", `${vehicle.year} ${vehicle.make} ${vehicle.model}`);
    if (vehicle.stockId) params.set("stockId", vehicle.stockId);
  }
  return `/contact?${params.toString()}`;
}

export function getContactUrl(
  type: "interest" | "inspection",
  vehicle?: { year: number; make: string; model: string; stockId?: string; slug?: string }
) {
  return buildContactUrl(type, vehicle);
}

export function getInterestContactUrl(vehicle?: {
  year: number;
  make: string;
  model: string;
  stockId?: string;
  slug?: string;
}) {
  return buildContactUrl("interest", vehicle);
}

export function getInspectionContactUrl(vehicle?: {
  year: number;
  make: string;
  model: string;
  stockId?: string;
}) {
  return buildContactUrl("inspection", vehicle);
}
