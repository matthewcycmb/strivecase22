"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Factory,
  FileText,
  MessageSquareQuote,
  Package,
  Shield,
  Globe,
  Zap,
  Users,
  BarChart3,
  Star,
  Check,
  Menu,
  X,
} from "lucide-react";

/* ─── NAVIGATION ─── */
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative mx-auto flex w-full max-w-[1072px] items-center justify-between px-4 py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/deepseek-logo.png" alt="DeepSeek" width={32} height={32} />
        <span className="text-lg font-semibold text-[#1a1615]">DeepSeek</span>
      </Link>

      {/* Desktop links — centered */}
      <div className="hidden items-center gap-8 md:flex absolute left-1/2 -translate-x-1/2">
        <a href="#features" className="text-sm font-medium text-[#1a1615] transition-colors hover:text-[#453f3d]">Features</a>
        <a href="#pricing" className="text-sm font-medium text-[#1a1615] transition-colors hover:text-[#453f3d]">Pricing</a>
        <a href="#testimonials" className="text-sm font-medium text-[#1a1615] transition-colors hover:text-[#453f3d]">Testimonials</a>
      </div>

      {/* Desktop auth */}
      <div className="hidden items-center gap-4 md:flex">
        <Link href="/login" className="text-sm font-medium text-[#1a1615] transition-colors hover:text-[#453f3d]">Log in</Link>
        <Link
          href="/signup"
          className="rounded-full bg-[#1a1615] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#453f3d]"
        >
          Get started
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? <X className="h-6 w-6 text-[#1a1615]" /> : <Menu className="h-6 w-6 text-[#1a1615]" />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-[#614a4433] bg-[#9cc1e7] p-6 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#features" onClick={() => setOpen(false)} className="font-medium text-[#1a1615]">Features</a>
            <a href="#pricing" onClick={() => setOpen(false)} className="font-medium text-[#1a1615]">Pricing</a>
            <a href="#testimonials" onClick={() => setOpen(false)} className="font-medium text-[#1a1615]">Testimonials</a>
            <Link href="/login" className="font-medium text-[#1a1615]">Log in</Link>
            <Link href="/signup" className="rounded-full bg-[#1a1615] px-5 py-2.5 text-center text-sm font-medium text-white">
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#9cc1e7] to-[#eddfd0] px-4 pb-24 pt-0 md:pb-40 md:pt-0">
      <Navbar />
      <div className="mx-auto max-w-[1072px] text-center mt-8 md:mt-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1a1615] md:text-6xl">
            Turn your product idea into a manufactured reality
          </h1>
          <p className="max-w-xl text-lg text-[#453f3d]">
            AI-powered platform that takes you from brain dump to manufacturer match to shipped product. Describe your idea, get quotes, and start production.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-full bg-[#1a1615] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#453f3d]"
            >
              Try DeepSeek free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 rounded-full border border-[#614a4433] bg-white/60 px-7 py-3.5 text-sm font-medium text-[#1a1615] backdrop-blur-sm transition-colors hover:bg-white/80"
            >
              See features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUSTED BY ─── */
function TrustedBy() {
  return (
    <section className="border-b border-[#614a4433] bg-[#f9f8f8] py-8">
      <p className="text-center text-sm text-[#757170]">
        Trusted by 7,000+ startups, creators, and product teams worldwide
      </p>
    </section>
  );
}

/* ─── PLATFORM OVERVIEW ─── */
function PlatformOverview() {
  return (
    <section className="bg-[#f9f8f8] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1072px]">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#156cc2]">End-to-end platform</p>
          <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">From idea to shipment, all in one place</h2>
          <p className="mx-auto max-w-xl text-[#757170]">
            Three simple steps take you from a rough idea to a real, manufactured product shipped to your door.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              step: "01",
              icon: FileText,
              title: "Describe your idea",
              desc: "Brain dump your product concept in plain language. Our AI turns it into a detailed brief with specs, costs, and a mockup.",
              color: "bg-blue-50 text-blue-600",
            },
            {
              step: "02",
              icon: Factory,
              title: "AI finds your manufacturer",
              desc: "We analyze your specs and match you with the best-fit factory based on category, quality, and capacity.",
              color: "bg-green-50 text-green-600",
            },
            {
              step: "03",
              icon: MessageSquareQuote,
              title: "Request a quote instantly",
              desc: "Send a sample quote to your matched manufacturer in one click, then track your order to delivery.",
              color: "bg-orange-50 text-orange-600",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group rounded-2xl border-2 border-[#614a4433] bg-white p-8 shadow-[0_4px_50px_#614a440f] transition-shadow hover:shadow-[0_8px_60px_#614a4420]"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#757170]">Step {item.step}</p>
              <h3 className="mb-3 text-xl font-semibold text-[#1a1615]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#757170]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURE SECTION: AI BRAIN DUMP ─── */
function FeatureBrainDump() {
  return (
    <section className="bg-[#f4f1ee] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1072px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-center">
          <div className="flex-1">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#156cc2]">AI analysis</p>
            <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">
              Describe your idea, get a complete product brief
            </h2>
            <p className="mb-8 text-[#757170]">
              Just write what you want to create. Our AI analyzes your description, generates detailed specifications, estimates costs, and even creates a product mockup — all in seconds.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-[#1a1615] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#453f3d]"
            >
              Try DeepSeek free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="mt-8 flex flex-wrap gap-2">
              {["AI Mockups", "Cost Estimates", "Specifications", "MOQ Suggestions"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#614a4433] bg-white px-4 py-1.5 text-xs font-medium text-[#453f3d]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl border-2 border-[#614a4433] bg-white p-6 shadow-[0_4px_50px_#614a440f]">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#156cc2]" />
                <span className="text-sm font-semibold text-[#1a1615]">AI Product Brief</span>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg bg-[#f4f1ee] p-3">
                  <p className="text-xs font-medium text-[#757170]">Your idea</p>
                  <p className="text-sm text-[#1a1615]">&quot;A biodegradable phone case made from bamboo fiber with earth-tone colors...&quot;</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs font-medium text-[#156cc2]">AI Analysis</p>
                  <p className="text-sm text-[#453f3d]">Category: Electronics Accessories</p>
                  <p className="text-sm text-[#453f3d]">Materials: Bamboo fiber, PLA bioplastic</p>
                  <p className="text-sm text-[#453f3d]">Est. cost: $3.50–$5.80 / unit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURE SECTION: MANUFACTURER MATCHING ─── */
function FeatureMatching() {
  return (
    <section className="bg-[#f9f8f8] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1072px]">
        <div className="flex flex-col gap-12 md:flex-row-reverse md:items-center">
          <div className="flex-1">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#0ea158]">Smart matching</p>
            <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">
              Find the perfect manufacturer, instantly
            </h2>
            <p className="mb-8 text-[#757170]">
              Our AI scores and ranks manufacturers based on category fit, MOQ alignment, quality ratings, certifications, and lead time — so you get the best match for your product.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-[#1a1615] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#453f3d]"
            >
              Try DeepSeek free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Verified Factories", "Quality Scores", "Lead Time Fit", "Certifications"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#614a4433] bg-white px-4 py-1.5 text-xs font-medium text-[#453f3d]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl border-2 border-[#614a4433] bg-white p-6 shadow-[0_4px_50px_#614a440f]">
              <div className="mb-4 flex items-center gap-2">
                <Factory className="h-5 w-5 text-[#0ea158]" />
                <span className="text-sm font-semibold text-[#1a1615]">Top Matches</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "GreenTech Mfg.", score: 94, location: "Shenzhen, China", badge: "Verified" },
                  { name: "EcoPack Industries", score: 89, location: "Guangzhou, China", badge: "ISO 9001" },
                  { name: "BioCase Factory", score: 85, location: "Dongguan, China", badge: "Verified" },
                ].map((m) => (
                  <div key={m.name} className="flex items-center gap-3 rounded-lg bg-[#f4f1ee] p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0ea158]/10 text-sm font-bold text-[#0ea158]">
                      {m.score}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1a1615]">{m.name}</p>
                      <p className="text-xs text-[#757170]">{m.location}</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-[#156cc2]">{m.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES GRID ─── */
function FeaturesGrid() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-powered analysis",
      desc: "Our AI turns your rough product ideas into detailed briefs with specifications, cost estimates, and even product mockups.",
    },
    {
      icon: Globe,
      title: "Verified manufacturer network",
      desc: "Browse 500+ verified manufacturers across electronics, packaging, apparel, and more — with ratings, reviews, and website links for trust.",
    },
    {
      icon: Package,
      title: "Sample orders",
      desc: "Order 5–10 sample units to evaluate quality before committing to a full bulk production run at MOQ.",
    },
    {
      icon: Shield,
      title: "Trusted & transparent",
      desc: "Every manufacturer profile includes verified certifications, customer reviews, response times, and direct website links.",
    },
    {
      icon: Zap,
      title: "Instant quotes",
      desc: "Get manufacturer responses with pricing, lead times, and production details within seconds of your quote request.",
    },
    {
      icon: BarChart3,
      title: "Order tracking",
      desc: "Track every order from payment through production, quality control, shipping, and delivery — all in one timeline.",
    },
  ];

  return (
    <section id="features" className="bg-[#f4f1ee] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1072px]">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#156cc2]">Features</p>
          <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">
            Built for creators, powered by AI
          </h2>
          <p className="mx-auto max-w-xl text-[#757170]">
            Smart, flexible, and built around taking your product from concept to reality.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border-2 border-[#614a4433] bg-white p-7 shadow-[0_4px_50px_#614a440f] transition-shadow hover:shadow-[0_8px_60px_#614a4420]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f1ee] text-[#453f3d]">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-[#1a1615]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#757170]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  const testimonials = [
    {
      quote: "DeepSeek is by far the best manufacturing platform I have ever used. From idea to shipped product in weeks.",
      name: "Sarah Chen",
      title: "Founder, EcoGoods Co.",
    },
    {
      quote: "As a fast-moving product team, we needed a tool that matched our pace. From brain dump to manufacturer quotes, this just works — clean, fast, and beautifully built.",
      name: "James Liu",
      title: "Product Lead, Inventiv Studio",
    },
    {
      quote: "We used to spend weeks finding manufacturers. Now our product briefs, matching, and quotes all live in one clean system. It's everything a small brand needs.",
      name: "Maria Torres",
      title: "CPO, NovaBrand",
    },
    {
      quote: "The sample order feature alone saved us thousands. We tested quality with 5 units before committing to a 500-unit run.",
      name: "Alex Kim",
      title: "Co-founder, PackRight",
    },
  ];

  return (
    <section id="testimonials" className="bg-[#f9f8f8] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1072px]">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">
            Loved by product teams everywhere
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border-2 border-[#614a4433] bg-white p-7 shadow-[0_4px_50px_#614a440f]"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#cf8d13] text-[#cf8d13]" />
                ))}
              </div>
              <p className="mb-6 text-[#453f3d] italic">&quot;{t.quote}&quot;</p>
              <div>
                <p className="text-sm font-semibold text-[#1a1615]">{t.name}</p>
                <p className="text-xs text-[#757170]">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─── */
function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "DeepSeek Basic",
      price: "Free",
      subtitle: "For solo creators getting started.",
      features: ["Unlimited product briefs", "AI-powered analysis", "Manufacturer browsing", "Sample order requests", "Basic order tracking"],
      cta: "Get started free",
      ctaStyle: "border border-[#614a4433] bg-white text-[#1a1615] hover:bg-[#f4f1ee]",
      highlight: false,
    },
    {
      name: "DeepSeek Pro",
      price: annual ? "$49/mo" : "$59/mo",
      subtitle: "For serious product teams.",
      badge: annual ? "Save 20%" : null,
      features: ["Everything in Basic", "Priority manufacturer matching", "Bulk quote management", "Advanced order tracking", "Dedicated support"],
      cta: "Get started",
      ctaStyle: "bg-[#1a1615] text-white hover:bg-[#453f3d]",
      highlight: true,
    },
    {
      name: "DeepSeek Enterprise",
      price: "Custom",
      subtitle: "For teams at scale.",
      features: ["Everything in Pro", "Custom integrations", "Dedicated account manager", "SLA guarantees", "Custom data export"],
      cta: "Contact sales",
      ctaStyle: "border border-[#614a4433] bg-white text-[#1a1615] hover:bg-[#f4f1ee]",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="bg-[#f4f1ee] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1072px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#156cc2]">Pricing</p>
          <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">
            Simple plans for serious work
          </h2>
        </div>

        {/* Toggle */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              annual ? "bg-[#1a1615] text-white" : "text-[#757170]"
            }`}
          >
            Annually
          </button>
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !annual ? "bg-[#1a1615] text-white" : "text-[#757170]"
            }`}
          >
            Monthly
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-7 shadow-[0_4px_50px_#614a440f] ${
                plan.highlight
                  ? "border-[#156cc2] bg-white"
                  : "border-[#614a4433] bg-white"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-[#0ea158] px-3 py-1 text-xs font-medium text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="mb-1 text-lg font-semibold text-[#1a1615]">{plan.name}</h3>
              <p className="mb-4 text-3xl font-bold text-[#1a1615]">{plan.price}</p>
              <p className="mb-6 text-sm text-[#757170]">{plan.subtitle}</p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#453f3d]">
                    <Check className="h-4 w-4 shrink-0 text-[#0ea158]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`block rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#757170]">
          Trusted by 7,000+ startups, creators, and product teams
        </p>
      </div>
    </section>
  );
}

/* ─── RESOURCES / BLOG ─── */
function Resources() {
  const articles = [
    {
      title: "How to go from product idea to manufacturer in 2025",
      desc: "A comprehensive guide to navigating the manufacturing process for first-time creators.",
      tag: "Must Read",
      tagColor: "bg-[#156cc2] text-white",
      featured: true,
    },
    {
      title: "Top 10 manufacturing categories for startups",
      desc: "Explore the most popular product categories on our platform.",
      tag: "Tools",
      tagColor: "bg-[#f4f1ee] text-[#453f3d]",
      featured: false,
    },
    {
      title: "Sample orders: why every brand should start small",
      desc: "The case for ordering samples before committing to bulk MOQ production.",
      tag: "Insight",
      tagColor: "bg-[#f4f1ee] text-[#453f3d]",
      featured: false,
    },
  ];

  return (
    <section className="bg-[#f9f8f8] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1072px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#156cc2]">Resources</p>
          <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">
            Ideas to level up your product game
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((a) => (
            <div
              key={a.title}
              className={`rounded-2xl border-2 border-[#614a4433] bg-white p-7 shadow-[0_4px_50px_#614a440f] ${
                a.featured ? "md:row-span-2" : ""
              }`}
            >
              <span className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${a.tagColor}`}>
                {a.tag}
              </span>
              <h3 className="mb-2 text-base font-semibold text-[#1a1615]">{a.title}</h3>
              <p className="text-sm leading-relaxed text-[#757170]">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMMUNITY ─── */
function Community() {
  return (
    <section className="bg-[#f4f1ee] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1072px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#156cc2]">Community</p>
          <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">Stay in the loop</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-[#614a4433] bg-white p-7 shadow-[0_4px_50px_#614a440f]">
            <p className="mb-1 text-2xl font-bold text-[#1a1615]">15.2K followers</p>
            <p className="mb-3 text-sm font-medium text-[#757170]">X / Twitter</p>
            <p className="mb-6 text-sm text-[#757170]">
              Stay updated on new features and discover how others are using DeepSeek to launch products.
            </p>
            <span className="rounded-full border border-[#614a4433] px-5 py-2 text-sm font-medium text-[#1a1615]">
              Follow us
            </span>
          </div>

          <div className="rounded-2xl border-2 border-[#614a4433] bg-white p-7 shadow-[0_4px_50px_#614a440f]">
            <p className="mb-1 text-2xl font-bold text-[#1a1615]">32K subscribers</p>
            <p className="mb-3 text-sm font-medium text-[#757170]">YouTube</p>
            <p className="mb-6 text-sm text-[#757170]">
              Tips, tutorials, and in-depth guides on finding manufacturers and launching products.
            </p>
            <span className="rounded-full border border-[#614a4433] px-5 py-2 text-sm font-medium text-[#1a1615]">
              Subscribe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section className="bg-gradient-to-b from-[#9cc1e7] to-[#eddfd0] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-semibold text-[#1a1615] md:text-4xl">Ready to get started?</h2>
        <p className="mb-8 text-[#453f3d]">
          Start using DeepSeek for free. No credit card required.
        </p>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2 rounded-full bg-[#1a1615] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#453f3d]"
        >
          Try DeepSeek free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-[#614a4433] bg-[#f9f8f8] px-4 py-12">
      <div className="mx-auto max-w-[1072px]">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2">
              <Image src="/deepseek-logo.png" alt="DeepSeek" width={28} height={28} />
              <span className="text-base font-semibold text-[#1a1615]">DeepSeek</span>
            </div>
            <p className="text-sm text-[#757170]">
              Your AI-powered manufacturing platform. Built for creators, startups, and product teams.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#1a1615]">Pages</p>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-[#757170] hover:text-[#1a1615]">Home</Link>
                <a href="#features" className="text-sm text-[#757170] hover:text-[#1a1615]">Features</a>
                <a href="#pricing" className="text-sm text-[#757170] hover:text-[#1a1615]">Pricing</a>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[#1a1615]">Information</p>
              <div className="flex flex-col gap-2">
                <Link href="/login" className="text-sm text-[#757170] hover:text-[#1a1615]">Log in</Link>
                <Link href="/signup" className="text-sm text-[#757170] hover:text-[#1a1615]">Sign up</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#614a4433] pt-6 text-center text-xs text-[#757170]">
          &copy; 2025 DeepSeek Manufacturing Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f8]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <Hero />
      <TrustedBy />
      <PlatformOverview />
      <FeatureBrainDump />
      <FeatureMatching />
      <FeaturesGrid />
      <Testimonials />
      <Pricing />
      <Resources />
      <Community />
      <CTASection />
      <Footer />
    </div>
  );
}
