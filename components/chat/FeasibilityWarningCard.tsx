"use client";

import React from "react";
import { AlertTriangle, Check } from "lucide-react";
import { StressTestResult } from "@/lib/types/event";
import { useEventStore } from "@/lib/store/useEventStore";

interface Props {
  alert: StressTestResult;
}

export function FeasibilityWarningCard({ alert }: Props) {
  const applyTradeOff = useEventStore((state) => state.applyTradeOff);

  return (
    <div className="my-3 border-2 border-black bg-white rounded-xl hard-shadow-8 text-black overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#ff5f57] text-white px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between border-b-2 border-black">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>FEASIBILITY DEFICIT DETECTED</span>
        </div>
        <span className="bg-black text-white px-1.5 py-0.5 rounded text-[10px]">
          STAGE 2
        </span>
      </div>

      <div className="p-4 space-y-3">
        <p className="font-body text-xs text-[#171e19] font-medium leading-relaxed">
          Pre-computation stress testing has established that the budget is physically insufficient for tier minimums. Festejo AI avoids hallucinated advice.
        </p>

        {/* 3 Metric Cells */}
        <div className="grid grid-cols-3 gap-2 border-2 border-black rounded-lg p-2 bg-[#f4f4f5] font-mono text-center">
          <div>
            <span className="block text-[10px] uppercase text-gray-500 font-bold">Available / Head</span>
            <span className="text-xs font-extrabold text-[#ff5f57]">
              INR {alert.perHeadTotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="border-x-2 border-black">
            <span className="block text-[10px] uppercase text-gray-500 font-bold">Tier Benchmark</span>
            <span className="text-xs font-extrabold text-black">
              INR {alert.minRequiredPerHead.toLocaleString("en-IN")}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase text-gray-500 font-bold">Deficit</span>
            <span className="text-xs font-extrabold text-[#ff5f57]">
              -INR {(alert.deficit / 100000).toFixed(1)}L
            </span>
          </div>
        </div>

        {/* Trade-off Options */}
        <div className="space-y-2">
          <div className="font-mono text-[11px] font-bold uppercase text-black">
            Select Compensatory Trade-Off:
          </div>

          {alert.tradeOffs.map((opt, idx) => (
            <div
              key={opt.id}
              className="border-2 border-black rounded-lg p-3 bg-[#ffe17c] hard-shadow-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex-1">
                <span className="font-heading text-xs font-extrabold uppercase text-black block">
                  [{String.fromCharCode(65 + idx)}] {opt.title}
                </span>
                <p className="font-body text-xs text-[#171e19] mt-0.5">
                  {opt.desc}
                </p>
              </div>

              <button
                onClick={() => applyTradeOff(opt.id, opt.newGuestCount, opt.newBudget)}
                className="px-3 py-1.5 bg-black text-[#ffe17c] font-heading font-extrabold text-[11px] uppercase tracking-wider rounded border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer shrink-0 flex items-center gap-1"
              >
                <Check className="h-3 w-3" />
                <span>{opt.actionText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
