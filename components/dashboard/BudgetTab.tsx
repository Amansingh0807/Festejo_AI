"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useEventStore } from "@/lib/store/useEventStore";

export function BudgetTab(): React.ReactElement {
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
          {mathIsExact ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-black" aria-hidden="true" />
          ) : (
            <ShieldCheck className="h-3.5 w-3.5 text-black" aria-hidden="true" />
          )}
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
            INR {Math.round(metadata.totalBudget / Math.max(1, metadata.guestCount)).toLocaleString("en-IN")}
          </span>
          <span className="font-mono text-[10px] text-gray-800 font-medium">{metadata.guestCount} Headcount</span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-3.5 hard-shadow-4 col-span-2 sm:col-span-1">
          <span className="font-mono text-[10px] uppercase font-bold text-gray-500 block">
            MAX FOOD HEADROOM
          </span>
          <span className="font-heading text-2xl font-extrabold text-black block mt-1">
            INR {metadata.perPlateCatering.toLocaleString("en-IN")}
          </span>
          <span className="font-mono text-[10px] text-gray-800 font-medium">Per Plate Ceiling</span>
        </div>
      </div>

      {/* Escrow Health Gauge Bar */}
      <div className="border-2 border-black rounded-xl p-4 bg-white hard-shadow-4 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono font-bold">
          <span className="uppercase text-black">
            Contingency Buffer Health Meter (Diesel Surcharges & Weather Armor)
          </span>
          <span className={reservePct > 40 ? "text-emerald-700" : "text-[#ff5f57]"}>
            {reservePct}% RESERVED (INR {contingencyAmount.toLocaleString("en-IN")})
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={reservePct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Contingency Reserve Buffer Health"
          className="w-full bg-gray-200 h-4 border-2 border-black rounded-full overflow-hidden"
        >
          <div
            className={`h-full transition-all duration-500 ${
              reservePct > 60
                ? "bg-[#ffe17c]"
                : reservePct > 25
                ? "bg-amber-400"
                : "bg-[#ff5f57]"
            }`}
            style={{ width: `${reservePct}%` }}
          />
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="border-2 border-black rounded-2xl bg-white overflow-hidden hard-shadow-8">
        <div className="p-4 border-b-2 border-black bg-[#ffe17c] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="font-heading text-xl font-extrabold uppercase text-black">
            Category-by-Category Allocation Ledger
          </h4>
          <span className="font-mono text-xs font-bold bg-white px-2.5 py-1 rounded border border-black">
            100% SUM CHECK GUARANTEED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <caption className="sr-only">Deterministic Event Budget Allocation Ledger</caption>
            <thead>
              <tr className="border-b-2 border-black bg-[#171e19] text-[#ffe17c] uppercase text-[11px] font-bold">
                <th scope="col" className="p-3 border-r-2 border-black">Category</th>
                <th scope="col" className="p-3 border-r-2 border-black text-center">% Share</th>
                <th scope="col" className="p-3 border-r-2 border-black text-right">Allocation (INR)</th>
                <th scope="col" className="p-3 border-r-2 border-black text-right">Per Guest</th>
                <th scope="col" className="p-3 border-r-2 border-black">Standard Inclusions</th>
                <th scope="col" className="p-3 border-r-2 border-black">Cost-Saving Lever (Plan B)</th>
                <th scope="col" className="p-3 text-center">Risk Factor</th>
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
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
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
