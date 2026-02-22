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
          <h1 className="text-2xl font-bold text-white">My Projects</h1>
          <p className="text-zinc-400">Track all your product ideas</p>
        </div>
        <Button
          onClick={() => router.push("/brain-dump")}
          className="gap-2 bg-white text-zinc-900 hover:bg-zinc-200"
        >
          <Plus className="h-4 w-4" />
          New Idea
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : briefs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FolderOpen className="mb-4 h-16 w-16 text-zinc-700" />
          <h2 className="mb-2 text-xl font-semibold text-white">No projects yet</h2>
          <p className="mb-4 text-zinc-400">Start by describing your product idea</p>
          <Button
            onClick={() => router.push("/brain-dump")}
            className="gap-2 bg-white text-zinc-900 hover:bg-zinc-200"
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
                className="cursor-pointer border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="secondary" className={`text-xs text-white ${statusInfo.color}`}>
                    {statusInfo.label}
                  </Badge>
                  <span className="text-xs text-zinc-500">
                    {new Date(brief.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mb-1 font-semibold text-white">
                  {brief.title || "Untitled Idea"}
                </h3>
                <p className="mb-2 line-clamp-2 text-sm text-zinc-400">
                  {brief.description || brief.raw_text_input || "No description"}
                </p>
                {brief.category && (
                  <Badge variant="secondary" className="bg-white/10 text-xs text-zinc-400">
                    {brief.category.replace(/_/g, " ")}
                  </Badge>
                )}
                {brief.estimated_unit_cost_min && (
                  <p className="mt-2 text-xs text-zinc-500">
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
