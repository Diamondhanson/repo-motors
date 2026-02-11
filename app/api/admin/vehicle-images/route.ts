import crypto from "crypto";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase/server";

function requireAuth(request: Request): NextResponse | null {
  const session = request.headers.get("cookie")?.includes("admin_session=1");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth) return auth;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File size must be less than 5MB" },
      { status: 400 }
    );
  }

  const fileExt = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
  const arrayBuffer = await file.arrayBuffer();
  const fileBytes = new Uint8Array(arrayBuffer);

  const { error } = await supabaseServer.storage
    .from("vehicle-images")
    .upload(fileName, fileBytes, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseServer.storage
    .from("vehicle-images")
    .getPublicUrl(fileName);

  return NextResponse.json({ publicUrl: data.publicUrl, path: fileName });
}
