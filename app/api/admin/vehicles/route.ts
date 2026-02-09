import { NextResponse } from "next/server";
import { getVehicles, createVehicle } from "@/app/lib/services/vehicles";
import type { Vehicle } from "@/app/lib/types";

function requireAuth(request: Request): NextResponse | null {
  const session = request.headers.get("cookie")?.includes("admin_session=1");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (auth) return auth;

  try {
    const vehicles = await getVehicles();
    const response = NextResponse.json(vehicles);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120"
    );
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth) return auth;

  try {
    const body = await request.json();
    const vehicle = await createVehicle(body as Omit<Vehicle, "slug"> & { slug?: string });
    return NextResponse.json(vehicle);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
