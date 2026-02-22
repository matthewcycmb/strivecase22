-- DeepSeek Manufacturing Platform — Database Schema
-- Run this in Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  preferred_currency text default 'USD',
  preferred_language text default 'en',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- MANUFACTURERS
-- ============================================================
create table public.manufacturers (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  cover_image_url text,
  location_city text,
  location_country text,
  verification_status text default 'pending' check (verification_status in ('verified', 'pending', 'unverified')),
  categories text[] not null default '{}',
  specialties text[] default '{}',
  certifications text[] default '{}',
  moq_min integer,
  moq_max integer,
  lead_time_days_min integer,
  lead_time_days_max integer,
  composite_rating numeric(3,2) default 0.00,
  total_reviews integer default 0,
  total_orders_completed integer default 0,
  avg_response_time_hours integer default 24,
  year_established integer,
  employee_count text,
  website_url text,
  contact_email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.manufacturers enable row level security;

create policy "Manufacturers are publicly readable"
  on public.manufacturers for select using (true);

-- ============================================================
-- MANUFACTURER PORTFOLIO
-- ============================================================
create table public.manufacturer_portfolio (
  id uuid primary key default uuid_generate_v4(),
  manufacturer_id uuid not null references public.manufacturers(id) on delete cascade,
  image_url text not null,
  title text,
  description text,
  category text,
  created_at timestamptz default now()
);

alter table public.manufacturer_portfolio enable row level security;

create policy "Portfolio items are publicly readable"
  on public.manufacturer_portfolio for select using (true);

-- ============================================================
-- PRODUCT BRIEFS
-- ============================================================
create table public.product_briefs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  raw_text_input text,
  uploaded_images text[] default '{}',
  title text,
  category text,
  description text,
  target_audience text,
  specifications jsonb default '{}',
  estimated_unit_cost_min numeric(10,2),
  estimated_unit_cost_max numeric(10,2),
  estimated_moq integer,
  ai_renderings text[] default '{}',
  chat_history jsonb default '[]',
  refinement_score integer default 0,
  status text default 'draft' check (status in ('draft','analyzing','refining','locked','matching','matched','quoted','ordered')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.product_briefs enable row level security;

create policy "Users can view own briefs"
  on public.product_briefs for select using (auth.uid() = user_id);

create policy "Users can insert own briefs"
  on public.product_briefs for insert with check (auth.uid() = user_id);

create policy "Users can update own briefs"
  on public.product_briefs for update using (auth.uid() = user_id);

create policy "Users can delete own briefs"
  on public.product_briefs for delete using (auth.uid() = user_id);

-- ============================================================
-- MANUFACTURER MATCHES
-- ============================================================
create table public.manufacturer_matches (
  id uuid primary key default uuid_generate_v4(),
  brief_id uuid not null references public.product_briefs(id) on delete cascade,
  manufacturer_id uuid not null references public.manufacturers(id) on delete cascade,
  match_score integer not null,
  reasoning jsonb not null default '{}',
  rank integer not null,
  created_at timestamptz default now(),
  unique(brief_id, manufacturer_id)
);

alter table public.manufacturer_matches enable row level security;

create policy "Users can view own matches"
  on public.manufacturer_matches for select
  using (
    exists (
      select 1 from public.product_briefs
      where product_briefs.id = manufacturer_matches.brief_id
        and product_briefs.user_id = auth.uid()
    )
  );

create policy "Users can insert own matches"
  on public.manufacturer_matches for insert
  with check (
    exists (
      select 1 from public.product_briefs
      where product_briefs.id = brief_id
        and product_briefs.user_id = auth.uid()
    )
  );

-- ============================================================
-- QUOTES
-- ============================================================
create table public.quotes (
  id uuid primary key default uuid_generate_v4(),
  brief_id uuid not null references public.product_briefs(id) on delete cascade,
  manufacturer_id uuid not null references public.manufacturers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  quantity_requested integer not null,
  additional_notes text,
  target_price_per_unit numeric(10,2),
  target_delivery_date date,
  unit_price numeric(10,2),
  total_price numeric(10,2),
  estimated_lead_time_days integer,
  response_notes text,
  status text default 'pending' check (status in ('pending','responded','accepted','declined','expired')),
  responded_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.quotes enable row level security;

create policy "Users can view own quotes"
  on public.quotes for select using (auth.uid() = user_id);

create policy "Users can insert own quotes"
  on public.quotes for insert with check (auth.uid() = user_id);

create policy "Users can update own quotes"
  on public.quotes for update using (auth.uid() = user_id);

-- ============================================================
-- ORDERS
-- ============================================================
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  brief_id uuid not null references public.product_briefs(id),
  quote_id uuid not null references public.quotes(id),
  manufacturer_id uuid not null references public.manufacturers(id),
  user_id uuid not null references auth.users(id) on delete cascade,
  quantity integer not null,
  unit_price numeric(10,2) not null,
  total_amount numeric(10,2) not null,
  status text default 'pending_payment' check (status in ('pending_payment','paid','in_production','quality_check','shipped','delivered','completed')),
  escrow_status text default 'held' check (escrow_status in ('held','partial_release','released','refunded')),
  shipping_carrier text,
  tracking_number text,
  estimated_delivery date,
  timeline jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on public.orders for insert with check (auth.uid() = user_id);

create policy "Users can update own orders"
  on public.orders for update using (auth.uid() = user_id);

-- ============================================================
-- REVIEWS
-- ============================================================
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  manufacturer_id uuid not null references public.manufacturers(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  order_id uuid references public.orders(id),
  rating integer not null check (rating >= 1 and rating <= 5),
  title text,
  content text,
  quality_rating integer check (quality_rating >= 1 and quality_rating <= 5),
  communication_rating integer check (communication_rating >= 1 and communication_rating <= 5),
  delivery_rating integer check (delivery_rating >= 1 and delivery_rating <= 5),
  reviewer_name text,
  created_at timestamptz default now()
);

alter table public.reviews enable row level security;

create policy "Reviews are publicly readable"
  on public.reviews for select using (true);

create policy "Users can create reviews"
  on public.reviews for insert with check (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_briefs_user_id on public.product_briefs(user_id);
create index idx_briefs_status on public.product_briefs(status);
create index idx_manufacturers_categories on public.manufacturers using gin(categories);
create index idx_manufacturers_rating on public.manufacturers(composite_rating desc);
create index idx_matches_brief_id on public.manufacturer_matches(brief_id);
create index idx_quotes_user_id on public.quotes(user_id);
create index idx_orders_user_id on public.orders(user_id);
create index idx_reviews_manufacturer_id on public.reviews(manufacturer_id);
