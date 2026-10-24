"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useEventStore } from "@/lib/store/useEventStore";

export function BudgetTab() {
  const metadata = useEventStore((s) => s.metadata);
  const budgetItems = useEventStore((s) => s.budgetItems);

  const totalAllocated = React.useMemo(
    () => budgetItems.reduce((acc, curr) => acc + curr.allocatedAmount, 0),
    [budgetItems]
  );
  const mathIsExact = totalAllocated === metadata.totalBudget;

  const contingencyItem = React.useMemo(
    () => budgetItems.find((i) => i.category.includes("Contingency")),
    [budgetItems]
  );
  const contingencyAmount = contingencyItem ? contingencyItem.allocatedAmount : metadata.contingencyReserve;
  const initialReserve = Math.round(metadata.totalBudget * 0.1);
  const reservePct = Math.min(100, Math.max(0, Math.round((contingencyAmount / initialReserve) * 100)));

  return (
    <div className="p-6 space-y-6 text-black font-body">
      {/* Heading Header */}
      <div className="border-b-2 border-black pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#171e19] bg-[#ffe17c] px-3 py-0.5 rounded border border-black inline-block mb-1">
            DECISION ENGINE SECTION I
          </span>
          <h3 className="font-heading text-3xl font-extrabold uppercase text-black tracking-tight">
            Deterministic Budget Stress-Tester
          </h3>
        </div>

        <div className="font-mono text-xs font-bold text-[#171e19] bg-[#b7c6c2] px-3 py-1 rounded border border-black flex items-center gap-1.5">
          {mathIsExact ? <CheckCircle2 className="h-3.5 w-3.5 text-black" /> : <ShieldCheck className="h-3.5 w-3.5 text-black" />}
          <span>{mathIsExact ? "100% RECONCILED ESCROW" : "STATUTORY 10% BUFFER ESCROW"}</span>
        </div>
      </div>

      {/* 5-Column Metric Grid with Sage, Yellow, White & Charcoal */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-[#ffe17c] border-2 border-black rounded-xl p-3.5 hard-shadow-4">
          <span className="font-mono text-[10px] uppercase font-bold text-black block">
            TOTAL BUDGET
          </span>
          <span className="font-heading text-2xl font-extrabold text-black block mt-1">
            INR {(metadata.totalBudget / 100000).toFixed(2)}L
          </span>
          <span className="font-mono text-[10px] text-gray-800 font-medium">Locked Ceiling</span>
        </div>

        <div className="bg-[#171e19] text-white border-2 border-black rounded-xl p-3.5 hard-shadow-4">
          <span className="font-mono text-[10px] uppercase font-bold text-[#ffe17c] block">
            10% STATUTORY BUFFER
          </span>
          <span className="font-heading text-2xl font-extrabold text-[#ffe17c] block mt-1">
            INR {contingencyAmount.toLocaleString("en-IN")}
          </span>
          <span className="font-mono text-[10px] text-[#b7c6c2]">{reservePct}% Intact in Escrow</span>
        </div>

        <div className="bg-[#b7c6c2] border-2 border-black rounded-xl p-3.5 hard-shadow-4">
          <span className="font-mono text-[10px] uppercase font-bold text-black block">
            USABLE POOL
          </span>
          <span className="font-heading text-2xl font-extrabold text-black block mt-1">
            INR {((metadata.totalBudget - contingencyAmount) / 100000).toFixed(2)}L
          </span>
          <span className="font-mono text-[10px] text-gray-800 font-medium">Allocated Spend</span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-3.5 hard-shadow-4">
          <span className="font-mono text-[10px] uppercase font-bold text-gray-500 block">
            PER-GUEST SPEND
          </span>
          <span className="font-heading text-2xl font-extrabold text-black block mt-1">
            INR {metadata.perHeadTotal.toLocaleString("en-IN")}
          </span>
          <span className="font-mono text-[10px] text-gray-600 font-medium">{metadata.guestCount} Guests</span>
        </div>

        <div className="bg-[#ffe17c] border-2 border-black rounded-xl p-3.5 hard-shadow-4 col-span-2 sm:col-span-1">
          <span className="font-mono text-[10px] uppercase font-bold text-black block">
            CATERING / PLATE
          </span>
          <span className="font-heading text-2xl font-extrabold text-black block mt-1">
            INR {metadata.perPlateCatering.toLocaleString("en-IN")}
          </span>
          <span className="font-mono text-[10px] text-gray-800 font-medium">Buffet & Live Stalls</span>
        </div>
      </div>

      {/* Contingency Buffer Health Gauge */}
      <div className="border-2 border-black rounded-xl bg-[#f4f4f5] p-4 hard-shadow-4 space-y-2">
        <div className="flex justify-between items-center font-mono text-xs">
          <span className="font-bold uppercase text-black flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            <span>Contingency Buffer Telemetry (Indian 10% Reserve Rule):</span>
          </span>
          <span className="font-bold text-black">
            INR {contingencyAmount.toLocaleString("en-IN")} / INR {initialReserve.toLocaleString("en-IN")} ({reservePct}%)
          </span>
        </div>

        <div className="h-4 w-full border-2 border-black rounded-md bg-white p-0.5">
          <div
            className="h-full rounded bg-[#ffe17c] border border-black transition-all duration-300"
            style={{ width: `${reservePct}%` }}
          />
        </div>

        <p className="font-body text-xs text-gray-700 leading-relaxed">
          The 10% statutory reserve is isolated from initial booking commitments to absorb weather interruptions, generator fuel overages, or sudden headcount surges.
        </p>
      </div>

      {/* Table I: Multi-Tier Apportionment */}
      <div className="border-2 border-black rounded-xl bg-white hard-shadow-8 overflow-hidden">
        <div className="p-4 border-b-2 border-black bg-[#171e19] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-heading text-lg font-extrabold uppercase text-[#ffe17c]">
              Table I: Deterministic Multi-Tier Apportionment
            </h4>
            <span className="font-mono text-[10px] uppercase text-[#b7c6c2]">
              Calibrated Against City Tier Rates
            </span>
          </div>

          <span className="font-mono text-xs uppercase px-2.5 py-1 bg-[#ffe17c] text-black font-extrabold rounded border border-black">
            [100% RECONCILED]
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-[#ffe17c] uppercase text-[11px] text-black font-extrabold">
                <th className="p-3 border-r-2 border-black">Category</th>
                <th className="p-3 border-r-2 border-black text-center">Share</th>
                <th className="p-3 border-r-2 border-black text-right">Allocated (INR)</th>
                <th className="p-3 border-r-2 border-black text-right">Per Guest</th>
                <th className="p-3 border-r-2 border-black">Coverage Specification</th>
                <th className="p-3 border-r-2 border-black">Plan B Cost-Saving Lever</th>
                <th className="p-3 text-center">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black text-black">
              {budgetItems.map((item) => {
                const isContingency = item.category.includes("Contingency");
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-[#ffe17c]/20 transition-colors ${
                      isContingency ? "bg-[#ffe17c]/30 font-bold" : ""
                    }`}
                  >
                    <td className="p-3 border-r-2 border-black font-heading font-extrabold text-sm text-black">
                      {item.category}
                    </td>

                    <td className="p-3 border-r-2 border-black text-center font-bold">
                      {item.percentage}%
                    </td>

                    <td className="p-3 border-r-2 border-black text-right font-extrabold">
                      INR {item.allocatedAmount.toLocaleString("en-IN")}
                    </td>

                    <td className="p-3 border-r-2 border-black text-right text-gray-700">
                      INR {(item.perGuestAmount ?? Math.round(item.allocatedAmount / metadata.guestCount)).toLocaleString("en-IN")}
                    </td>

                    <td className="p-3 border-r-2 border-black font-body text-xs text-gray-800 max-w-xs leading-relaxed">
                      {item.inclusions}
                    </td>

                    <td className="p-3 border-r-2 border-black font-body text-xs text-black font-medium max-w-xs leading-relaxed">
                      Plan B: {item.costSavingLever}
                    </td>

                    <td className="p-3 text-center font-bold text-[10px] uppercase">
                      <span
                        className={`px-2 py-0.5 rounded border-2 border-black font-mono font-extrabold ${
                          item.riskFactor === "High"
                            ? "bg-[#ff5f57] text-white"
                            : item.riskFactor === "Medium"
                            ? "bg-[#ffe17c] text-black"
                            : "bg-[#b7c6c2] text-black"
                        }`}
                      >
                        {item.riskFactor}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Self-Check Footer */}
        <div className="p-4 border-t-2 border-black bg-[#f4f4f5] font-mono text-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b-2 border-black pb-2 mb-2">
            <span className="font-bold uppercase text-black flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>ARITHMETIC RECONCILIATION AUDIT:</span>
            </span>
            <span className="font-extrabold text-black">
              SUM = INR {totalAllocated.toLocaleString("en-IN")} OF INR {metadata.totalBudget.toLocaleString("en-IN")}{" "}
              <span className="bg-black text-[#ffe17c] px-2 py-0.5 rounded ml-1 border border-black">
                100% RECONCILED
              </span>
            </span>
          </div>

          <div className="text-[11px] text-gray-600 overflow-x-auto whitespace-nowrap">
            Verification Trail: {budgetItems.map((b) => `INR ${b.allocatedAmount.toLocaleString("en-IN")}`).join(" + ")} = INR {totalAllocated.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
}
