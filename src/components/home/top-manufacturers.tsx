"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, Clock } from "lucide-react";
import type { Manufacturer } from "@/lib/types";

export function TopManufacturers() {
  const router = useRouter();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/manufacturers?verified=true")
      .then((res) => res.json())
      .then((data) => {
        setManufacturers((data.manufacturers || []).slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Top Manufacturers</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 w-72 shrink-0 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      </section>
    );
  }

  if (manufacturers.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">Top Manufacturers</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {manufacturers.map((mfg) => (
          <Card
            key={mfg.id}
            onClick={() => router.push(`/manufacturers/${mfg.slug}`)}
            className="shrink-0 cursor-pointer border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20 hover:bg-white/10 w-72"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">{mfg.business_name}</h3>
                <p className="text-sm text-zinc-500">
                  {mfg.location_city}, {mfg.location_country}
                </p>
              </div>
              {mfg.verification_status === "verified" && (
                <CheckCircle className="h-5 w-5 shrink-0 text-blue-400" />
              )}
            </div>

            <div className="mb-3 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                {Number(mfg.composite_rating).toFixed(1)}
              </span>
              <span className="text-zinc-500">
                {mfg.total_reviews} reviews
              </span>
              <span className="flex items-center gap-1 text-zinc-500">
                <Clock className="h-3 w-3" />
                {mfg.avg_response_time_hours}h
              </span>
            </div>

            <div className="flex flex-wrap gap-1">
              {mfg.categories.slice(0, 2).map((cat) => (
                <Badge key={cat} variant="secondary" className="bg-white/10 text-xs text-zinc-400">
                  {cat.replace(/_/g, " ")}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
