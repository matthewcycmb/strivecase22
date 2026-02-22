export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  preferred_currency: string;
  preferred_language: string;
  created_at: string;
}

export interface Manufacturer {
  id: string;
  business_name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  location_city: string | null;
  location_country: string | null;
  verification_status: "verified" | "pending" | "unverified";
  categories: string[];
  specialties: string[];
  certifications: string[];
  moq_min: number | null;
  moq_max: number | null;
  lead_time_days_min: number | null;
  lead_time_days_max: number | null;
  composite_rating: number;
  total_reviews: number;
  total_orders_completed: number;
  avg_response_time_hours: number;
  year_established: number | null;
  employee_count: string | null;
  website_url: string | null;
  contact_email: string | null;
  created_at: string;
}

export interface ManufacturerPortfolio {
  id: string;
  manufacturer_id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  category: string | null;
}

export interface ProductBrief {
  id: string;
  user_id: string;
  raw_text_input: string | null;
  uploaded_images: string[];
  title: string | null;
  category: string | null;
  description: string | null;
  target_audience: string | null;
  specifications: Record<string, unknown>;
  estimated_unit_cost_min: number | null;
  estimated_unit_cost_max: number | null;
  estimated_moq: number | null;
  ai_renderings: string[];
  chat_history: ChatMessage[];
  refinement_score: number;
  status: "draft" | "analyzing" | "refining" | "locked" | "matching" | "matched" | "quoted" | "ordered";
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ManufacturerMatch {
  id: string;
  brief_id: string;
  manufacturer_id: string;
  match_score: number;
  reasoning: {
    category_fit: number;
    moq_alignment: number;
    quality_score: number;
    certification_relevance: number;
    lead_time_fit: number;
    summary: string;
    risk_summary?: string;
  };
  rank: number;
  manufacturer?: Manufacturer;
}

export interface Quote {
  id: string;
  brief_id: string;
  manufacturer_id: string;
  user_id: string;
  quantity_requested: number;
  additional_notes: string | null;
  target_price_per_unit: number | null;
  target_delivery_date: string | null;
  unit_price: number | null;
  total_price: number | null;
  estimated_lead_time_days: number | null;
  response_notes: string | null;
  status: "pending" | "responded" | "accepted" | "declined" | "expired";
  responded_at: string | null;
  created_at: string;
  manufacturer?: Manufacturer;
  brief?: ProductBrief;
}

export interface Order {
  id: string;
  brief_id: string;
  quote_id: string;
  manufacturer_id: string;
  user_id: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  status: "pending_payment" | "paid" | "in_production" | "quality_check" | "shipped" | "delivered" | "completed";
  escrow_status: "held" | "partial_release" | "released" | "refunded";
  shipping_carrier: string | null;
  tracking_number: string | null;
  estimated_delivery: string | null;
  timeline: TimelineEvent[];
  created_at: string;
  manufacturer?: Manufacturer;
  brief?: ProductBrief;
}

export interface TimelineEvent {
  status: string;
  timestamp: string;
  note: string;
}

export interface Review {
  id: string;
  manufacturer_id: string;
  user_id: string | null;
  order_id: string | null;
  rating: number;
  title: string | null;
  content: string | null;
  quality_rating: number | null;
  communication_rating: number | null;
  delivery_rating: number | null;
  reviewer_name: string | null;
  created_at: string;
  profile?: Profile;
}
