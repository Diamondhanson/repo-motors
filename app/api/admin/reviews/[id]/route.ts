import { NextResponse } from "next/server";
import { deleteReview } from "@/app/lib/services/reviews";

function requireAuth(request: Request): NextResponse | null {
  const session = request.headers.get("cookie")?.includes("admin_session=1");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAuth(_request);
  if (auth) return auth;

  try {
    const { id } = await params;
    await deleteReview(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
