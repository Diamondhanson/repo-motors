import { NextResponse } from "next/server";
import { getReviews } from "@/app/lib/services/reviews";

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
    const reviews = await getReviews();
    const response = NextResponse.json(reviews);
    response.headers.set("Cache-Control", "private, no-cache, must-revalidate");
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
