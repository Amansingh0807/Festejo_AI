"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEventStore } from "@/lib/store/useEventStore";

export function HeroSection() {
  const { metadata } = useEventStore();

  return (
    <section
      id="hero"
      className="relative w-full border-b-2 border-black neo-dots-yellow py-12 lg:py-20 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: 7 Cols on desktop */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-full border-2 border-black hard-shadow-2 font-mono text-xs uppercase font-bold tracking-wider">
            <span className="h-2 w-2 rounded-full bg-[#171e19]" />
            <span>NEW: AI Event Decision Engine 2.0</span>
          </div>

          {/* Heading with stroked keyword */}
          <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold text-black leading-[0.95] tracking-tighter">
            DON&apos;T GUESS. <br />
            <span className="text-stroke-black-thick">STRESS-TEST</span> <br />
            EVERY RUPEE.
          </h1>

          <p className="font-body text-base sm:text-lg text-[#171e19] max-w-xl font-medium leading-relaxed">
            Festejo AI transforms generic Indian event planning into a Hybrid Deterministic + GenAI Decision Engine. Zero arithmetic hallucinations, 100% strict per-plate economics, and instantaneous downstream ripple simulation.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/workspace"
              className="bg-black text-white font-heading font-extrabold text-base px-8 py-4 rounded-xl border-2 border-black hard-shadow-8 neo-push-btn-lg inline-flex items-center gap-2"
            >
              <span>Launch Live Co-Pilot</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href="#problem-solution"
              className="bg-white text-black font-heading font-extrabold text-base px-7 py-4 rounded-xl border-2 border-black hard-shadow-4 neo-push-btn inline-flex items-center gap-2"
            >
              <span>Inspect Architecture</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs font-bold text-black">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-black text-[#ffe17c] flex items-center justify-center text-[10px]">
                OK
              </div>
              <span>10% Mandatory Buffer Escrow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-black text-[#ffe17c] flex items-center justify-center text-[10px]">
                OK
              </div>
              <span>Zero Arithmetic Hallucination</span>
            </div>
          </div>
        </div>

        {/* Right Column: 5 Cols on desktop - Browser Mockup Dashboard */}
        <div className="lg:col-span-5">
          <div className="w-full bg-white border-2 border-black rounded-2xl hard-shadow-12 overflow-hidden">
            {/* Header Bar */}
            <div className="bg-black px-4 py-3 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57] border border-black/40" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e] border border-black/40" />
                <div className="h-3 w-3 rounded-full bg-[#28c840] border border-black/40" />
              </div>

              <div className="bg-[#171e19] px-3 py-1 rounded border border-[#272727] font-mono text-[10px] text-[#b7c6c2]">
                festejo.ai/telemetry-engine
              </div>

              <div className="h-2 w-2 rounded-full bg-[#b7c6c2]" />
            </div>

            {/* Content Area with Sage & Charcoal Internal Cards */}
            <div className="p-5 bg-white space-y-4">
              {/* Top Banner inside Browser Mockup */}
              <div className="bg-[#ffe17c] border-2 border-black p-3.5 rounded-xl hard-shadow-2 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#171e19] block">
                    ACTIVE EVENT SPECIFICATION
                  </span>
                  <span className="font-heading text-lg font-extrabold text-black">
                    {metadata.city} ({metadata.cityTier})
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#171e19] block">
                    HEADCOUNT
                  </span>
                  <span className="font-heading text-lg font-extrabold text-black">
                    {metadata.guestCount} Guests
                  </span>
                </div>
              </div>

              {/* 2 Internal Cards: Sage & Charcoal */}
              <div className="grid grid-cols-2 gap-3">
                {/* Sage Accent Panel */}
                <div className="bg-[#b7c6c2] border-2 border-black p-3 rounded-xl hard-shadow-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-black block">
                    STATUTORY BUFFER
                  </span>
                  <span className="font-heading text-xl font-extrabold text-black mt-1 block">
                    INR {(metadata.contingencyReserve / 1000).toFixed(0)}k
                  </span>
                  <div className="mt-2 h-2 w-full bg-black/20 rounded border border-black">
                    <div className="h-full bg-black rounded" style={{ width: "85%" }} />
                  </div>
                </div>

                {/* Charcoal Internal Panel */}
                <div className="bg-[#171e19] border-2 border-black p-3 rounded-xl text-white hard-shadow-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#b7c6c2] block">
                    UNIT ECONOMICS
                  </span>
                  <span className="font-heading text-xl font-extrabold text-[#ffe17c] mt-1 block">
                    INR {metadata.perHeadTotal}
                  </span>
                  <span className="font-mono text-[10px] text-[#b7c6c2] block mt-1">
                    Safe Tier Benchmark
                  </span>
                </div>
              </div>

              {/* Mini Ripple Trigger Demo preview */}
              <div className="border-2 border-black p-3 rounded-xl bg-[#f4f4f5]">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold text-black mb-1">
                  <span>RIPPLE EFFECT ENGINE</span>
                  <span className="bg-black text-white px-1.5 py-0.2 rounded">ARMED</span>
                </div>
                <p className="font-body text-xs text-[#171e19]">
                  Pre-computes price shocks (e.g. +50 guests or +INR 40k venue hike) and automatically shields core deliverables.
                </p>
              </div>

              {/* Action Button inside mockup */}
              <Link
                href="/workspace"
                className="w-full bg-[#171e19] text-[#ffe17c] font-heading font-extrabold text-xs uppercase py-2.5 rounded-lg border-2 border-black hard-shadow-2 neo-push-btn flex items-center justify-center gap-1.5 text-center"
              >
                <span>Open Full Decision Workspace</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
