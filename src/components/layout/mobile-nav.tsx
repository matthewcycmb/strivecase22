"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  FolderOpen,
  Factory,
  Package,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/projects", label: "My Projects", icon: FolderOpen },
  { href: "/brain-dump", label: "Brain Dump", icon: Home },
  { href: "/manufacturers", label: "Manufacturers", icon: Factory },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/quotes", label: "Quotes", icon: FileText },
];

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
      return;
    }
    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-white p-0">
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="text-left">
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#1a1615]">
                DeepSeek
              </span>
              <span className="-mt-1 text-[11px] font-medium uppercase tracking-widest text-[#757170]">
                Manufacturing
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <Separator className="bg-[#e5dfda]" />

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
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

        <Separator className="bg-[#e5dfda]" />

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
      </SheetContent>
    </Sheet>
  );
}
