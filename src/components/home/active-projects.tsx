"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen } from "lucide-react";
import { BRIEF_STATUSES } from "@/lib/constants";
import type { ProductBrief } from "@/lib/types";

export function ActiveProjects() {
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

  if (loading) return null;
  if (briefs.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">Your Projects</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {briefs.map((brief) => {
          const statusInfo = BRIEF_STATUSES[brief.status] || BRIEF_STATUSES.draft;
          const href =
            brief.status === "draft" || brief.status === "analyzing"
              ? `/brain-dump/${brief.id}`
              : brief.status === "refining"
              ? `/brain-dump/${brief.id}/refine`
              : brief.status === "matched"
              ? `/matching/${brief.id}`
              : `/projects/${brief.id}`;

          return (
            <Card
              key={brief.id}
              onClick={() => router.push(href)}
              className="shrink-0 cursor-pointer border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20 hover:bg-white/10 w-64"
            >
              <div className="mb-2 flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-zinc-500" />
                <Badge variant="secondary" className={`text-xs text-white ${statusInfo.color}`}>
                  {statusInfo.label}
                </Badge>
              </div>
              <h3 className="mb-1 font-medium text-white">
                {brief.title || "Untitled Idea"}
              </h3>
              <p className="line-clamp-2 text-sm text-zinc-500">
                {brief.description || brief.raw_text_input || "No description yet"}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
