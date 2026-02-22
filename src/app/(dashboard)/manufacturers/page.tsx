"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, Clock, Search } from "lucide-react";
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
        <h1 className="text-2xl font-bold text-white">Manufacturers</h1>
        <p className="text-zinc-400">Browse verified manufacturers across categories</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchManufacturers()}
            placeholder="Search manufacturers..."
            className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-zinc-600"
          />
        </div>
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.value}
              variant={category === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat.value)}
              className={category === cat.value ? "" : "border-white/10 text-zinc-400 hover:bg-white/10"}
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
            <div key={i} className="h-48 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {manufacturers.map((mfg) => (
            <Card
              key={mfg.id}
              onClick={() => router.push(`/manufacturers/${mfg.slug}`)}
              className="cursor-pointer border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{mfg.business_name}</h3>
                  <p className="text-sm text-zinc-500">{mfg.location_city}, {mfg.location_country}</p>
                </div>
                {mfg.verification_status === "verified" && (
                  <CheckCircle className="h-5 w-5 shrink-0 text-blue-400" />
                )}
              </div>

              <p className="mb-3 line-clamp-2 text-sm text-zinc-400">{mfg.description}</p>

              <div className="mb-3 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  {Number(mfg.composite_rating).toFixed(1)}
                </span>
                <span className="text-zinc-500">{mfg.total_reviews} reviews</span>
                <span className="flex items-center gap-1 text-zinc-500">
                  <Clock className="h-3 w-3" />
                  {mfg.avg_response_time_hours}h
                </span>
              </div>

              <div className="mb-2 text-xs text-zinc-500">
                MOQ: {mfg.moq_min}–{mfg.moq_max} | Lead: {mfg.lead_time_days_min}–{mfg.lead_time_days_max} days
              </div>

              <div className="flex flex-wrap gap-1">
                {mfg.categories.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="secondary" className="bg-white/10 text-xs text-zinc-400">
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
