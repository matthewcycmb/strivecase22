"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
      <div className="border-b border-white/10 bg-white/[0.02] px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    i < currentStep
                      ? "bg-green-500 text-white"
                      : i === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-zinc-500"
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
                    i <= currentStep ? "text-white" : "text-zinc-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-px w-16 sm:w-24",
                    i < currentStep ? "bg-green-500" : "bg-white/10"
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
        <div className="flex w-1/2 flex-col border-r border-white/10 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">
              Describe Your Product Idea
            </h2>
            <p className="text-sm text-zinc-400">
              Tell us everything — what it is, who it&apos;s for, what it looks
              like. Be as detailed or vague as you want.
            </p>
          </div>

          <Textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="I want to create a biodegradable phone case made from bamboo fiber. It should be slim, come in earth-tone colors, and have a minimalist design with maybe a small logo embossed on the back. Target price around $15-20 retail..."
            className="mb-4 flex-1 resize-none border-white/10 bg-white/5 text-base text-white placeholder:text-zinc-600"
          />

          {/* Image Upload */}
          <div className="mb-4">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 p-3 text-sm text-zinc-400 transition-colors hover:border-white/40 hover:text-zinc-300">
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
              className="gap-2 bg-white text-zinc-900 hover:bg-zinc-200"
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
        <div className="flex w-1/2 flex-col overflow-y-auto p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Product Brief Preview
          </h2>

          {!analysis && !analyzing && (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <Sparkles className="mx-auto mb-3 h-12 w-12 text-zinc-700" />
                <p className="text-zinc-500">
                  Describe your idea on the left and click &quot;Analyze
                  Idea&quot; to generate your product brief.
                </p>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          )}

          {analysis && !analyzing && (
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {analysis.title}
                </h3>
                <Badge
                  variant="secondary"
                  className="mt-1 bg-blue-500/20 text-blue-400"
                >
                  {analysis.category?.replace(/_/g, " ")}
                </Badge>
              </div>

              {/* AI Mockup */}
              {mockupUrl && (
                <Card className="overflow-hidden border-white/10 bg-white/5">
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

              <Card className="border-white/10 bg-white/5 p-4">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Description
                </h4>
                <p className="text-sm text-zinc-300">{analysis.description}</p>
              </Card>

              <Card className="border-white/10 bg-white/5 p-4">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Target Audience
                </h4>
                <p className="text-sm text-zinc-300">
                  {analysis.target_audience}
                </p>
              </Card>

              {analysis.specifications && (
                <Card className="border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Specifications
                  </h4>
                  <div className="space-y-2 text-sm">
                    {analysis.specifications.materials?.length > 0 && (
                      <div>
                        <span className="text-zinc-500">Materials: </span>
                        <span className="text-zinc-300">
                          {analysis.specifications.materials.join(", ")}
                        </span>
                      </div>
                    )}
                    {analysis.specifications.dimensions && (
                      <div>
                        <span className="text-zinc-500">Dimensions: </span>
                        <span className="text-zinc-300">
                          {analysis.specifications.dimensions}
                        </span>
                      </div>
                    )}
                    {analysis.specifications.colors?.length > 0 && (
                      <div>
                        <span className="text-zinc-500">Colors: </span>
                        <span className="text-zinc-300">
                          {analysis.specifications.colors.join(", ")}
                        </span>
                      </div>
                    )}
                    {analysis.specifications.features?.length > 0 && (
                      <div>
                        <span className="text-zinc-500">Features: </span>
                        <span className="text-zinc-300">
                          {analysis.specifications.features.join(", ")}
                        </span>
                      </div>
                    )}
                    {analysis.specifications.finish && (
                      <div>
                        <span className="text-zinc-500">Finish: </span>
                        <span className="text-zinc-300">
                          {analysis.specifications.finish}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              <Card className="border-white/10 bg-white/5 p-4">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Estimated Cost
                </h4>
                <p className="text-2xl font-bold text-white">
                  ${analysis.estimated_unit_cost_min} – $
                  {analysis.estimated_unit_cost_max}
                  <span className="ml-1 text-sm font-normal text-zinc-500">
                    per unit
                  </span>
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Suggested MOQ: {analysis.estimated_moq} units
                </p>
              </Card>

              {analysis.key_considerations?.length > 0 && (
                <Card className="border-white/10 bg-yellow-500/5 p-4">
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-400">
                    Key Considerations
                  </h4>
                  <ul className="space-y-1 text-sm text-zinc-300">
                    {analysis.key_considerations.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-yellow-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Next Step CTA */}
              <Card className="border-blue-500/30 bg-blue-500/10 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">
                      Ready to find manufacturers?
                    </h4>
                    <p className="text-sm text-zinc-400">
                      Our AI will match your brief with the best-fit
                      manufacturers and show you detailed scores.
                    </p>
                  </div>
                  <Button
                    onClick={handleFindManufacturers}
                    disabled={findingMatches}
                    className="shrink-0 gap-2 bg-blue-500 text-white hover:bg-blue-600"
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
