import { supabaseServer } from "../supabase/server";
import type { Vehicle } from "../types";

// Transform snake_case database fields to camelCase TypeScript
function dbToVehicle(dbRow: any): Vehicle {
  return {
    id: dbRow.id,
    make: dbRow.make,
    model: dbRow.model,
    year: dbRow.year,
    price: Number(dbRow.price),
    mileage: dbRow.mileage,
    downPayment: dbRow.down_payment ? Number(dbRow.down_payment) : undefined,
    imageUrls: dbRow.image_urls || [],
    slug: dbRow.slug,
    stockId: dbRow.stock_id,
    engine: dbRow.engine,
    transmission: dbRow.transmission,
    fuelType: dbRow.fuel_type,
    color: dbRow.color,
    vin: dbRow.vin,
    engineCapacity: dbRow.engine_capacity,
    driveTrain: dbRow.drive_train,
    description: dbRow.description,
    inspectionReport: dbRow.inspection_report || {},
    location: dbRow.location,
    features: dbRow.features || [],
    createdAt: dbRow.created_at,
    updatedAt: dbRow.updated_at,
  };
}

// Transform camelCase TypeScript to snake_case database fields
function vehicleToDb(vehicle: Partial<Vehicle>): any {
  const dbData: any = {};
  
  if (vehicle.make !== undefined) dbData.make = vehicle.make;
  if (vehicle.model !== undefined) dbData.model = vehicle.model;
  if (vehicle.year !== undefined) dbData.year = vehicle.year;
  if (vehicle.price !== undefined) dbData.price = vehicle.price;
  if (vehicle.mileage !== undefined) dbData.mileage = vehicle.mileage;
  if (vehicle.downPayment !== undefined) dbData.down_payment = vehicle.downPayment;
  if (vehicle.imageUrls !== undefined) dbData.image_urls = vehicle.imageUrls;
  if (vehicle.slug !== undefined) dbData.slug = vehicle.slug;
  if (vehicle.stockId !== undefined) dbData.stock_id = vehicle.stockId;
  if (vehicle.engine !== undefined) dbData.engine = vehicle.engine;
  if (vehicle.transmission !== undefined) dbData.transmission = vehicle.transmission;
  if (vehicle.fuelType !== undefined) dbData.fuel_type = vehicle.fuelType;
  if (vehicle.color !== undefined) dbData.color = vehicle.color;
  if (vehicle.vin !== undefined) dbData.vin = vehicle.vin;
  if (vehicle.engineCapacity !== undefined) dbData.engine_capacity = vehicle.engineCapacity;
  if (vehicle.driveTrain !== undefined) dbData.drive_train = vehicle.driveTrain;
  if (vehicle.description !== undefined) dbData.description = vehicle.description;
  if (vehicle.inspectionReport !== undefined) dbData.inspection_report = vehicle.inspectionReport;
  if (vehicle.location !== undefined) dbData.location = vehicle.location;
  if (vehicle.features !== undefined) dbData.features = vehicle.features;
  
  return dbData;
}

export async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabaseServer
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Failed to fetch vehicles");
  }

  return data ? data.map(dbToVehicle) : [];
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  const { data, error } = await supabaseServer
    .from("vehicles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Not found
      return undefined;
    }
    console.error("Error fetching vehicle:", error);
    throw new Error("Failed to fetch vehicle");
  }

  return data ? dbToVehicle(data) : undefined;
}

export async function createVehicle(
  data: Omit<Vehicle, "slug" | "id" | "createdAt" | "updatedAt"> & { slug?: string }
): Promise<Vehicle> {
  const slug =
    data.slug ||
    `${data.make}-${data.model}-${data.year}`.toLowerCase().replace(/\s+/g, "-");

  const vehicleData = {
    ...vehicleToDb({
      ...data,
      slug,
      imageUrls: data.imageUrls ?? [],
      inspectionReport: data.inspectionReport ?? {},
      features: data.features ?? [],
    }),
  };

  const { data: inserted, error } = await supabaseServer
    .from("vehicles")
    .insert(vehicleData)
    .select()
    .single();

  if (error) {
    console.error("Error creating vehicle:", error);
    throw new Error("Failed to create vehicle");
  }

  return dbToVehicle(inserted);
}

export async function updateVehicle(
  slug: string,
  data: Partial<Vehicle>
): Promise<Vehicle | undefined> {
  const vehicleData = vehicleToDb(data);

  const { data: updated, error } = await supabaseServer
    .from("vehicles")
    .update(vehicleData)
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Not found
      return undefined;
    }
    console.error("Error updating vehicle:", error);
    throw new Error("Failed to update vehicle");
  }

  return updated ? dbToVehicle(updated) : undefined;
}

export async function deleteVehicle(slug: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from("vehicles")
    .delete()
    .eq("slug", slug);

  if (error) {
    console.error("Error deleting vehicle:", error);
    return false;
  }

  return true;
}
