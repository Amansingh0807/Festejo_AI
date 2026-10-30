"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function Footer(): React.ReactElement {
  return (
    <div className="w-full">
      {/* Final CTA Section on #ffe17c */}
      <section className="w-full bg-[#ffe17c] border-b-2 border-black py-20 px-4 sm:px-8 text-center neo-dots-yellow">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-black bg-white px-3.5 py-1 rounded-full border-2 border-black hard-shadow-2 inline-block">
            TAKE IMMEDIATE COMMAND
          </span>

          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-black tracking-tight leading-tight">
            STOP RISKING YOUR CELEBRATION TO ARITHMETIC ILLUSIONS
          </h2>

          <p className="font-body text-base sm:text-lg text-[#171e19] max-w-2xl mx-auto font-medium">
            Lock your 10% statutory reserve, deconstruct vendor quotes, and stress-test your event timeline in under three minutes.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/workspace"
              className="bg-black text-white font-heading font-extrabold text-lg px-8 py-4 rounded-xl border-2 border-black hard-shadow-8 neo-push-btn-lg inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-black outline-none"
            >
              <span>Launch Festejo Decision Engine</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer in #171e19 with 4 Columns */}
      <footer aria-label="Site Footer" className="w-full bg-[#171e19] text-white py-16 px-4 sm:px-8 border-t-2 border-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black border-2 border-[#b7c6c2] flex items-center justify-center">
                <Zap className="h-6 w-6 text-[#ffe17c] fill-[#ffe17c]" aria-hidden="true" />
              </div>
              <span className="font-heading text-2xl font-extrabold text-[#ffe17c]">
                Festejo AI
              </span>
            </div>

            <p className="font-body text-xs text-[#b7c6c2] leading-relaxed">
              The Indian Event Decision Engine. Combining deterministic TypeScript math with state-aware cultural intelligence.
            </p>

            {/* Social Icons with accessible buttons */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { name: "Twitter/X", label: "Visit Twitter profile" },
                { name: "LinkedIn", label: "Visit LinkedIn profile" },
                { name: "GitHub", label: "Visit GitHub repository" },
                { name: "YouTube", label: "Watch YouTube demo" },
              ].map((soc, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={soc.label}
                  className="h-10 w-10 bg-[#272727] border-2 border-[#737373] text-[#b7c6c2] flex items-center justify-center font-mono text-xs font-bold hover:bg-[#ffe17c] hover:text-black hover:border-black transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white outline-none"
                >
                  {soc.name.substring(0, 2).toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Architectural Engines */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[#ffe17c] block text-sm font-heading">
              ENGINES
            </span>
            <ul className="space-y-2 text-[#b7c6c2]">
              <li><a href="#features" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-white outline-none">Budget Stress-Tester</a></li>
              <li><a href="#features" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-white outline-none">10% Buffer Reserve Escrow</a></li>
              <li><a href="#features" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-white outline-none">Ripple Effect Protocol</a></li>
              <li><a href="#features" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-white outline-none">Quote Deconstructor</a></li>
              <li><a href="#features" className="hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-white outline-none">Reverse Timeline Generator</a></li>
            </ul>
          </div>

          {/* Column 3: Indian Context Specs */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[#ffe17c] block text-sm font-heading">
              STATUTORY SPECS
            </span>
            <ul className="space-y-2 text-[#b7c6c2]">
              <li><span className="text-gray-400">10 PM SC Sound Curfew Law</span></li>
              <li><span className="text-gray-400">18% GST Omission Detection</span></li>
              <li><span className="text-gray-400">Generator Fuel Surcharge Audits</span></li>
              <li><span className="text-gray-400">Floating Plate 80-10 Rule</span></li>
              <li><span className="text-gray-400">Society NOC & Fire Clearances</span></li>
            </ul>
          </div>

          {/* Column 4: System Telemetry */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[#ffe17c] block text-sm font-heading">
              TELEMETRY
            </span>
            <div className="p-3 bg-[#272727] border border-[#737373] rounded-lg space-y-1">
              <div className="flex justify-between text-[#b7c6c2]">
                <span>Status:</span>
                <span className="text-[#ffe17c] font-bold">100% OPERATIONAL</span>
              </div>
              <div className="flex justify-between text-[#b7c6c2]">
                <span>Arithmetic:</span>
                <span className="text-white">Deterministic</span>
              </div>
              <div className="flex justify-between text-[#b7c6c2]">
                <span>Jurisdictions:</span>
                <span className="text-white">Tier-1, 2 & 3</span>
              </div>
            </div>
            <p className="text-[10px] text-[#737373]">
              Festejo AI Edition 2026. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
