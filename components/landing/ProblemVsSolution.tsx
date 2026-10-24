"use client";

import React from "react";
import { X, Check } from "lucide-react";

export function ProblemVsSolution() {
  return (
    <section id="problem-solution" className="w-full bg-white border-b-2 border-black py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#171e19] bg-[#ffe17c] px-3 py-1 rounded-full border-2 border-black hard-shadow-2">
            ARCHITECTURAL DIVERGENCE
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-black tracking-tight">
            NORMAL CHATBOTS VS FESTEJO AI
          </h2>
          <p className="font-body text-sm sm:text-base text-[#171e19] max-w-2xl mx-auto">
            Traditional AI planners hallucinate budgets and provide static checklists that collapse under real Indian vendor negotiations.
          </p>
        </div>

        {/* 2 Large Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card A: Problem */}
          <div className="bg-[#f4f4f5] border-2 border-dashed border-gray-400 opacity-80 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="inline-block bg-gray-300 text-black font-mono text-xs font-bold uppercase px-3 py-1 rounded-md mb-4 border border-gray-400">
                THE FLAWED APPROACH : CHATBOT PLATITUDES
              </div>
              <h3 className="font-heading text-2xl font-bold text-black mb-4">
                Generic &quot;Act As An Event Planner&quot; Prompts
              </h3>
              <p className="font-body text-sm text-gray-700 mb-6">
                Relying purely on LLM token probabilities for arithmetic leads to disaster when vendor invoices arrive.
              </p>

              <ul className="space-y-3.5 font-body text-sm text-gray-800">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-200 border border-red-500 flex items-center justify-center text-red-700 shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5" />
                  </div>
                  <span>Hallucinates arithmetic: Table line items don&apos;t mathematically sum to the total budget.</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-200 border border-red-500 flex items-center justify-center text-red-700 shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5" />
                  </div>
                  <span>Zero pre-stress test: Blindly accepts impossible figures like INR 2L for 300 guests in Mumbai.</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-200 border border-red-500 flex items-center justify-center text-red-700 shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5" />
                  </div>
                  <span>Static schedules: No dependency links between venue lock dates and outside-vendor monopoly fees.</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-200 border border-red-500 flex items-center justify-center text-red-700 shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5" />
                  </div>
                  <span>Ignores Indian hidden charges: Omits 18% GST, generator fuel tariffs, and 10 PM sound permits.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-300 font-mono text-xs text-gray-500 text-center">
              Result: 35% Budget Blowouts and On-Site Disputes
            </div>
          </div>

          {/* Card B: Solution */}
          <div className="bg-[#ffe17c] border-2 border-black rounded-3xl p-8 hard-shadow-8 flex flex-col justify-between">
            <div>
              <div className="inline-block bg-black text-[#ffe17c] font-mono text-xs font-bold uppercase px-3 py-1 rounded-md mb-4 border border-black">
                THE FESTEJO PATTERN : HYBRID DECISION ENGINE
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-black mb-4">
                Deterministic Logic + Cultural Reasoning
              </h3>
              <p className="font-body text-sm text-[#171e19] mb-6 font-medium">
                TypeScript handles 100% of arithmetic and dependency checks, while GenAI acts as the conversational orchestrator.
              </p>

              <ul className="space-y-3.5 font-body text-sm text-black font-medium">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-black text-[#ffe17c] flex items-center justify-center shrink-0 mt-0.5 border border-black">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Statutory 10% Reserve: Mandatory buffer locked in escrow before allocating a single rupee.</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-black text-[#ffe17c] flex items-center justify-center shrink-0 mt-0.5 border border-black">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Pre-Computation Stress-Test: Issues instant Feasibility Deficit alerts with 3 actionable trade-offs.</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-black text-[#ffe17c] flex items-center justify-center shrink-0 mt-0.5 border border-black">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Ripple Effect Engine: When variables shift, it calculates the buffer draw and flags downstream tasks.</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-black text-[#ffe17c] flex items-center justify-center shrink-0 mt-0.5 border border-black">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Quote Deconstructor: Exposes hidden 18% GST and unbilled fuel with ready WhatsApp negotiation scripts.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-black font-mono text-xs text-black font-bold text-center">
              Result: 100% Arithmetic Precision and Peace of Mind
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
