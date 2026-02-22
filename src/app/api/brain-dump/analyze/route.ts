import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzeBrainDump } from "@/lib/openai/brain-dump";
import { generateMockup } from "@/lib/openai/mockup";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rawText, imageUrls, briefId } = await request.json();

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json({ error: "Please describe your product idea" }, { status: 400 });
    }

    // Filter out blob/data URIs — only pass to OpenAI, don't store in DB
    const validImageUrls = (imageUrls || []).filter(
      (url: string) => url && (url.startsWith("data:") || url.startsWith("http"))
    );

    // Step 1: Text analysis
    const analysis = await analyzeBrainDump(rawText, validImageUrls.length > 0 ? validImageUrls : undefined);

    // Step 2: Generate mockup in parallel (non-blocking — don't fail the whole request)
    const mockupUrl = await generateMockup(analysis).catch(() => null);

    // Don't store base64 data URIs in DB (too large)
    const storedImages = (imageUrls || []).filter(
      (url: string) => url && url.startsWith("http")
    );

    const aiRenderings = mockupUrl ? [mockupUrl] : [];

    // Update or create brief
    if (briefId) {
      const { data, error } = await supabase
        .from("product_briefs")
        .update({
          raw_text_input: rawText,
          uploaded_images: storedImages,
          title: analysis.title,
          category: analysis.category,
          description: analysis.description,
          target_audience: analysis.target_audience,
          specifications: analysis.specifications,
          estimated_unit_cost_min: analysis.estimated_unit_cost_min,
          estimated_unit_cost_max: analysis.estimated_unit_cost_max,
          estimated_moq: analysis.estimated_moq,
          ai_renderings: aiRenderings,
          status: "draft",
          updated_at: new Date().toISOString(),
        })
        .eq("id", briefId)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ brief: data, analysis, mockupUrl });
    } else {
      const { data, error } = await supabase
        .from("product_briefs")
        .insert({
          user_id: user.id,
          raw_text_input: rawText,
          uploaded_images: storedImages,
          title: analysis.title,
          category: analysis.category,
          description: analysis.description,
          target_audience: analysis.target_audience,
          specifications: analysis.specifications,
          estimated_unit_cost_min: analysis.estimated_unit_cost_min,
          estimated_unit_cost_max: analysis.estimated_unit_cost_max,
          estimated_moq: analysis.estimated_moq,
          ai_renderings: aiRenderings,
          status: "draft",
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ brief: data, analysis, mockupUrl });
    }
  } catch (error) {
    console.error("Brain dump analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze your idea. Please try again." },
      { status: 500 }
    );
  }
}
