"use client";

import React, { useState } from "react";
import { X, Check, Copy } from "lucide-react";
import { useEventStore } from "@/lib/store/useEventStore";

export function QuoteComparatorModal() {
  const {
    isQuoteModalOpen,
    setQuoteModalOpen,
    activeQuoteComparison,
    compareVendorQuotesAction,
  } = useEventStore();

  const [category, setCategory] = useState("Catering");
  const [copied, setCopied] = useState(false);

  if (!isQuoteModalOpen) return null;

  const comparison = activeQuoteComparison || compareVendorQuotesAction(category);

  const handleCopy = () => {
    navigator.clipboard.writeText(comparison.negotiationScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 select-none backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-comparator-title"
        className="relative w-full max-w-3xl border-2 border-black bg-white rounded-2xl p-6 hard-shadow-12 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuoteModalOpen(false)}
          aria-label="Close quote comparator dialog"
          className="absolute right-4 top-4 p-1.5 bg-black text-[#ffe17c] rounded-lg border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b-2 border-black pb-3 mb-4">
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#171e19] bg-[#ffe17c] px-3 py-0.5 rounded border border-black inline-block mb-1">
            DOSSIER AUDIT
          </span>
          <h3 id="quote-comparator-title" className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-black tracking-tight">
            Vendor Quote Deconstructor
          </h3>
          <p className="font-body text-xs text-gray-700 mt-1 font-medium">
            Mathematical normalization exposing unbilled 18% GST, diesel fuel tariffs, and staff gratuity mandates.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b-2 border-black pb-3 font-mono text-xs">
          {["Catering", "Decor & Lighting", "Venue & Hall", "DJ & Sound"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                compareVendorQuotesAction(cat);
              }}
              className={`px-3 py-1.5 font-bold uppercase tracking-wider rounded-lg border-2 border-black transition-all cursor-pointer ${
                category === cat
                  ? "bg-black text-[#ffe17c] hard-shadow-2 translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-[#ffe17c] hard-shadow-2 neo-push-btn"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vendor A */}
          <div className="border-2 border-dashed border-gray-400 bg-[#f4f4f5] rounded-xl p-4">
            <span className="font-mono text-[10px] uppercase font-bold text-gray-500 block">
              PROPOSAL A : BASE CLAIM
            </span>
            <h4 className="font-heading text-base font-extrabold text-black mt-1">
              {comparison.vendorA.name}
            </h4>

            <div className="mt-3 p-3 bg-white border-2 border-black rounded-lg font-mono text-xs space-y-1">
              <div className="flex justify-between text-gray-700">
                <span>Quoted Rate:</span>
                <span>INR {comparison.vendorA.quotedPrice.toLocaleString("en-IN")} / unit</span>
              </div>
              <div className="flex justify-between text-[#ff5f57] font-extrabold border-t-2 border-black pt-1">
                <span>Effective Real Cost:</span>
                <span>INR {comparison.vendorA.effectiveTotal.toLocaleString("en-IN")} / unit</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="font-mono text-[10px] font-bold uppercase text-[#ff5f57] block mb-1">
                Detected Exclusions & Hidden Fees:
              </span>
              <ul className="space-y-1 font-body text-xs text-gray-800">
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
          <div className="border-2 border-black bg-[#ffe17c] rounded-xl p-4 hard-shadow-4">
            <span className="font-mono text-[10px] uppercase font-bold text-black block">
              PROPOSAL B : RECOMMENDED SELECTION
            </span>
            <h4 className="font-heading text-base font-extrabold text-black mt-1">
              {comparison.vendorB.name}
            </h4>

            <div className="mt-3 p-3 bg-white border-2 border-black rounded-lg font-mono text-xs space-y-1">
              <div className="flex justify-between text-gray-800">
                <span>Quoted Rate:</span>
                <span>INR {comparison.vendorB.quotedPrice.toLocaleString("en-IN")} / unit</span>
              </div>
              <div className="flex justify-between text-black font-extrabold border-t-2 border-black pt-1">
                <span>Effective Real Cost:</span>
                <span>INR {comparison.vendorB.effectiveTotal.toLocaleString("en-IN")} / unit</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="font-mono text-[10px] font-bold uppercase text-black block mb-1">
                Verified Inclusions & Protections:
              </span>
              <ul className="space-y-1 font-body text-xs text-black font-medium">
                {comparison.vendorB.statedPerks.map((p, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="font-mono font-bold text-black">+</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Audit Verdict */}
        <div className="mt-4 p-4 border-2 border-black rounded-xl bg-[#b7c6c2] font-body text-xs leading-relaxed text-black font-medium hard-shadow-2">
          <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider block mb-1">
            DECISION ENGINE AUDIT SUMMARY:
          </span>
          <p>{comparison.verdict}</p>
        </div>

        {/* WhatsApp Negotiation Script */}
        <div className="mt-4 p-4 border-2 border-black rounded-xl bg-white font-mono text-xs hard-shadow-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold uppercase tracking-wider text-black text-[11px]">
              Ready WhatsApp Negotiation Script:
            </span>

            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-black text-[#ffe17c] font-heading font-extrabold text-[10px] uppercase rounded border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>COPY SCRIPT</span>
                </>
              )}
            </button>
          </div>

          <p className="p-3 bg-[#f4f4f5] border-2 border-black rounded-lg text-gray-800 text-xs leading-relaxed select-all">
            {comparison.negotiationScript}
          </p>
        </div>
      </div>
    </div>
  );
}
