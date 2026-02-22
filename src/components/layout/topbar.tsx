"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Topbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserEmail(user.email ?? null);
        setDisplayName(
          (user.user_metadata?.display_name as string) ?? null
        );
      }
    }

    loadUser();
  }, []);

  const initials = displayName
    ? displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : userEmail
      ? userEmail[0].toUpperCase()
      : "?";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e5dfda] bg-white px-4 md:px-6">
      <div className="flex items-center gap-2">
        <MobileNav />
      </div>

      <div className="flex items-center gap-3">
        <Button asChild size="sm" className="gap-2">
          <Link href="/brain-dump">
            <Sparkles className="size-4" />
            Start Your Idea
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col md:flex">
            {displayName && (
              <span className="text-sm font-medium leading-none text-foreground">
                {displayName}
              </span>
            )}
            {userEmail && (
              <span className="text-xs text-muted-foreground">
                {userEmail}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
