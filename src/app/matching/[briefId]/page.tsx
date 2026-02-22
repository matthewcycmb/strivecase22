"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Loader2,
  Star,
  CheckCircle,
  Clock,
  Globe,
  ArrowRight,
  FileText,
  Factory,
  MessageSquareQuote,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { ManufacturerMatch } from "@/lib/types";

const STEPS = [
  { label: "Describe Idea", icon: FileText },
  { label: "Match Manufacturers", icon: Factory },
  { label: "Get Quotes", icon: MessageSquareQuote },
];

export default function MatchingPage({ params }: { params: Promise<{ briefId: string }> }) {
  const { briefId } = use(params);
  const router = useRouter();
  const [matches, setMatches] = useState<ManufacturerMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrFindMatches();
  }, [briefId]);

  const loadOrFindMatches = async () => {
    try {
      // First try to load existing matches
      const getRes = await fetch(`/api/matching?briefId=${briefId}`);
      if (getRes.ok) {
        const data = await getRes.json();
        if (data.matches && data.matches.length > 0) {
          setMatches(data.matches);
          setLoading(false);
          return;
        }
      }

      // No existing matches — run AI matching
      const res = await fetch("/api/matching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ briefId }),
      });

      if (!res.ok) throw new Error("Matching failed");

      const data = await res.json();
      setMatches(data.matches || []);
    } catch {
      toast.error("Failed to find matches");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#156cc2]" />
        <h2 className="text-xl font-semibold text-[#1a1615]">Finding Your Best Matches</h2>
        <p className="text-[#757170]">Our AI is analyzing manufacturers for your product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f8f8]">
      {/* Step Bar */}
      <div className="border-b border-[#e5dfda] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          {STEPS.map((step, i) => {
            const currentStep = 1;
            return (
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
            );
          })}
        </div>
      </div>

      <header className="border-b border-[#e5dfda] px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-[#1a1615]">Manufacturer Matches</h1>
          <p className="text-[#757170]">
            {matches.length} manufacturers matched for your product — pick one to request a quote
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-4 p-6">
        {matches.map((match) => {
          const mfg = match.manufacturer;
          if (!mfg) return null;
          const reasoning = match.reasoning;

          return (
            <Card key={match.manufacturer_id} className="border-[#e5dfda] bg-white shadow-[0_4px_50px_#614a440f] p-6">
              <div className="flex items-start gap-6">
                {/* Match Score */}
                <div className="flex shrink-0 flex-col items-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-500">
                    <span className="text-2xl font-bold text-[#1a1615]">{match.match_score}</span>
                  </div>
                  <span className="mt-1 text-xs text-[#757170]">Match Score</span>
                </div>

                {/* Manufacturer Info */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-[#1a1615]">{mfg.business_name}</h3>
                    {mfg.verification_status === "verified" && (
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    )}
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-[#757170]">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {Number(mfg.composite_rating).toFixed(1)}
                    </span>
                    <span>{mfg.location_city}, {mfg.location_country}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {mfg.avg_response_time_hours}h response
                    </span>
                    <span>MOQ: {mfg.moq_min}–{mfg.moq_max}</span>
                    {mfg.website_url && (
                      <a
                        href={mfg.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                      >
                        <Globe className="h-3 w-3" />
                        Website
                      </a>
                    )}
                  </div>

                  {/* Scoring Breakdown */}
                  {reasoning && (
                    <div className="mb-4 grid grid-cols-5 gap-3">
                      {[
                        { label: "Category", value: reasoning.category_fit },
                        { label: "MOQ", value: reasoning.moq_alignment },
                        { label: "Quality", value: reasoning.quality_score },
                        { label: "Certs", value: reasoning.certification_relevance },
                        { label: "Lead Time", value: reasoning.lead_time_fit },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-[#757170]">{item.label}</span>
                            <span className="text-xs text-[#757170]">{item.value}</span>
                          </div>
                          <Progress value={item.value} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  )}

                  {reasoning?.summary && (
                    <p className="mb-4 text-sm text-[#757170]">{reasoning.summary}</p>
                  )}

                  <div className="flex gap-2">
                    {mfg.certifications?.map((cert) => (
                      <Badge key={cert} variant="secondary" className="bg-[#f4f1ee] text-xs text-[#757170]">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="shrink-0">
                  <Button
                    onClick={() => router.push(`/quote-request/${briefId}/${match.manufacturer_id}`)}
                    className="gap-2 bg-[#1a1615] text-white hover:bg-[#453f3d]"
                  >
                    Request Quote
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </main>
    </div>
  );
}
