"use client";

import React, { useState } from "react";
import { useEventStore } from "@/lib/store/useEventStore";

export function VendorMatrixTab(): React.ReactElement {
  const vendorItems = useEventStore((s) => s.vendorItems);
  const setQuoteModalOpen = useEventStore((s) => s.setQuoteModalOpen);
  const compareVendorQuotesAction = useEventStore((s) => s.compareVendorQuotesAction);
  const [expandedVendor, setExpandedVendor] = useState<string | null>("vendor-catering");

  return (
    <div className="p-6 space-y-6 text-black font-body">
      {/* Section Header */}
      <div className="border-b-2 border-black pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#171e19] bg-[#ffe17c] px-3 py-0.5 rounded border border-black inline-block mb-1">
            DECISION ENGINE SECTION III
          </span>
          <h3 className="font-heading text-3xl font-extrabold uppercase text-black tracking-tight">
            Vendor Dossier & Negotiation Guardrails
          </h3>
        </div>

        <button
          type="button"
          onClick={() => {
            compareVendorQuotesAction("Catering");
            setQuoteModalOpen(true);
          }}
          className="px-5 py-2.5 bg-black text-[#ffe17c] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl border-2 border-black hard-shadow-4 neo-push-btn cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-black outline-none"
        >
          Launch Quote Deconstructor
        </button>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 border-2 border-black rounded-xl bg-[#ffe17c] hard-shadow-4">
        <span className="font-mono text-[10px] font-extrabold uppercase text-black tracking-widest block mb-1">
          INDIAN EVENT CONTRACTING COMPLIANCE AUDIT
        </span>
        <p className="font-body text-xs text-[#171e19] font-medium leading-relaxed">
          Standard vendor estimates routinely omit 18% GST levies, overtime generator fuel charges (up to INR 1,500/hr), and outside-vendor penalty tariffs. Enforce the statutory milestones below prior to releasing advance tokens.
        </p>
      </div>

      {/* 4 Vendor Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendorItems.map((vendor) => {
          const isExpanded = expandedVendor === vendor.id;

          return (
            <div
              key={vendor.id}
              className="border-2 border-black rounded-xl bg-white p-5 hard-shadow-4 flex flex-col justify-between"
            >
              <div>
                {/* Vendor Header */}
                <div className="flex items-start justify-between gap-2 border-b-2 border-black pb-3 mb-3">
                  <div>
                    <h4 className="font-heading text-lg font-extrabold text-black">
                      {vendor.vendorType}
                    </h4>
                    <span className="font-mono text-[10px] text-gray-700 block mt-0.5">
                      Benchmark: {vendor.benchmarkRate}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] uppercase font-bold bg-[#171e19] text-[#ffe17c] px-2 py-1 rounded border border-black shrink-0">
                    Max Advance: {vendor.maxAdvancePercent}%
                  </span>
                </div>

                {/* Milestone Rule */}
                <div className="p-3 bg-[#b7c6c2]/40 border-2 border-black rounded-lg mb-3 font-mono text-xs">
                  <span className="font-bold uppercase text-[10px] block text-black">
                    Statutory Payment Milestone Rule:
                  </span>
                  <p className="text-gray-900 mt-1">{vendor.paymentMilestoneRule}</p>
                </div>

                {/* Accordion Toggle */}
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`vendor-details-${vendor.id}`}
                  onClick={() => setExpandedVendor(isExpanded ? null : vendor.id)}
                  className="w-full text-left font-mono text-xs font-bold uppercase text-black py-1.5 flex items-center justify-between border-b border-gray-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-black outline-none"
                >
                  <span>{isExpanded ? "Hide Audit Checklist" : "Inspect Traps & Questions"}</span>
                  <span>{isExpanded ? "[-]" : "[+]"}</span>
                </button>

                {isExpanded && (
                  <div id={`vendor-details-${vendor.id}`} className="mt-3 space-y-3 font-body text-xs">
                    {/* Must-Ask Questions */}
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-black block mb-1">
                        Must-Ask Legal & SLA Questions:
                      </span>
                      <ul className="space-y-1 text-gray-800 list-disc list-inside">
                        {vendor.mustAskQuestions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Hidden Cost Red Flags */}
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#ff5f57] block mb-1">
                        Hidden Trap & Surcharge Red Flags:
                      </span>
                      <ul className="space-y-1 text-gray-800 list-disc list-inside">
                        {vendor.hiddenCostRedFlags.map((rf, i) => (
                          <li key={i}>{rf}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-gray-600">Standard SLA Protected</span>
                <button
                  type="button"
                  onClick={() => {
                    compareVendorQuotesAction(vendor.vendorType.split(" ")[0]);
                    setQuoteModalOpen(true);
                  }}
                  className="font-bold underline uppercase hover:text-black cursor-pointer focus-visible:ring-1 focus-visible:ring-black outline-none"
                >
                  Audit Proposal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
