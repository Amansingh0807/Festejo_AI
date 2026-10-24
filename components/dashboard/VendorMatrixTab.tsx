"use client";

import React, { useState } from "react";
import { useEventStore } from "@/lib/store/useEventStore";

export function VendorMatrixTab() {
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
          onClick={() => {
            compareVendorQuotesAction("Catering");
            setQuoteModalOpen(true);
          }}
          className="px-5 py-2.5 bg-black text-[#ffe17c] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl border-2 border-black hard-shadow-4 neo-push-btn cursor-pointer shrink-0"
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
                    <span className="font-mono text-xs text-gray-700 font-bold block mt-0.5">
                      Benchmark: {vendor.benchmarkRate}
                    </span>
                  </div>

                  <span className="border-2 border-black rounded px-2.5 py-0.5 text-[10px] uppercase font-extrabold bg-[#ffe17c] text-black shrink-0 hard-shadow-2">
                    Max {vendor.maxAdvancePercent}% Advance
                  </span>
                </div>

                {/* Hidden Cost Red Flags */}
                <div className="space-y-1.5 mb-3">
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#ff5f57] block">
                    Hidden Cost Omissions to Audit:
                  </span>
                  <ul className="space-y-1 font-body text-xs text-gray-800 font-medium">
                    {vendor.hiddenCostRedFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-mono font-bold text-[#ff5f57]">*</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Must Ask Questions Accordion */}
                <div className="border-t-2 border-black pt-2.5">
                  <button
                    onClick={() => setExpandedVendor(isExpanded ? null : vendor.id)}
                    className="flex items-center justify-between w-full font-mono text-xs uppercase font-extrabold text-black hover:text-[#ff5f57] py-1 cursor-pointer transition-colors"
                  >
                    <span>Non-Negotiable Contract Inquiries</span>
                    <span>{isExpanded ? "[-] Collapse" : "[+] Expand"}</span>
                  </button>

                  {isExpanded && (
                    <ul className="mt-2 space-y-1.5 p-3 bg-[#f4f4f5] border-2 border-black rounded-lg font-body text-xs text-gray-800">
                      {vendor.mustAskQuestions.map((q, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="font-mono font-bold text-black shrink-0">
                            [0{idx + 1}]
                          </span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Payment Guardrail Footer */}
              <div className="mt-4 pt-3 border-t-2 border-black font-mono text-[11px] text-black bg-[#b7c6c2]/40 p-2.5 rounded-lg border border-black">
                <strong className="uppercase">Statutory Payment Milestone Rule:</strong>{" "}
                <span className="font-body text-xs text-gray-800 font-medium">{vendor.paymentMilestoneRule}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
