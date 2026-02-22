"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, Clock, Search, Globe } from "lucide-react";
import type { Manufacturer } from "@/lib/types";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "electronics_accessories", label: "Electronics" },
  { value: "packaging", label: "Packaging" },
  { value: "apparel", label: "Apparel" },
];

function ManufacturersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    fetchManufacturers();
  }, [category]);

  const fetchManufacturers = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);

    const res = await fetch(`/api/manufacturers?${params}`);
    const data = await res.json();
    setManufacturers(data.manufacturers || []);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1615]">Manufacturers</h1>
        <p className="text-[#757170]">Browse verified manufacturers across categories</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#757170]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchManufacturers()}
            placeholder="Search manufacturers..."
            className="border-[#e5dfda] bg-white pl-9 text-[#1a1615] placeholder:text-[#757170]"
          />
        </div>
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.value}
              variant={category === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat.value)}
              className={category === cat.value ? "bg-[#1a1615] text-white hover:bg-[#453f3d]" : "border-[#e5dfda] text-[#757170] hover:bg-[#f4f1ee]"}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-white" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {manufacturers.map((mfg) => (
            <Card
              key={mfg.id}
              onClick={() => router.push(`/manufacturers/${mfg.slug}`)}
              className="cursor-pointer border-[#e5dfda] bg-white p-5 shadow-[0_4px_50px_#614a440f] transition-colors hover:border-[#e5dfda] hover:bg-[#f4f1ee]"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#1a1615]">{mfg.business_name}</h3>
                  <p className="text-sm text-[#757170]">{mfg.location_city}, {mfg.location_country}</p>
                </div>
                {mfg.verification_status === "verified" && (
                  <CheckCircle className="h-5 w-5 shrink-0 text-blue-400" />
                )}
              </div>

              <p className="mb-3 line-clamp-2 text-sm text-[#757170]">{mfg.description}</p>

              <div className="mb-3 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  {Number(mfg.composite_rating).toFixed(1)}
                </span>
                <span className="text-[#757170]">{mfg.total_reviews} reviews</span>
                <span className="flex items-center gap-1 text-[#757170]">
                  <Clock className="h-3 w-3" />
                  {mfg.avg_response_time_hours}h
                </span>
              </div>

              {mfg.website_url && (
                <a
                  href={mfg.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mb-2 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                >
                  <Globe className="h-3 w-3" />
                  {mfg.website_url.replace(/^https?:\/\//, "")}
                </a>
              )}

              <div className="mb-2 text-xs text-[#757170]">
                MOQ: {mfg.moq_min}–{mfg.moq_max} | Lead: {mfg.lead_time_days_min}–{mfg.lead_time_days_max} days
              </div>

              <div className="flex flex-wrap gap-1">
                {mfg.categories.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="secondary" className="bg-[#f4f1ee] text-xs text-[#757170]">
                    {cat.replace(/_/g, " ")}
                  </Badge>
                ))}
                {mfg.certifications?.slice(0, 2).map((cert) => (
                  <Badge key={cert} variant="secondary" className="bg-blue-500/10 text-xs text-blue-400">
                    {cert}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ManufacturersPage() {
  return (
    <Suspense>
      <ManufacturersContent />
    </Suspense>
  );
}
