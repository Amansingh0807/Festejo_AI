"use client";

import React from "react";
import { Calculator, Waves, FileSpreadsheet, ArrowRight } from "lucide-react";

export function FeatureGrid() {
  const features = [
    {
      title: "Deterministic Budget Stress-Tester",
      desc: "Calculates exact per-head economics and locks a statutory 10% contingency buffer before generating line-items. Guaranteed 100% arithmetic reconciliation.",
      icon: <Calculator className="h-8 w-8 text-black" />,
      tag: "CORE MATHEMATICS",
    },
    {
      title: "Dynamic Ripple Effect Engine",
      desc: "When user changes variables (+50 guests, venue price hike, or rain forecast), Festejo AI calculates the buffer draw and flags affected downstream contracts without regenerating the plan.",
      icon: <Waves className="h-8 w-8 text-black" />,
      tag: "STATE-AWARE LOGIC",
    },
    {
      title: "Vendor Quote Deconstructor",
      desc: "Apples-to-apples comparison of raw WhatsApp quotes. Automatically uncovers unbilled 18% GST, generator diesel surcharges, and outputs an assertive negotiation script.",
      icon: <FileSpreadsheet className="h-8 w-8 text-black" />,
      tag: "INDIAN CONTEXT",
    },
  ];

  return (
    <section id="features" className="w-full bg-[#ffe17c] border-y-2 border-black py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#171e19] bg-white px-3 py-1 rounded-full border-2 border-black hard-shadow-2">
            THE 3 KILLER DIFFERENTIATORS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-black tracking-tight">
            BUILT FOR INDIAN GROUND REALITIES
          </h2>
          <p className="font-body text-sm sm:text-base text-[#171e19] max-w-xl mx-auto font-medium">
            Engineered specifically to solve the unique cultural, financial, and logistical bottlenecks of Indian celebrations.
          </p>
        </div>

        {/* 3-Column Grid of White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="group bg-white border-2 border-black rounded-2xl p-6 hard-shadow-4 flex flex-col justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all"
            >
              <div>
                {/* Top 16x16 icon box in #b7c6c2 that turns #ffe17c on hover */}
                <div className="h-16 w-16 bg-[#b7c6c2] group-hover:bg-[#ffe17c] border-2 border-black rounded-xl flex items-center justify-center hard-shadow-2 transition-colors mb-6">
                  {feat.icon}
                </div>

                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#171e19] bg-[#f4f4f5] px-2.5 py-0.5 rounded border border-black inline-block mb-3">
                  {feat.tag}
                </span>

                <h3 className="font-heading text-2xl font-extrabold text-black mb-3 leading-snug">
                  {feat.title}
                </h3>

                <p className="font-body text-sm text-[#171e19] leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between font-mono text-xs font-bold text-black">
                <span>SECTION 0{idx + 1}</span>
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Verified <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
