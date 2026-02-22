"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 md:p-12">
      {/* Gradient orbs */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/deepseek-logo.png"
            alt="DeepSeek"
            width={64}
            height={64}
            className="drop-shadow-[0_0_24px_rgba(59,130,246,0.3)]"
          />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400">
          <Sparkles className="h-4 w-4 text-blue-400" />
          AI-Powered Manufacturing
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Transform Your Idea
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Into Reality
          </span>
        </h1>

        <p className="mb-8 text-lg text-zinc-400">
          Describe your product idea in plain language. Our AI will guide you
          from concept to a manufactured, shippable product.
        </p>

        <Button
          size="lg"
          onClick={() => router.push("/brain-dump")}
          className="group gap-2 bg-white px-8 text-lg font-semibold text-zinc-900 hover:bg-zinc-200"
        >
          Start Your Brain Dump
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
