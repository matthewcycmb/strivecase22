import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("quotes")
      .select("*, manufacturers(*), product_briefs(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ quotes: data });
  } catch (error) {
    console.error("Fetch quotes error:", error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      briefId,
      manufacturerId,
      quantity,
      targetPricePerUnit,
      targetDeliveryDate,
      additionalNotes,
      isSample,
    } = await request.json();

    // Create quote request
    const { data: quote, error } = await supabase
      .from("quotes")
      .insert({
        brief_id: briefId,
        manufacturer_id: manufacturerId,
        user_id: user.id,
        quantity_requested: quantity,
        target_price_per_unit: targetPricePerUnit || null,
        target_delivery_date: targetDeliveryDate || null,
        additional_notes: additionalNotes || null,
        status: "pending",
      })
      .select("*, manufacturers(*), product_briefs(*)")
      .single();

    if (error) throw error;

    // Mock manufacturer response
    const brief = quote.product_briefs;
    const manufacturer = quote.manufacturers;

    const basePrice = brief?.estimated_unit_cost_min
      ? (brief.estimated_unit_cost_min + (brief.estimated_unit_cost_max || brief.estimated_unit_cost_min)) / 2
      : 5.0;

    let unitPrice: number;
    let leadTime: number;
    let responseNotes: string;

    if (isSample) {
      // Sample pricing: higher per-unit (1.5–2x) but no tooling, faster turnaround
      const sampleMultiplier = 1.5 + Math.random() * 0.5;
      unitPrice = Math.round(basePrice * sampleMultiplier * 100) / 100;
      leadTime = manufacturer?.lead_time_days_min
        ? Math.max(7, Math.floor(manufacturer.lead_time_days_min * 0.5))
        : 10;
      const totalSample = Math.round(unitPrice * quantity * 100) / 100;
      const bulkPrice = Math.round(basePrice * (0.85 + Math.random() * 0.3) * 100) / 100;

      responseNotes = `Thank you for your sample request! We'd be happy to produce ${quantity} sample units at $${unitPrice}/unit (total: $${totalSample}). Sample lead time is approximately ${leadTime} days. This includes standard materials and finishing so you can evaluate quality firsthand. No tooling fees for samples. Once you're satisfied, bulk pricing starts at ~$${bulkPrice}/unit at MOQ.`;
    } else {
      // Bulk pricing
      const varianceFactor = 0.85 + Math.random() * 0.3;
      unitPrice = Math.round(basePrice * varianceFactor * 100) / 100;
      leadTime = manufacturer?.lead_time_days_min
        ? manufacturer.lead_time_days_min + Math.floor(Math.random() * (manufacturer.lead_time_days_max - manufacturer.lead_time_days_min))
        : 21;

      responseNotes = `Thank you for your inquiry. We can manufacture this product at $${unitPrice}/unit for an order of ${quantity} units. Estimated lead time is ${leadTime} days from order confirmation. Tooling costs may apply for custom molds. We also offer sample runs of 5–10 units if you'd like to evaluate quality first.`;
    }

    const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

    const { data: updatedQuote, error: updateError } = await supabase
      .from("quotes")
      .update({
        unit_price: unitPrice,
        total_price: totalPrice,
        estimated_lead_time_days: leadTime,
        response_notes: responseNotes,
        status: "responded",
        responded_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", quote.id)
      .select("*, manufacturers(*), product_briefs(*)")
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ quote: updatedQuote });
  } catch (error) {
    console.error("Create quote error:", error);
    return NextResponse.json({ error: "Failed to create quote" }, { status: 500 });
  }
}
