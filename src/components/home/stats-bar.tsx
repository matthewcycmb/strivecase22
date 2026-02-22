import { Factory, Package, Users, Star } from "lucide-react";

const stats = [
  { label: "Verified Manufacturers", value: "500+", icon: Factory },
  { label: "Products Shipped", value: "10,000+", icon: Package },
  { label: "Active Users", value: "25,000+", icon: Users },
  { label: "Avg. Satisfaction", value: "4.7/5", icon: Star },
];

export function StatsBar() {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <Icon className="h-8 w-8 text-zinc-600" />
            <div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
