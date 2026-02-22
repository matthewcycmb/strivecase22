import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HeroSection } from "@/components/home/hero-section";
import { ActiveProjects } from "@/components/home/active-projects";
import { TopManufacturers } from "@/components/home/top-manufacturers";
import { QuickCategories } from "@/components/home/quick-categories";
import { TrendingProducts } from "@/components/home/trending-products";
import { StatsBar } from "@/components/home/stats-bar";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-white">DeepSeek</h1>
          <p className="text-xs uppercase tracking-widest text-zinc-500">Manufacturing Platform</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/manufacturers" className="text-sm text-zinc-400 hover:text-white">Manufacturers</a>
          <a href="/projects" className="text-sm text-zinc-400 hover:text-white">Projects</a>
          <a href="/orders" className="text-sm text-zinc-400 hover:text-white">Orders</a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 p-6">
        <HeroSection />
        <ActiveProjects />
        <StatsBar />
        <QuickCategories />
        <TopManufacturers />
        <TrendingProducts />
      </main>
    </div>
  );
}
