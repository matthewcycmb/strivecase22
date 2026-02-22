"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, FolderOpen } from "lucide-react";
import { BRIEF_STATUSES } from "@/lib/constants";
import type { ProductBrief } from "@/lib/types";

export default function ProjectsPage() {
  const router = useRouter();
  const [briefs, setBriefs] = useState<ProductBrief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/briefs")
      .then((res) => res.json())
      .then((data) => {
        setBriefs(data.briefs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getHref = (brief: ProductBrief) => {
    switch (brief.status) {
      case "draft":
      case "analyzing":
      case "refining":
        return `/brain-dump`;
      case "locked":
      case "matching":
      case "matched":
        return `/matching/${brief.id}`;
      case "quoted":
        return `/quotes`;
      case "ordered":
        return `/orders`;
      default:
        return `/brain-dump`;
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1615]">My Projects</h1>
          <p className="text-[#757170]">Track all your product ideas</p>
        </div>
        <Button
          onClick={() => router.push("/brain-dump")}
          className="gap-2 bg-[#1a1615] text-white hover:bg-[#453f3d]"
        >
          <Plus className="h-4 w-4" />
          New Idea
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-[#f4f1ee]" />
          ))}
        </div>
      ) : briefs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FolderOpen className="mb-4 h-16 w-16 text-[#e5dfda]" />
          <h2 className="mb-2 text-xl font-semibold text-[#1a1615]">No projects yet</h2>
          <p className="mb-4 text-[#757170]">Start by describing your product idea</p>
          <Button
            onClick={() => router.push("/brain-dump")}
            className="gap-2 bg-[#1a1615] text-white hover:bg-[#453f3d]"
          >
            <Plus className="h-4 w-4" />
            Start Your Brain Dump
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {briefs.map((brief) => {
            const statusInfo = BRIEF_STATUSES[brief.status] || BRIEF_STATUSES.draft;
            return (
              <Card
                key={brief.id}
                onClick={() => router.push(getHref(brief))}
                className="cursor-pointer border-[#e5dfda] bg-white p-5 shadow-[0_4px_50px_#614a440f] transition-all hover:shadow-[0_8px_60px_#614a4420]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="secondary" className={`text-xs ${statusInfo.color}`}>
                    {statusInfo.label}
                  </Badge>
                  <span className="text-xs text-[#757170]">
                    {new Date(brief.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mb-1 font-semibold text-[#1a1615]">
                  {brief.title || "Untitled Idea"}
                </h3>
                <p className="mb-2 line-clamp-2 text-sm text-[#757170]">
                  {brief.description || brief.raw_text_input || "No description"}
                </p>
                {brief.category && (
                  <Badge variant="secondary" className="bg-[#f4f1ee] text-xs text-[#757170]">
                    {brief.category.replace(/_/g, " ")}
                  </Badge>
                )}
                {brief.estimated_unit_cost_min && (
                  <p className="mt-2 text-xs text-[#757170]">
                    Est. ${brief.estimated_unit_cost_min}–${brief.estimated_unit_cost_max}/unit
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
