"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, CheckCircle, Star, Package, Boxes } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { ProductBrief, Manufacturer } from "@/lib/types";

type OrderType = "sample" | "bulk";

export default function QuoteRequestPage({
  params,
}: {
  params: Promise<{ briefId: string; manufacturerId: string }>;
}) {
  const { briefId, manufacturerId } = use(params);
  const router = useRouter();
  const [brief, setBrief] = useState<ProductBrief | null>(null);
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("sample");
  const [quantity, setQuantity] = useState("5");
  const [targetPrice, setTargetPrice] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchData();
  }, [briefId, manufacturerId]);

  const fetchData = async () => {
    const supabase = createClient();

    const [briefRes, mfgRes] = await Promise.all([
      fetch(`/api/briefs/${briefId}`).then((r) => r.json()),
      supabase.from("manufacturers").select("*").eq("id", manufacturerId).single(),
    ]);

    setBrief(briefRes.brief);
    setManufacturer(mfgRes.data as Manufacturer);
    setLoading(false);
  };

  const handleOrderTypeChange = (type: OrderType) => {
    setOrderType(type);
    if (type === "sample") {
      setQuantity("5");
    } else {
      setQuantity(String(brief?.estimated_moq || manufacturer?.moq_min || 500));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const sampleNote = orderType === "sample"
        ? "[SAMPLE ORDER] "
        : "";

      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefId,
          manufacturerId,
          quantity: parseInt(quantity),
          targetPricePerUnit: targetPrice ? parseFloat(targetPrice) : null,
          additionalNotes: sampleNote + (notes || ""),
          isSample: orderType === "sample",
        }),
      });

      if (!res.ok) throw new Error("Quote request failed");

      toast.success("Quote request sent! Manufacturer has responded.");
      router.push("/quotes");
    } catch {
      toast.error("Failed to submit quote request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto max-w-2xl">
          <a href={`/matching/${briefId}`} className="text-sm text-zinc-400 hover:text-white">
            &larr; Back to Matches
          </a>
          <h1 className="mt-2 text-2xl font-bold text-white">Request a Quote</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 p-6">
        {/* Brief Summary with Mockup */}
        {brief && (
          <Card className="overflow-hidden border-white/10 bg-white/5">
            {brief.ai_renderings?.length > 0 && (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brief.ai_renderings[0]}
                  alt={`Mockup of ${brief.title}`}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-black/60 text-xs text-white backdrop-blur-sm">
                    AI Mockup
                  </Badge>
                </div>
              </div>
            )}
            <div className="p-4">
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-400">Product</h3>
              <p className="font-medium text-white">{brief.title}</p>
              <p className="mt-1 text-sm text-zinc-400">{brief.description}</p>
              {brief.estimated_unit_cost_min && (
                <p className="mt-2 text-sm text-zinc-500">
                  Est. cost: ${brief.estimated_unit_cost_min}–${brief.estimated_unit_cost_max} / unit
                </p>
              )}
            </div>
          </Card>
        )}

        {/* Manufacturer Info */}
        {manufacturer && (
          <Card className="border-white/10 bg-white/5 p-4">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-400">Manufacturer</h3>
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{manufacturer.business_name}</p>
              {manufacturer.verification_status === "verified" && (
                <CheckCircle className="h-4 w-4 text-blue-400" />
              )}
              <span className="flex items-center gap-1 text-sm text-yellow-400">
                <Star className="h-3 w-3 fill-current" />
                {Number(manufacturer.composite_rating).toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              {manufacturer.location_city}, {manufacturer.location_country} | MOQ: {manufacturer.moq_min}–{manufacturer.moq_max}
            </p>
            <div className="mt-2 flex gap-1">
              {manufacturer.certifications?.map((cert) => (
                <Badge key={cert} variant="secondary" className="bg-blue-500/10 text-xs text-blue-400">
                  {cert}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Order Type Selector */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">Order Type</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleOrderTypeChange("sample")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
                orderType === "sample"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <Package className={cn("h-6 w-6", orderType === "sample" ? "text-blue-400" : "text-zinc-500")} />
              <div>
                <p className={cn("font-medium", orderType === "sample" ? "text-white" : "text-zinc-300")}>
                  Sample Order
                </p>
                <p className="text-xs text-zinc-500">
                  5–10 units to test quality before bulk
                </p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleOrderTypeChange("bulk")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
                orderType === "bulk"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <Boxes className={cn("h-6 w-6", orderType === "bulk" ? "text-blue-400" : "text-zinc-500")} />
              <div>
                <p className={cn("font-medium", orderType === "bulk" ? "text-white" : "text-zinc-300")}>
                  Bulk Order
                </p>
                <p className="text-xs text-zinc-500">
                  Full production run at MOQ
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Sample Info Banner */}
        {orderType === "sample" && (
          <Card className="border-blue-500/20 bg-blue-500/5 p-4">
            <p className="text-sm text-zinc-300">
              Sample orders let you evaluate product quality, materials, and craftsmanship before committing to a full production run. Sample pricing is typically higher per unit but keeps your total investment low.
            </p>
          </Card>
        )}

        {/* Quote Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              {orderType === "sample" ? "Sample Quantity" : "Quantity"} <span className="text-red-400">*</span>
            </label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={1}
              max={orderType === "sample" ? 20 : undefined}
              required
              className="border-white/10 bg-white/5 text-white"
            />
            <p className="mt-1 text-xs text-zinc-500">
              {orderType === "sample"
                ? "Recommended: 5–10 units"
                : `Minimum: ${manufacturer?.moq_min || 1} units`}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Target Price per Unit (optional)
            </label>
            <Input
              type="number"
              step="0.01"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="e.g., 5.00"
              className="border-white/10 bg-white/5 text-white placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Additional Notes
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                orderType === "sample"
                  ? "Any specific details for the sample — colors, materials to test, finish options..."
                  : "Any specific requirements, packaging needs, or questions..."
              }
              className="border-white/10 bg-white/5 text-white placeholder:text-zinc-600"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || !quantity}
            className="w-full gap-2 bg-white text-zinc-900 hover:bg-zinc-200"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {submitting
              ? "Sending Request..."
              : orderType === "sample"
                ? "Request Sample Quote"
                : "Submit Quote Request"}
          </Button>
        </form>
      </main>
    </div>
  );
}
