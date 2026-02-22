"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  FolderOpen,
  Factory,
  Package,
  FileText,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/projects", label: "My Projects", icon: FolderOpen },
  { href: "/brain-dump", label: "Brain Dump", icon: Home },
  { href: "/manufacturers", label: "Manufacturers", icon: Factory },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/quotes", label: "Quotes", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
      return;
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-white">
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 px-6">
        <Image
          src="/deepseek-logo.png"
          alt="DeepSeek"
          width={32}
          height={32}
          className="shrink-0"
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-[#1a1615]">
            DeepSeek
          </span>
          <span className="-mt-1 text-[11px] font-medium uppercase tracking-widest text-[#757170]">
            Manufacturing
          </span>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#f4f1ee] text-[#1a1615]"
                    : "text-[#757170] hover:bg-[#f4f1ee] hover:text-[#1a1615]"
                )}
              >
                <link.icon
                  className={cn(
                    "size-4 shrink-0",
                    isActive
                      ? "text-[#1a1615]"
                      : "text-[#757170] group-hover:text-[#1a1615]"
                  )}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Sign out */}
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-[#757170] hover:bg-[#f4f1ee] hover:text-[#1a1615]"
          onClick={handleSignOut}
        >
          <LogOut className="size-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
