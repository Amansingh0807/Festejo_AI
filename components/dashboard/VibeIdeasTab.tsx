"use client";

import React, { useState } from "react";
import { useEventStore } from "@/lib/store/useEventStore";

export function VibeIdeasTab() {
  const vibeIdeas = useEventStore((s) => s.vibeIdeas);
  const [selectedModes, setSelectedModes] = useState<Record<string, "saver" | "splurge">>({
    "vibe-1": "saver",
    "vibe-2": "splurge",
    "vibe-3": "saver",
  });

  const toggleMode = (vibeId: string, mode: "saver" | "splurge") => {
    setSelectedModes((prev) => ({ ...prev, [vibeId]: mode }));
  };

  return (
    <div className="p-6 space-y-6 text-black font-body">
      {/* Section Header */}
      <div className="border-b-2 border-black pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#171e19] bg-[#ffe17c] px-3 py-0.5 rounded border border-black inline-block mb-1">
            DECISION ENGINE SECTION IV
          </span>
          <h3 className="font-heading text-3xl font-extrabold uppercase text-black tracking-tight">
            Culturally Grounded Vibe Architecture
          </h3>
        </div>

        <div className="font-mono text-xs font-bold text-black bg-[#b7c6c2] px-3 py-1 rounded border border-black">
          DUAL-MODE SAVER VS SPLURGE
        </div>
      </div>

      <div className="p-4 border-2 border-black rounded-xl bg-[#f4f4f5] hard-shadow-2">
        <p className="font-body text-xs text-gray-800 font-medium leading-relaxed">
          Generic Pinterest decor is abandoned in favor of regional cultural authenticity. Each concept below is engineered with two distinct execution routes: a <strong>Smart Saver DIY Version</strong> for frugal budgets and an <strong>Experience-First Splurge Version</strong>.
        </p>
      </div>

      {/* 3 Vibe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vibeIdeas.map((vibe) => {
          const mode = selectedModes[vibe.id] || "saver";
          const isSaver = mode === "saver";

          return (
            <div
              key={vibe.id}
              className="border-2 border-black rounded-2xl bg-white p-5 hard-shadow-4 flex flex-col justify-between"
            >
              <div>
                {/* Cultural Tag Header */}
                <div className="border-b-2 border-black pb-2 mb-3 flex items-center justify-between font-mono text-[10px] uppercase font-bold">
                  <span className="bg-[#b7c6c2] text-black px-2 py-0.5 rounded border border-black">
                    {vibe.culturalTag}
                  </span>
                  <span className="text-gray-600">[SPEC {vibe.id.toUpperCase()}]</span>
                </div>

                {/* Title */}
                <h4 className="font-heading text-xl font-extrabold text-black leading-snug">
                  {vibe.title}
                </h4>

                {/* Core Concept */}
                <p className="mt-2.5 font-body text-xs text-gray-800 font-medium leading-relaxed">
                  {vibe.coreConcept}
                </p>

                {/* Neo-Brutalist Toggle */}
                <div className="mt-4 grid grid-cols-2 gap-1.5 p-1 bg-[#171e19] rounded-xl border-2 border-black font-heading text-xs font-extrabold uppercase">
                  <button
                    onClick={() => toggleMode(vibe.id, "saver")}
                    className={`py-2 rounded-lg transition-all cursor-pointer ${
                      isSaver
                        ? "bg-[#ffe17c] text-black hard-shadow-2 translate-x-[-1px] translate-y-[-1px]"
                        : "text-[#b7c6c2] hover:text-white"
                    }`}
                  >
                    Smart Saver
                  </button>

                  <button
                    onClick={() => toggleMode(vibe.id, "splurge")}
                    className={`py-2 rounded-lg transition-all cursor-pointer ${
                      !isSaver
                        ? "bg-[#ffe17c] text-black hard-shadow-2 translate-x-[-1px] translate-y-[-1px]"
                        : "text-[#b7c6c2] hover:text-white"
                    }`}
                  >
                    Splurge Mode
                  </button>
                </div>

                {/* Mode Details Box */}
                <div className="mt-4 p-3.5 border-2 border-black rounded-xl bg-[#f4f4f5] space-y-2">
                  <div className="flex justify-between items-center font-mono text-xs border-b border-gray-300 pb-1.5">
                    <span className="font-bold uppercase text-black">
                      {isSaver ? "Smart Saver Route" : "Splurge Signature"}
                    </span>
                    <span className="font-extrabold text-black bg-[#ffe17c] px-2 py-0.5 rounded border border-black">
                      ~INR {(isSaver ? vibe.smartSaverVersion.estimatedCost : vibe.splurgeVersion.estimatedCost).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="font-body text-xs text-gray-700 leading-relaxed font-medium">
                    {isSaver
                      ? vibe.smartSaverVersion.description
                      : vibe.splurgeVersion.description}
                  </p>

                  <div className="border-t border-gray-300 pt-2">
                    <span className="font-mono text-[10px] font-bold uppercase text-gray-600 block mb-1">
                      {isSaver ? "Itemized DIY Production Hacks:" : "Luxury Architectural Highlights:"}
                    </span>
                    <ul className="space-y-1 font-body text-xs text-black font-medium">
                      {(isSaver
                        ? vibe.smartSaverVersion.diyHacks
                        : vibe.splurgeVersion.luxuryHighlights
                      ).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="font-mono font-bold text-black">*</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-2.5 border-t-2 border-black font-mono text-[10px] uppercase font-bold text-gray-600 text-center">
                Culturally Validated Pan-Indian Protocol
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
