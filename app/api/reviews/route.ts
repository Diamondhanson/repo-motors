import { NextResponse } from "next/server";
import { getReviews, getReviewsForHome, createReview } from "@/app/lib/services/reviews";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const reviews = limitParam
      ? await getReviewsForHome(parseInt(limitParam, 10) || 4)
      : await getReviews();
    const response = NextResponse.json(reviews);
    response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, text } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: "Name and review text are required" },
        { status: 400 }
      );
    }

    const review = await createReview({
      name: String(name).trim(),
      text: String(text).trim(),
    });

    return NextResponse.json({ success: true, id: review.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
