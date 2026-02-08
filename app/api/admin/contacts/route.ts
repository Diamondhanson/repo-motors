import { NextResponse } from "next/server";
import { getContacts } from "@/app/lib/services/contacts";

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
    const contacts = await getContacts();
    return NextResponse.json(contacts);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
