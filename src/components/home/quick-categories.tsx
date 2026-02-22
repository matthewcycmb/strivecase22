"use client";

import { useRouter } from "next/navigation";
import { Cpu, Package, Shirt, Home, Sparkles, Gamepad2, Watch, UtensilsCrossed } from "lucide-react";

const categories = [
  { value: "electronics_accessories", label: "Electronics", icon: Cpu, color: "text-blue-400" },
  { value: "packaging", label: "Packaging", icon: Package, color: "text-green-400" },
  { value: "apparel", label: "Apparel", icon: Shirt, color: "text-purple-400" },
  { value: "home_goods", label: "Home Goods", icon: Home, color: "text-orange-400" },
  { value: "beauty", label: "Beauty", icon: Sparkles, color: "text-pink-400" },
  { value: "toys", label: "Toys", icon: Gamepad2, color: "text-yellow-400" },
  { value: "accessories", label: "Accessories", icon: Watch, color: "text-cyan-400" },
  { value: "food_beverage", label: "Food & Bev", icon: UtensilsCrossed, color: "text-red-400" },
];

export function QuickCategories() {
  const router = useRouter();

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">Browse by Category</h2>
      <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.value}
              onClick={() => router.push(`/manufacturers?category=${cat.value}`)}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <Icon className={`h-6 w-6 ${cat.color}`} />
              <span className="text-xs text-zinc-400">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
