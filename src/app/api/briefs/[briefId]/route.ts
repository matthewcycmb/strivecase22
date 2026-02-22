import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ briefId: string }> }
) {
  try {
    const { briefId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("product_briefs")
      .select("*")
      .eq("id", briefId)
      .single();

    if (error) throw error;
    return NextResponse.json({ brief: data });
  } catch (error) {
    console.error("Fetch brief error:", error);
    return NextResponse.json({ error: "Brief not found" }, { status: 404 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ briefId: string }> }
) {
  try {
    const { briefId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await request.json();

    const { data, error } = await supabase
      .from("product_briefs")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", briefId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ brief: data });
  } catch (error) {
    console.error("Update brief error:", error);
    return NextResponse.json({ error: "Failed to update brief" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ briefId: string }> }
) {
  try {
    const { briefId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("product_briefs")
      .delete()
      .eq("id", briefId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete brief error:", error);
    return NextResponse.json({ error: "Failed to delete brief" }, { status: 500 });
  }
}
