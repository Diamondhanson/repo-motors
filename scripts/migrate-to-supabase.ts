#!/usr/bin/env node
/**
 * Migration script to transfer existing vehicle data from JSON to Supabase
 * Run once: npx tsx scripts/migrate-to-supabase.ts
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

// Load environment variables from .env.local
config({ path: join(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error("Make sure .env.local exists with:");
  console.error("  - NEXT_PUBLIC_SUPABASE_URL");
  console.error("  - SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface JsonVehicle {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  imageUrls: string[];
  slug: string;
  stockId: string;
  engine: string;
  transmission: string;
  fuelType: string;
  color: string;
  vin: string;
  engineCapacity: string;
  driveTrain: string;
  description: string;
  inspectionReport: any;
  location: string;
  features?: string[];
}

function transformToDb(vehicle: JsonVehicle) {
  return {
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    mileage: vehicle.mileage,
    down_payment: null, // No down payment in old data
    image_urls: vehicle.imageUrls,
    slug: vehicle.slug,
    stock_id: vehicle.stockId,
    engine: vehicle.engine,
    transmission: vehicle.transmission,
    fuel_type: vehicle.fuelType,
    color: vehicle.color,
    vin: vehicle.vin,
    engine_capacity: vehicle.engineCapacity,
    drive_train: vehicle.driveTrain,
    description: vehicle.description,
    inspection_report: vehicle.inspectionReport,
    location: vehicle.location,
    features: vehicle.features || [],
  };
}

async function migrate() {
  console.log("🚀 Starting migration from JSON to Supabase...\n");

  // Read vehicles from JSON file
  const dataPath = join(process.cwd(), "data", "vehicles.json");
  let vehicles: JsonVehicle[];

  try {
    const jsonData = readFileSync(dataPath, "utf-8");
    vehicles = JSON.parse(jsonData);
    console.log(`📖 Read ${vehicles.length} vehicles from JSON file`);
  } catch (error) {
    console.error("❌ Failed to read vehicles.json:", error);
    process.exit(1);
  }

  // Check if tables exist and are accessible
  console.log("\n🔍 Checking Supabase connection...");
  const { data: existingVehicles, error: checkError } = await supabase
    .from("vehicles")
    .select("slug")
    .limit(1);

  if (checkError) {
    console.error("❌ Cannot access vehicles table:", checkError.message);
    console.error("\n💡 Make sure you've run the SQL migration in Supabase SQL Editor:");
    console.error("   supabase/migrations/001_init_schema.sql");
    process.exit(1);
  }

  console.log("✅ Connected to Supabase successfully");

  // Check for existing vehicles
  const { data: allExisting, error: countError } = await supabase
    .from("vehicles")
    .select("slug");

  if (countError) {
    console.error("❌ Error checking existing vehicles:", countError);
    process.exit(1);
  }

  const existingSlugs = new Set(allExisting?.map((v) => v.slug) || []);
  console.log(`\n📊 Found ${existingSlugs.size} existing vehicles in database`);

  // Insert vehicles
  let inserted = 0;
  let skipped = 0;
  let failed = 0;

  for (const vehicle of vehicles) {
    if (existingSlugs.has(vehicle.slug)) {
      console.log(`⏭️  Skipped: ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.slug}) - already exists`);
      skipped++;
      continue;
    }

    const dbVehicle = transformToDb(vehicle);
    const { error } = await supabase
      .from("vehicles")
      .insert(dbVehicle);

    if (error) {
      console.error(`❌ Failed: ${vehicle.year} ${vehicle.make} ${vehicle.model} - ${error.message}`);
      failed++;
    } else {
      console.log(`✅ Inserted: ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.slug})`);
      inserted++;
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Migration Summary:");
  console.log("=".repeat(50));
  console.log(`✅ Successfully inserted: ${inserted}`);
  console.log(`⏭️  Skipped (already exist): ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📝 Total vehicles in JSON: ${vehicles.length}`);
  console.log("=".repeat(50));

  if (failed > 0) {
    console.log("\n⚠️  Some vehicles failed to migrate. Check errors above.");
    process.exit(1);
  } else if (inserted === 0 && skipped === vehicles.length) {
    console.log("\n✅ All vehicles already exist in database. No action needed.");
  } else {
    console.log("\n🎉 Migration completed successfully!");
  }
}

migrate().catch((error) => {
  console.error("\n❌ Migration failed:", error);
  process.exit(1);
});
