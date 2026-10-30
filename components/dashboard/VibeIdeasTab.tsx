"use client";

import React, { useState } from "react";
import { useEventStore } from "@/lib/store/useEventStore";

export function VibeIdeasTab(): React.ReactElement {
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

                <h4 className="font-heading text-xl font-extrabold text-black mb-2 leading-snug">
                  {vibe.title}
                </h4>

                <p className="font-body text-xs text-[#171e19] mb-4 leading-relaxed font-medium">
                  {vibe.coreConcept}
                </p>

                {/* Mode Selector Toggle */}
                <div
                  role="group"
                  aria-label={`Toggle execution mode for ${vibe.title}`}
                  className="grid grid-cols-2 gap-2 p-1 bg-[#171e19] border-2 border-black rounded-xl mb-4 font-mono text-xs"
                >
                  <button
                    type="button"
                    aria-pressed={isSaver}
                    onClick={() => toggleMode(vibe.id, "saver")}
                    className={`py-1.5 font-bold uppercase rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white outline-none ${
                      isSaver
                        ? "bg-[#ffe17c] text-black font-extrabold hard-shadow-2"
                        : "text-[#b7c6c2] hover:text-white"
                    }`}
                  >
                    Smart Saver
                  </button>
                  <button
                    type="button"
                    aria-pressed={!isSaver}
                    onClick={() => toggleMode(vibe.id, "splurge")}
                    className={`py-1.5 font-bold uppercase rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white outline-none ${
                      !isSaver
                        ? "bg-[#ffe17c] text-black font-extrabold hard-shadow-2"
                        : "text-[#b7c6c2] hover:text-white"
                    }`}
                  >
                    Splurge Luxury
                  </button>
                </div>

                {/* Details Box */}
                <div
                  className={`p-4 rounded-xl border-2 border-black font-mono text-xs space-y-2.5 transition-colors ${
                    isSaver ? "bg-[#ffe17c]/20" : "bg-[#171e19] text-white"
                  }`}
                >
                  <div className="flex justify-between items-center border-b border-black/30 pb-1.5">
                    <span className="uppercase font-bold text-[10px]">Estimated Production:</span>
                    <span className="font-extrabold text-sm">
                      INR {(isSaver ? vibe.smartSaverVersion.estimatedCost : vibe.splurgeVersion.estimatedCost).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="font-body text-xs leading-relaxed">
                    {isSaver ? vibe.smartSaverVersion.description : vibe.splurgeVersion.description}
                  </p>

                  <div>
                    <span className="font-bold text-[10px] uppercase block mb-1">
                      {isSaver ? "DIY Sourcing Hacks:" : "Luxury Signature Elements:"}
                    </span>
                    <ul className="space-y-1 text-xs list-disc list-inside">
                      {(isSaver ? vibe.smartSaverVersion.diyHacks : vibe.splurgeVersion.luxuryHighlights).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between font-mono text-[10px] text-gray-700 font-bold">
                <span>Production Mode Active</span>
                <span className="uppercase text-black">Verified In Ledger</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
