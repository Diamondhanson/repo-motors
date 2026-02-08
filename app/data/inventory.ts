import {
  getVehicles as getVehiclesFromService,
  getVehicleBySlug as getVehicleBySlugFromService,
} from "@/app/lib/services/vehicles";
import type { Vehicle } from "@/app/lib/types";

export type { InspectionReport } from "@/app/lib/types";
export type InventoryVehicle = Vehicle;

export async function getVehicles(): Promise<InventoryVehicle[]> {
  return getVehiclesFromService();
}

export async function getVehicleBySlug(
  slug: string
): Promise<InventoryVehicle | undefined> {
  return getVehicleBySlugFromService(slug);
}
