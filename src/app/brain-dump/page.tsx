"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  ArrowRight,
  Loader2,
  Upload,
  X,
  FileText,
  Factory,
  MessageSquareQuote,
  Check,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BriefAnalysis {
  title: string;
  category: string;
  description: string;
  target_audience: string;
  specifications: {
    materials: string[];
    dimensions: string;
    weight: string;
    colors: string[];
    features: string[];
    finish: string;
  };
  estimated_unit_cost_min: number;
  estimated_unit_cost_max: number;
  estimated_moq: number;
  cost_breakdown?: {
    materials_pct: number;
    labor_pct: number;
    tooling_pct: number;
    overhead_and_margin_pct: number;
  };
  key_considerations: string[];
}

const STEPS = [
  { label: "Describe Idea", icon: FileText },
  { label: "Match Manufacturers", icon: Factory },
  { label: "Get Quotes", icon: MessageSquareQuote },
];

export default function BrainDumpPage() {
  const router = useRouter();
  const [rawText, setRawText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<BriefAnalysis | null>(null);
  const [mockupUrl, setMockupUrl] = useState<string | null>(null);
  const [briefId, setBriefId] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [findingMatches, setFindingMatches] = useState(false);
  const [retailPrice, setRetailPrice] = useState("");

  const currentStep = analysis ? 1 : 0;

  const handleAnalyze = async () => {
    if (!rawText.trim()) {
      toast.error("Please describe your product idea first");
      return;
    }

    setAnalyzing(true);
    try {
      const res = await fetch("/api/brain-dump/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText, imageUrls: images, briefId }),
      });

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      setAnalysis(data.analysis);
      setMockupUrl(data.mockupUrl || null);
      setBriefId(data.brief.id);
      toast.success("Product brief generated!");
    } catch {
      toast.error("Failed to analyze your idea. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFindManufacturers = async () => {
    if (!briefId) return;
    setFindingMatches(true);
    try {
      // Lock the brief first
      await fetch(`/api/briefs/${briefId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "locked" }),
      });
      router.push(`/matching/${briefId}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setFindingMatches(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const base64Urls = await Promise.all(
      Array.from(files).map((f) => fileToBase64(f))
    );
    setImages((prev) => [...prev, ...base64Urls]);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Step Bar */}
      <div className="border-b border-border bg-white px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    i < currentStep
                      ? "bg-[#0ea158] text-white"
                      : i === currentStep
                        ? "bg-[#156cc2] text-white"
                        : "bg-[#f4f1ee] text-[#757170]"
                  )}
                >
                  {i < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    i <= currentStep ? "text-[#1a1615]" : "text-[#757170]"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-px w-16 sm:w-24",
                    i < currentStep ? "bg-[#0ea158]" : "bg-[#e5dfda]"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Input Area */}
        <div className="flex w-1/2 flex-col border-r border-border bg-white p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-[#1a1615]">
              Describe Your Product Idea
            </h2>
            <p className="text-sm text-[#757170]">
              Tell us everything — what it is, who it&apos;s for, what it looks
              like. Be as detailed or vague as you want.
            </p>
          </div>

          <Textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="I want to create a biodegradable phone case made from bamboo fiber. It should be slim, come in earth-tone colors, and have a minimalist design with maybe a small logo embossed on the back. Target price around $15-20 retail..."
            className="mb-4 flex-1 resize-none border-border bg-[#f9f8f8] text-base text-[#1a1615] placeholder:text-[#757170]"
          />

          {/* Image Upload */}
          <div className="mb-4">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border p-3 text-sm text-[#757170] transition-colors hover:border-[#156cc2] hover:text-[#453f3d]">
              <Upload className="h-4 w-4" />
              Upload reference images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {images.length > 0 && (
              <div className="mt-2 flex gap-2">
                {images.map((url, i) => (
                  <div key={i} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <button
                      onClick={() =>
                        setImages((prev) => prev.filter((_, j) => j !== i))
                      }
                      className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleAnalyze}
              disabled={analyzing || !rawText.trim()}
              className="gap-2 bg-[#1a1615] text-white hover:bg-[#453f3d]"
            >
              {analyzing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {analyzing
                ? "Analyzing..."
                : analysis
                  ? "Re-Analyze"
                  : "Analyze Idea"}
            </Button>
          </div>
        </div>

        {/* Right: Brief Preview */}
        <div className="flex w-1/2 flex-col overflow-y-auto bg-[#f9f8f8] p-6" data-print-area>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1a1615]">
              Product Brief Preview
            </h2>
            {analysis && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="no-print gap-2 border-border text-[#757170] hover:text-[#1a1615]"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            )}
          </div>

          {!analysis && !analyzing && (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <Sparkles className="mx-auto mb-3 h-12 w-12 text-[#e5dfda]" />
                <p className="text-[#757170]">
                  Describe your idea on the left and click &quot;Analyze
                  Idea&quot; to generate your product brief.
                </p>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 bg-[#f4f1ee]" />
              <Skeleton className="h-4 w-1/3 bg-[#f4f1ee]" />
              <Skeleton className="aspect-square w-full rounded-xl bg-[#f4f1ee]" />
              <Skeleton className="h-20 w-full bg-[#f4f1ee]" />
              <Skeleton className="h-32 w-full bg-[#f4f1ee]" />
              <Skeleton className="h-16 w-full bg-[#f4f1ee]" />
            </div>
          )}

          {analysis && !analyzing && (
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#1a1615]">
                  {analysis.title}
                </h3>
                <Badge
                  variant="secondary"
                  className="mt-1 bg-[#156cc2]/10 text-[#156cc2]"
                >
                  {analysis.category?.replace(/_/g, " ")}
                </Badge>
              </div>

              {/* AI Mockup */}
              {mockupUrl && (
                <Card className="overflow-hidden border bg-white shadow-sm">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mockupUrl}
                      alt={`AI mockup of ${analysis.title}`}
                      className="w-full rounded-t-lg object-cover"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-black/60 text-xs text-white backdrop-blur-sm">
                        AI-Generated Mockup
                      </Badge>
                    </div>
                  </div>
                </Card>
              )}

              <Card className="border bg-white p-4 shadow-sm">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#757170]">
                  Description
                </h4>
                <p className="text-sm text-[#453f3d]">{analysis.description}</p>
              </Card>

              <Card className="border bg-white p-4 shadow-sm">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#757170]">
                  Target Audience
                </h4>
                <p className="text-sm text-[#453f3d]">
                  {analysis.target_audience}
                </p>
              </Card>

              {analysis.specifications && (
                <Card className="border bg-white p-4 shadow-sm">
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#757170]">
                    Specifications
                  </h4>
                  <div className="space-y-2 text-sm">
                    {analysis.specifications.materials?.length > 0 && (
                      <div>
                        <span className="text-[#757170]">Materials: </span>
                        <span className="text-[#453f3d]">
                          {analysis.specifications.materials.join(", ")}
                        </span>
                      </div>
                    )}
                    {analysis.specifications.dimensions && (
                      <div>
                        <span className="text-[#757170]">Dimensions: </span>
                        <span className="text-[#453f3d]">
                          {analysis.specifications.dimensions}
                        </span>
                      </div>
                    )}
                    {analysis.specifications.colors?.length > 0 && (
                      <div>
                        <span className="text-[#757170]">Colors: </span>
                        <span className="text-[#453f3d]">
                          {analysis.specifications.colors.join(", ")}
                        </span>
                      </div>
                    )}
                    {analysis.specifications.features?.length > 0 && (
                      <div>
                        <span className="text-[#757170]">Features: </span>
                        <span className="text-[#453f3d]">
                          {analysis.specifications.features.join(", ")}
                        </span>
                      </div>
                    )}
                    {analysis.specifications.finish && (
                      <div>
                        <span className="text-[#757170]">Finish: </span>
                        <span className="text-[#453f3d]">
                          {analysis.specifications.finish}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              <Card className="border bg-white p-4 shadow-sm">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#757170]">
                  Estimated Cost
                </h4>
                <p className="text-2xl font-bold text-[#1a1615]">
                  ${analysis.estimated_unit_cost_min} – $
                  {analysis.estimated_unit_cost_max}
                  <span className="ml-1 text-sm font-normal text-[#757170]">
                    per unit
                  </span>
                </p>
                <p className="mt-1 text-sm text-[#757170]">
                  Suggested MOQ: {analysis.estimated_moq} units
                </p>
              </Card>

              {/* Cost Breakdown */}
              {analysis.cost_breakdown && (
                <Card className="border bg-white p-4 shadow-sm">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#757170]">
                    Cost Breakdown
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "Materials", value: analysis.cost_breakdown.materials_pct, color: "bg-blue-500" },
                      { label: "Labor", value: analysis.cost_breakdown.labor_pct, color: "bg-green-500" },
                      { label: "Tooling", value: analysis.cost_breakdown.tooling_pct, color: "bg-amber-500" },
                      { label: "Overhead & Margin", value: analysis.cost_breakdown.overhead_and_margin_pct, color: "bg-purple-500" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-[#453f3d]">{item.label}</span>
                          <span className="font-medium text-[#1a1615]">{item.value}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-[#f4f1ee]">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Unit Economics Calculator */}
              <Card className="no-print border bg-white p-4 shadow-sm">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#757170]">
                  Unit Economics Calculator
                </h4>
                <div className="mb-3">
                  <label className="mb-1 block text-xs text-[#757170]">Your Retail Price ($)</label>
                  <Input
                    type="number"
                    placeholder="e.g. 29.99"
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    className="border-border bg-[#f9f8f8] text-[#1a1615] placeholder:text-[#757170]"
                  />
                </div>
                {retailPrice && Number(retailPrice) > 0 && (() => {
                  const price = Number(retailPrice);
                  const avgCost = (analysis.estimated_unit_cost_min + analysis.estimated_unit_cost_max) / 2;
                  const moq = analysis.estimated_moq;
                  const tiers = [
                    { name: "Sample", qty: 10, costMult: 1.5 },
                    { name: "MOQ", qty: moq, costMult: 1 },
                    { name: "2x MOQ", qty: moq * 2, costMult: 0.9 },
                    { name: "5x MOQ", qty: moq * 5, costMult: 0.8 },
                  ];
                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border text-left text-[#757170]">
                            <th className="pb-2 pr-2">Tier</th>
                            <th className="pb-2 pr-2">Unit Cost</th>
                            <th className="pb-2 pr-2">Total Cost</th>
                            <th className="pb-2 pr-2">Revenue</th>
                            <th className="pb-2 pr-2">Profit</th>
                            <th className="pb-2">Margin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tiers.map((tier) => {
                            const unitCost = avgCost * tier.costMult;
                            const totalCost = unitCost * tier.qty;
                            const revenue = price * tier.qty;
                            const profit = revenue - totalCost;
                            const margin = (profit / revenue) * 100;
                            const isPositive = profit >= 0;
                            return (
                              <tr key={tier.name} className="border-b border-border/50">
                                <td className="py-2 pr-2 font-medium text-[#1a1615]">{tier.name}<span className="ml-1 text-[#757170]">({tier.qty})</span></td>
                                <td className="py-2 pr-2 text-[#453f3d]">${unitCost.toFixed(2)}</td>
                                <td className="py-2 pr-2 text-[#453f3d]">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                <td className="py-2 pr-2 text-[#453f3d]">${revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                <td className={`py-2 pr-2 font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>${profit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                <td className={`py-2 font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>{margin.toFixed(1)}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </Card>

              {analysis.key_considerations?.length > 0 && (
                <Card className="border-[#cf8d13]/20 bg-[#cf8d13]/5 p-4">
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#cf8d13]">
                    Key Considerations
                  </h4>
                  <ul className="space-y-1 text-sm text-[#453f3d]">
                    {analysis.key_considerations.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#cf8d13]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Next Step CTA */}
              <Card className="no-print border-[#156cc2]/30 bg-[#156cc2]/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#1a1615]">
                      Ready to find manufacturers?
                    </h4>
                    <p className="text-sm text-[#757170]">
                      Our AI will match your brief with the best-fit
                      manufacturers and show you detailed scores.
                    </p>
                  </div>
                  <Button
                    onClick={handleFindManufacturers}
                    disabled={findingMatches}
                    className="shrink-0 gap-2 bg-[#156cc2] text-white hover:bg-[#156cc2]/90"
                    size="lg"
                  >
                    {findingMatches ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Factory className="h-4 w-4" />
                    )}
                    {findingMatches
                      ? "Finding Matches..."
                      : "Find Manufacturers"}
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
