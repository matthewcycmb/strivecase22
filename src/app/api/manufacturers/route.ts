import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;

    const category = searchParams.get("category");
    const minRating = searchParams.get("minRating");
    const verified = searchParams.get("verified");
    const search = searchParams.get("search");

    let query = supabase
      .from("manufacturers")
      .select("*")
      .order("composite_rating", { ascending: false });

    if (category) {
      query = query.contains("categories", [category]);
    }

    if (minRating) {
      query = query.gte("composite_rating", parseFloat(minRating));
    }

    if (verified === "true") {
      query = query.eq("verification_status", "verified");
    }

    if (search) {
      query = query.or(
        `business_name.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) throw error;
    return NextResponse.json({ manufacturers: data });
  } catch (error) {
    console.error("Fetch manufacturers error:", error);
    return NextResponse.json({ error: "Failed to fetch manufacturers" }, { status: 500 });
  }
}
