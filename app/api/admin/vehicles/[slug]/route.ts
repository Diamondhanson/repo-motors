import { NextResponse } from "next/server";
import {
  getVehicleBySlug,
  updateVehicle,
  deleteVehicle,
} from "@/app/lib/services/vehicles";
import type { Vehicle } from "@/app/lib/types";

function requireAuth(request: Request): NextResponse | null {
  const session = request.headers.get("cookie")?.includes("admin_session=1");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = requireAuth(_request);
  if (auth) return auth;

  try {
    const { slug } = await params;
    const vehicle = await getVehicleBySlug(slug);
    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }
    return NextResponse.json(vehicle);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch vehicle" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = requireAuth(request);
  if (auth) return auth;

  try {
    const { slug } = await params;
    const body = await request.json();
    const vehicle = await updateVehicle(slug, body as Partial<Vehicle>);
    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }
    return NextResponse.json(vehicle);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = requireAuth(_request);
  if (auth) return auth;

  try {
    const { slug } = await params;
    const deleted = await deleteVehicle(slug);
    if (!deleted) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
