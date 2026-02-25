import { supabaseServer } from "../supabase/server";
import type { Vehicle } from "../types";

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface MileageRange {
  label: string;
  min: number;
  max: number;
}

export interface FilterOptions {
  makes: string[];
  models: string[];
  years: number[];
  priceRanges: PriceRange[];
  mileageRanges: MileageRange[];
}

// Transform snake_case database fields to camelCase TypeScript
function dbToVehicle(dbRow: any): Vehicle {
  return {
    id: dbRow.id,
    featured: dbRow.featured ?? false,
    sold: dbRow.sold ?? false,
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
  if (vehicle.featured !== undefined) dbData.featured = vehicle.featured;
  if (vehicle.sold !== undefined) dbData.sold = vehicle.sold;
  
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

const FEATURED_MAX = 6;

export async function getFeaturedCount(): Promise<number> {
  const { count, error } = await supabaseServer
    .from("vehicles")
    .select("*", { count: "exact", head: true })
    .eq("featured", true);

  if (error) return 0;
  return count ?? 0;
}

export async function getFeaturedVehiclesForHome(): Promise<Vehicle[]> {
  const { data: featuredData } = await supabaseServer
    .from("vehicles")
    .select("*")
    .eq("featured", true)
    .order("updated_at", { ascending: false })
    .limit(FEATURED_MAX);

  const featured = featuredData ? featuredData.map(dbToVehicle) : [];
  const remaining = FEATURED_MAX - featured.length;

  if (remaining <= 0) return featured;

  const { data: recentData } = await supabaseServer
    .from("vehicles")
    .select("*")
    .eq("featured", false)
    .order("created_at", { ascending: false })
    .limit(remaining);

  const recent = recentData ? recentData.map(dbToVehicle) : [];
  return [...featured, ...recent];
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
  if (data.featured) {
    const count = await getFeaturedCount();
    if (count >= FEATURED_MAX) {
      throw new Error("Maximum 6 featured vehicles. Remove one to add another.");
    }
  }

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
  if (data.featured === true) {
    const existing = await getVehicleBySlug(slug);
    if (!existing?.featured) {
      const count = await getFeaturedCount();
      if (count >= FEATURED_MAX) {
        throw new Error("Maximum 6 featured vehicles. Remove one to add another.");
      }
    }
  }

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

const PRICE_MAX = 100_000;
const MILEAGE_MAX = 200_000;

const PRICE_BUCKETS: PriceRange[] = [
  { label: "Any Price", min: 0, max: PRICE_MAX },
  { label: "Under $5K", min: 0, max: 5_000 },
  { label: "$5K - $10K", min: 5_000, max: 10_000 },
  { label: "$10K - $20K", min: 10_000, max: 20_000 },
  { label: "$20K - $30K", min: 20_000, max: 30_000 },
  { label: "Over $30K", min: 30_000, max: PRICE_MAX },
];

const MILEAGE_BUCKETS: MileageRange[] = [
  { label: "Any Mileage", min: 0, max: MILEAGE_MAX },
  { label: "Under 50k km", min: 0, max: 50_000 },
  { label: "50k - 100k km", min: 50_000, max: 100_000 },
  { label: "100k - 150k km", min: 100_000, max: 150_000 },
  { label: "150k - 200k km", min: 150_000, max: 200_000 },
  { label: "Over 200k km", min: 200_000, max: MILEAGE_MAX },
];

export async function getFilterOptions(): Promise<FilterOptions> {
  const { data, error } = await supabaseServer
    .from("vehicles")
    .select("make, model, year, price, mileage");

  if (error) {
    console.error("Error fetching filter options:", error);
    return {
      makes: [],
      models: [],
      years: [],
      priceRanges: PRICE_BUCKETS,
      mileageRanges: MILEAGE_BUCKETS,
    };
  }

  if (!data || data.length === 0) {
    const fallbackYears = Array.from(
      { length: 15 },
      (_, i) => new Date().getFullYear() - i
    );
    return {
      makes: [],
      models: [],
      years: fallbackYears,
      priceRanges: PRICE_BUCKETS,
      mileageRanges: MILEAGE_BUCKETS,
    };
  }

  // Extract unique values
  const makes = [...new Set(data.map((v) => v.make))].sort();
  const models = [...new Set(data.map((v) => v.model))].sort();
  const years = [...new Set(data.map((v) => v.year))].sort((a, b) => b - a);

  // Filter price/mileage buckets to those overlapping with actual data
  const minPrice = Math.min(...data.map((v) => Number(v.price)));
  const maxPrice = Math.max(...data.map((v) => Number(v.price)));
  const minMileage = Math.min(...data.map((v) => Number(v.mileage)));
  const maxMileage = Math.max(...data.map((v) => Number(v.mileage)));

  const filteredPriceBuckets = PRICE_BUCKETS.filter(
    (b) => b.label === "Any Price" || (b.max > minPrice && b.min < maxPrice)
  );
  const filteredMileageBuckets = MILEAGE_BUCKETS.filter(
    (b) =>
      b.label === "Any Mileage" || (b.max > minMileage && b.min < maxMileage)
  );

  return {
    makes,
    models,
    years,
    priceRanges: filteredPriceBuckets,
    mileageRanges: filteredMileageBuckets,
  };
}
