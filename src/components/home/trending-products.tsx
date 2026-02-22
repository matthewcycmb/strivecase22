import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trending = [
  {
    title: "Custom Phone Case",
    category: "Electronics Accessories",
    description: "Biodegradable phone case with custom artwork printing",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop",
  },
  {
    title: "Branded Tote Bag",
    category: "Apparel",
    description: "Organic cotton tote with screen-printed logo design",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop",
  },
  {
    title: "Custom Mailer Boxes",
    category: "Packaging",
    description: "Premium branded shipping boxes with tissue paper inserts",
    image: "https://images.unsplash.com/photo-1607166452427-7e4477c5d5ff?w=400&h=300&fit=crop",
  },
  {
    title: "LED Desk Lamp",
    category: "Electronics",
    description: "Minimalist USB-C powered desk lamp with touch controls",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=300&fit=crop",
  },
];

export function TrendingProducts() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">Trending Products</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((product) => (
          <Card
            key={product.title}
            className="group overflow-hidden border-white/10 bg-white/5 transition-colors hover:border-white/20"
          >
            <div className="aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <Badge variant="secondary" className="mb-2 bg-white/10 text-xs text-zinc-400">
                {product.category}
              </Badge>
              <h3 className="mb-1 font-medium text-white">{product.title}</h3>
              <p className="text-sm text-zinc-500">{product.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
