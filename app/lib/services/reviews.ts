import { supabaseServer } from "../supabase/server";
import type { Review } from "../types";

function dbToReview(dbRow: { id: string; name: string; text: string; created_at: string }): Review {
  return {
    id: dbRow.id,
    name: dbRow.name,
    text: dbRow.text,
    createdAt: dbRow.created_at,
  };
}

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabaseServer
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data ? data.map(dbToReview) : [];
}

export async function getReviewsForHome(limit: number): Promise<Review[]> {
  const { data, error } = await supabaseServer
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data ? data.map(dbToReview) : [];
}

export async function createReview(data: { name: string; text: string }): Promise<Review> {
  const { data: inserted, error } = await supabaseServer
    .from("reviews")
    .insert({
      name: data.name,
      text: data.text,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to create review");
  }

  return dbToReview(inserted);
}

export async function deleteReview(id: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting review:", error);
    throw new Error("Failed to delete review");
  }

  return true;
}
