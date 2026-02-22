import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { matchManufacturers } from "@/lib/openai/matching";
import type { ProductBrief, Manufacturer } from "@/lib/types";

// GET: Load existing matches for a brief
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const briefId = request.nextUrl.searchParams.get("briefId");
    if (!briefId) {
      return NextResponse.json({ error: "briefId required" }, { status: 400 });
    }

    const { data: matches } = await supabase
      .from("manufacturer_matches")
      .select("*, manufacturers(*)")
      .eq("brief_id", briefId)
      .order("rank", { ascending: true });

    if (matches && matches.length > 0) {
      const formatted = matches.map((m) => ({
        ...m,
        manufacturer_id: m.manufacturer_id,
        match_score: m.match_score,
        reasoning: m.reasoning,
        rank: m.rank,
        manufacturer: m.manufacturers,
      }));
      return NextResponse.json({ matches: formatted });
    }

    return NextResponse.json({ matches: [] });
  } catch (error) {
    console.error("Load matches error:", error);
    return NextResponse.json({ error: "Failed to load matches" }, { status: 500 });
  }
}

// POST: Run AI matching (only if no existing matches)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { briefId } = await request.json();

    // Check if matches already exist
    const { data: existing } = await supabase
      .from("manufacturer_matches")
      .select("*, manufacturers(*)")
      .eq("brief_id", briefId)
      .order("rank", { ascending: true });

    if (existing && existing.length > 0) {
      const formatted = existing.map((m) => ({
        ...m,
        manufacturer: m.manufacturers,
      }));
      return NextResponse.json({ matches: formatted });
    }

    // Load brief
    const { data: brief, error: briefError } = await supabase
      .from("product_briefs")
      .select("*")
      .eq("id", briefId)
      .single();

    if (briefError || !brief) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }

    // Load all manufacturers
    const { data: manufacturers, error: mfgError } = await supabase
      .from("manufacturers")
      .select("*");

    if (mfgError || !manufacturers) {
      return NextResponse.json({ error: "Failed to load manufacturers" }, { status: 500 });
    }

    // Get AI matches
    const rawMatches = await matchManufacturers(
      brief as ProductBrief,
      manufacturers as Manufacturer[]
    );

    // Ensure matches is an array
    const matches = Array.isArray(rawMatches) ? rawMatches : [];

    if (matches.length === 0) {
      return NextResponse.json({ matches: [] });
    }

    // Insert new matches (use upsert to avoid duplicate key errors)
    const matchRecords = matches.map((match: { manufacturer_id: string; match_score: number; reasoning: Record<string, unknown> }, index: number) => ({
      brief_id: briefId,
      manufacturer_id: match.manufacturer_id,
      match_score: match.match_score,
      reasoning: match.reasoning,
      rank: index + 1,
    }));

    const { error: insertError } = await supabase
      .from("manufacturer_matches")
      .upsert(matchRecords, { onConflict: "brief_id,manufacturer_id" });

    if (insertError) {
      console.error("Insert matches error:", insertError);
    }

    // Update brief status
    await supabase
      .from("product_briefs")
      .update({ status: "matched", updated_at: new Date().toISOString() })
      .eq("id", briefId);

    // Return matches with manufacturer details
    const matchesWithDetails = matches.map((match: { manufacturer_id: string; match_score: number; reasoning: Record<string, unknown> }, index: number) => ({
      ...match,
      rank: index + 1,
      manufacturer: manufacturers.find((m) => m.id === match.manufacturer_id),
    }));

    return NextResponse.json({ matches: matchesWithDetails });
  } catch (error) {
    console.error("Matching error:", error);
    return NextResponse.json(
      { error: "Failed to match manufacturers" },
      { status: 500 }
    );
  }
}
