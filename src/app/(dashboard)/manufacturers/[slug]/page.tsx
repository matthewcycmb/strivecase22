"use client";

import { useState, useEffect, use } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, CheckCircle, Clock, Package, Users, Calendar, Globe, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Manufacturer, ManufacturerPortfolio, Review } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

export default function ManufacturerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);
  const [portfolio, setPortfolio] = useState<ManufacturerPortfolio[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    const supabase = createClient();

    const { data: mfg } = await supabase
      .from("manufacturers")
      .select("*")
      .eq("slug", slug)
      .single();

    if (mfg) {
      setManufacturer(mfg as Manufacturer);

      const [portfolioRes, reviewsRes] = await Promise.all([
        supabase
          .from("manufacturer_portfolio")
          .select("*")
          .eq("manufacturer_id", mfg.id),
        supabase
          .from("reviews")
          .select("*")
          .eq("manufacturer_id", mfg.id)
          .order("created_at", { ascending: false }),
      ]);

      setPortfolio((portfolioRes.data || []) as ManufacturerPortfolio[]);
      setReviews((reviewsRes.data || []) as Review[]);
    }
    setLoading(false);
  };

  if (loading || !manufacturer) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 gap-2 text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Header */}
      <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{manufacturer.business_name}</h1>
              {manufacturer.verification_status === "verified" && (
                <Badge className="gap-1 bg-blue-500/20 text-blue-400">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="mt-1 text-zinc-400">{manufacturer.location_city}, {manufacturer.location_country}</p>
            <p className="mt-2 text-sm text-zinc-300">{manufacturer.description}</p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-2xl">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-white">{Number(manufacturer.composite_rating).toFixed(1)}</span>
            </div>
            <p className="text-sm text-zinc-500">{manufacturer.total_reviews} reviews</p>
          </div>
        </div>

        <Separator className="my-4 bg-white/10" />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-500" />
            <div>
              <p className="text-sm font-medium text-white">{manufacturer.avg_response_time_hours}h</p>
              <p className="text-xs text-zinc-500">Avg Response</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-zinc-500" />
            <div>
              <p className="text-sm font-medium text-white">{manufacturer.moq_min}–{manufacturer.moq_max}</p>
              <p className="text-xs text-zinc-500">MOQ Range</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-zinc-500" />
            <div>
              <p className="text-sm font-medium text-white">{manufacturer.lead_time_days_min}–{manufacturer.lead_time_days_max} days</p>
              <p className="text-xs text-zinc-500">Lead Time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-zinc-500" />
            <div>
              <p className="text-sm font-medium text-white">{manufacturer.employee_count}</p>
              <p className="text-xs text-zinc-500">Employees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Capabilities & Certifications</h2>
        <div className="flex flex-wrap gap-2">
          {manufacturer.specialties?.map((s) => (
            <Badge key={s} variant="secondary" className="bg-white/10 text-zinc-300">
              {s}
            </Badge>
          ))}
          {manufacturer.certifications?.map((c) => (
            <Badge key={c} className="bg-blue-500/20 text-blue-400">
              {c}
            </Badge>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      {portfolio.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-white">Portfolio</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((item) => (
              <Card key={item.id} className="overflow-hidden border-white/10 bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image_url} alt={item.title || ""} className="aspect-[4/3] w-full object-cover" />
                <div className="p-3">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-white">Reviews</h2>
          <div className="space-y-3">
            {reviews.map((review) => (
              <Card key={review.id} className="border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{review.reviewer_name || "Anonymous"}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                {review.title && <h4 className="mb-1 font-medium text-white">{review.title}</h4>}
                <p className="text-sm text-zinc-300">{review.content}</p>

                {(review.quality_rating || review.communication_rating || review.delivery_rating) && (
                  <div className="mt-2 flex gap-4 text-xs text-zinc-500">
                    {review.quality_rating && <span>Quality: {review.quality_rating}/5</span>}
                    {review.communication_rating && <span>Communication: {review.communication_rating}/5</span>}
                    {review.delivery_rating && <span>Delivery: {review.delivery_rating}/5</span>}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {manufacturer.website_url && (
        <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
          <Globe className="h-4 w-4" />
          <a href={manufacturer.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            {manufacturer.website_url}
          </a>
        </div>
      )}
    </div>
  );
}
