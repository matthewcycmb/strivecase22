export const CATEGORIES = [
  { value: "electronics_accessories", label: "Electronics Accessories", icon: "Cpu" },
  { value: "packaging", label: "Packaging", icon: "Package" },
  { value: "apparel", label: "Apparel & Textiles", icon: "Shirt" },
  { value: "home_goods", label: "Home Goods", icon: "Home" },
  { value: "beauty", label: "Beauty & Personal Care", icon: "Sparkles" },
  { value: "toys", label: "Toys & Games", icon: "Gamepad2" },
  { value: "accessories", label: "Accessories", icon: "Watch" },
  { value: "food_beverage", label: "Food & Beverage", icon: "UtensilsCrossed" },
] as const;

export const BRIEF_STATUSES = {
  draft: { label: "Draft", color: "bg-zinc-500" },
  analyzing: { label: "Analyzing", color: "bg-yellow-500" },
  refining: { label: "Refining", color: "bg-blue-500" },
  locked: { label: "Locked", color: "bg-purple-500" },
  matching: { label: "Matching", color: "bg-orange-500" },
  matched: { label: "Matched", color: "bg-green-500" },
  quoted: { label: "Quoted", color: "bg-emerald-500" },
  ordered: { label: "Ordered", color: "bg-teal-500" },
} as const;

export const ORDER_STATUSES = {
  pending_payment: { label: "Pending Payment", color: "bg-yellow-500" },
  paid: { label: "Paid", color: "bg-blue-500" },
  in_production: { label: "In Production", color: "bg-orange-500" },
  quality_check: { label: "Quality Check", color: "bg-purple-500" },
  shipped: { label: "Shipped", color: "bg-cyan-500" },
  delivered: { label: "Delivered", color: "bg-green-500" },
  completed: { label: "Completed", color: "bg-emerald-500" },
} as const;
