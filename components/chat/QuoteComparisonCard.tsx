"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { QuoteComparison } from "@/lib/types/event";

interface Props {
  comparison: QuoteComparison;
}

export function QuoteComparisonCard({ comparison }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(comparison.negotiationScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="my-3 border-2 border-black bg-white rounded-xl hard-shadow-8 text-black overflow-hidden">
      {/* Header */}
      <div className="bg-[#ffe17c] text-black px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between border-b-2 border-black">
        <span>VENDOR QUOTE AUDIT DOSSIER</span>
        <span className="bg-black text-[#ffe17c] px-2 py-0.5 rounded text-[10px]">
          {comparison.category.toUpperCase()}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Vendor A */}
          <div className="border-2 border-dashed border-gray-400 bg-[#f4f4f5] rounded-lg p-3">
            <span className="font-mono text-[10px] uppercase font-bold text-gray-500 block">
              PROPOSAL A : BASE CLAIM
            </span>
            <h5 className="font-heading text-sm font-extrabold text-black mt-1">
              {comparison.vendorA.name}
            </h5>

            <div className="mt-2 font-mono text-xs space-y-1 border-t border-gray-300 pt-2">
              <div className="flex justify-between text-gray-700">
                <span>Stated Quote:</span>
                <span>INR {comparison.vendorA.quotedPrice}</span>
              </div>
              <div className="flex justify-between text-[#ff5f57] font-extrabold border-t border-black pt-1">
                <span>Effective Cost:</span>
                <span>INR {comparison.vendorA.effectiveTotal} / plate</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-gray-300">
              <span className="font-mono text-[10px] font-bold uppercase text-[#ff5f57] block mb-1">
                Hidden Exclusions:
              </span>
              <ul className="space-y-1 font-body text-xs text-gray-700">
                {comparison.vendorA.hiddenOmissions.map((om, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="font-mono font-bold text-[#ff5f57]">*</span>
                    <span>{om}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vendor B */}
          <div className="border-2 border-black bg-[#ffe17c] rounded-lg p-3 hard-shadow-2">
            <span className="font-mono text-[10px] uppercase font-bold text-black block">
              PROPOSAL B : RECOMMENDED
            </span>
            <h5 className="font-heading text-sm font-extrabold text-black mt-1">
              {comparison.vendorB.name}
            </h5>

            <div className="mt-2 font-mono text-xs space-y-1 border-t-2 border-black pt-2">
              <div className="flex justify-between text-gray-800">
                <span>Stated Quote:</span>
                <span>INR {comparison.vendorB.quotedPrice}</span>
              </div>
              <div className="flex justify-between text-black font-extrabold border-t-2 border-black pt-1">
                <span>Effective Cost:</span>
                <span>INR {comparison.vendorB.effectiveTotal} / plate</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t-2 border-black">
              <span className="font-mono text-[10px] font-bold uppercase text-black block mb-1">
                Verified Inclusions:
              </span>
              <ul className="space-y-1 font-body text-xs text-black">
                {comparison.vendorB.statedPerks.slice(0, 3).map((perk, i) => (
                  <li key={i} className="flex items-start gap-1 font-medium">
                    <span className="font-mono font-bold text-black">+</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="border-2 border-black bg-[#b7c6c2] rounded-lg p-3 font-body text-xs leading-relaxed text-black font-medium">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider block mb-0.5">
            DECISION ENGINE AUDIT VERDICT:
          </span>
          <p>{comparison.verdict}</p>
        </div>

        {/* Negotiation WhatsApp Message */}
        <div className="border-2 border-black rounded-lg p-3 bg-white font-mono text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-black text-[11px]">
              Ready WhatsApp Negotiation Dispatch:
            </span>

            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-black text-[#ffe17c] text-[10px] uppercase font-bold tracking-wider rounded border border-black hard-shadow-2 neo-push-btn cursor-pointer flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>COPY SCRIPT</span>
                </>
              )}
            </button>
          </div>

          <p className="p-2.5 bg-[#f4f4f5] border-2 border-black rounded text-gray-800 text-xs leading-relaxed select-all">
            {comparison.negotiationScript}
          </p>
        </div>
      </div>
    </div>
  );
}
