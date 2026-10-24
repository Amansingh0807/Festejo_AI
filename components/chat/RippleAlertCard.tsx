"use client";

import React from "react";
import { Waves } from "lucide-react";
import { RippleAnalysis } from "@/lib/types/event";
import { useEventStore } from "@/lib/store/useEventStore";

interface Props {
  ripple: RippleAnalysis;
}

export function RippleAlertCard({ ripple }: Props) {
  const applyRecoveryOption = useEventStore((state) => state.applyRecoveryOption);

  const initialMax = Math.max(ripple.oldReserve, 1);
  const remainingPct = Math.min(100, Math.max(0, Math.round((ripple.remainingReserve / initialMax) * 100)));

  return (
    <div className="my-3 border-2 border-black bg-white rounded-xl hard-shadow-8 text-black overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#b7c6c2] text-black px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Waves className="h-4 w-4" />
          <span>RIPPLE EFFECT PROTOCOL ACTIVE</span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold border border-black ${
            ripple.reserveBreached ? "bg-[#ff5f57] text-white" : "bg-[#ffe17c] text-black"
          }`}
        >
          {ripple.reserveBreached ? "BUFFER BREACHED" : "BUFFER PROTECTED"}
        </span>
      </div>

      <div className="p-4 space-y-3 font-mono text-xs">
        {/* Incident Trigger */}
        <div className="border-b-2 border-black pb-2">
          <span className="text-[10px] uppercase text-gray-600 font-bold block">TRIGGER INCIDENT</span>
          <span className="font-heading text-sm font-extrabold text-black block mt-0.5">
            {ripple.trigger}
          </span>
        </div>

        {/* Ledger */}
        <div className="grid grid-cols-2 gap-2 border-2 border-black rounded-lg p-2.5 bg-[#f4f4f5]">
          <div>
            <span className="text-[10px] uppercase text-gray-500 font-bold block">Cost Delta</span>
            <span className="font-heading text-base font-extrabold text-[#ff5f57]">
              +INR {ripple.costDelta.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="border-l-2 border-black pl-2.5">
            <span className="text-[10px] uppercase text-gray-500 font-bold block">Reserve Balance</span>
            <span className="font-heading text-base font-extrabold text-black">
              INR {ripple.remainingReserve.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Gauge */}
        <div>
          <div className="flex justify-between text-[10px] uppercase font-bold text-gray-600 mb-1">
            <span>Buffer Health</span>
            <span>{remainingPct}% Intact</span>
          </div>

          <div className="h-3.5 w-full border-2 border-black rounded bg-gray-200 p-0.5">
            <div
              className={`h-full rounded transition-all duration-300 ${
                ripple.reserveBreached ? "bg-[#ff5f57]" : "bg-[#ffe17c]"
              }`}
              style={{ width: `${remainingPct}%` }}
            />
          </div>

          {ripple.reserveBreached && (
            <div className="mt-2 p-2 bg-[#ff5f57] text-white font-bold text-xs rounded border border-black">
              CRITICAL: Statutory buffer fully exhausted. Unfunded deficit is INR{" "}
              {ripple.outOfPocketDeficit.toLocaleString("en-IN")}.
            </div>
          )}
        </div>

        {/* Downstream Impact */}
        {ripple.downstreamOperationalImpact.length > 0 && (
          <div className="border-t-2 border-black pt-2.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black block">
              Flagged Downstream Dependencies:
            </span>
            <ul className="space-y-1 font-body text-xs text-gray-800">
              {ripple.downstreamOperationalImpact.map((impact, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="font-mono font-bold text-black">[0{idx + 1}]</span>
                  <span>{impact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recovery Options */}
        <div className="border-t-2 border-black pt-2.5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-black block">
            Compensatory Recovery Options:
          </span>

          <div className="space-y-1.5">
            {ripple.recoveryOptions.map((opt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 border-2 border-black rounded-lg p-2.5 bg-[#ffe17c] hard-shadow-2"
              >
                <div className="flex-1">
                  <span className="font-heading font-extrabold text-xs text-black uppercase block">
                    {opt.title}
                  </span>
                  <p className="font-body text-[11px] text-gray-900 mt-0.5">{opt.impact}</p>
                </div>

                <button
                  onClick={() => applyRecoveryOption(opt)}
                  className="px-3 py-1 bg-black text-[#ffe17c] font-heading font-extrabold text-[10px] uppercase rounded border border-black hard-shadow-2 neo-push-btn cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
