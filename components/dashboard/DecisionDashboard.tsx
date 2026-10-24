"use client";

import React from "react";
import { IndianRupee, Clock, ShieldAlert, Sparkles } from "lucide-react";
import { useEventStore } from "@/lib/store/useEventStore";
import { BudgetTab } from "./BudgetTab";
import { TimelineTab } from "./TimelineTab";
import { VendorMatrixTab } from "./VendorMatrixTab";
import { VibeIdeasTab } from "./VibeIdeasTab";
import { QuoteComparatorModal } from "./QuoteComparatorModal";

export function DecisionDashboard() {
  const { activeTab, setActiveTab } = useEventStore();

  const tabs = [
    {
      id: "budget" as const,
      label: "Budget Stress-Tester",
      icon: <IndianRupee className="h-4 w-4" />,
      badge: "DETERMINISTIC",
    },
    {
      id: "timeline" as const,
      label: "Reverse Timeline",
      icon: <Clock className="h-4 w-4" />,
      badge: "COUNTDOWN",
    },
    {
      id: "vendors" as const,
      label: "Vendor Dossier",
      icon: <ShieldAlert className="h-4 w-4" />,
      badge: "NEGOTIATION",
    },
    {
      id: "vibes" as const,
      label: "Vibe Architecture",
      icon: <Sparkles className="h-4 w-4" />,
      badge: "SAVER/SPLURGE",
    },
  ];

  return (
    <div className="flex h-full flex-col bg-white text-black border-2 border-black rounded-2xl hard-shadow-8 overflow-hidden">
      {/* Top Navigation Tabs */}
      <div className="border-b-2 border-black bg-[#ffe17c] p-2 select-none">
        <nav
          aria-label="Dashboard sections"
          role="tablist"
          className="flex space-x-2 overflow-x-auto no-scrollbar font-heading text-xs font-extrabold uppercase"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-black transition-all cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-black ${
                  isActive
                    ? "bg-black text-[#ffe17c] hard-shadow-4 translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black hover:bg-[#b7c6c2] hard-shadow-2 neo-push-btn"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`ml-1 text-[9px] font-mono px-1.5 py-0.2 rounded border border-black ${
                    isActive
                      ? "bg-[#ffe17c] text-black"
                      : "bg-[#171e19] text-[#b7c6c2]"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content Body */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="flex-1 overflow-y-auto bg-white"
      >
        {activeTab === "budget" && <BudgetTab />}
        {activeTab === "timeline" && <TimelineTab />}
        {activeTab === "vendors" && <VendorMatrixTab />}
        {activeTab === "vibes" && <VibeIdeasTab />}
      </div>

      {/* Embedded Quote Comparator Modal */}
      <QuoteComparatorModal />
    </div>
  );
}
