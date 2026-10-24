"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, ArrowLeft, RefreshCw } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { DecisionDashboard } from "@/components/dashboard/DecisionDashboard";
import { useEventStore } from "@/lib/store/useEventStore";
import { IntakeModal } from "@/components/modals/IntakeModal";

export default function WorkspacePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { metadata, resetToDefaultPlan } = useEventStore();
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#171e19] text-black font-body selection:bg-[#ffe17c] selection:text-black flex flex-col">
      {/* Workspace Top Navigation Bar */}
      <header className="sticky top-0 z-50 h-16 w-full bg-[#ffe17c] border-b-2 border-black px-4 sm:px-6 flex items-center justify-between select-none shadow-[0px_4px_0px_0px_#000000]">
        {/* Left: Brand and Back Link */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-mono text-xs uppercase font-extrabold text-black bg-[#b7c6c2] px-3 py-1.5 border-2 border-black hard-shadow-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            title="Return to Public Site"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Landing</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-black border-2 border-black flex items-center justify-center hard-shadow-2">
              <Zap className="h-5 w-5 text-[#ffe17c] fill-[#ffe17c]" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-extrabold tracking-tight text-black leading-none">
                Festejo AI
              </span>
              <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-[#171e19]">
                Live Decision Desk
              </span>
            </div>
          </div>
        </div>

        {/* Center: Active Event Badge */}
        <div className="hidden md:flex items-center gap-2 font-mono text-xs bg-white border-2 border-black px-3 py-1 hard-shadow-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse border border-black" />
          <span className="font-bold text-black uppercase">{metadata.eventType}</span>
          <span className="text-neutral-400">|</span>
          <span className="font-medium text-neutral-700">{metadata.city}</span>
          <span className="text-neutral-400">|</span>
          <span className="font-extrabold text-black">
            Rs. {(metadata.totalBudget / 100000).toFixed(1)} Lakhs
          </span>
        </div>

        {/* Right: Intake, Reset Action and Clerk UserButton */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsIntakeOpen(true)}
            aria-label="Create new event intake"
            className="flex items-center gap-1.5 bg-[#ffe17c] text-black font-mono text-xs font-extrabold uppercase px-3 py-1.5 border-2 border-black hard-shadow-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            title="Create New Event Intake"
          >
            [ + New Intake ]
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm("Reset current plan state to default wedding scenario?")) {
                resetToDefaultPlan();
              }
            }}
            aria-label="Reset ledger state to default"
            className="flex items-center gap-1.5 bg-[#b7c6c2] text-black font-mono text-xs font-bold uppercase px-3 py-1.5 border-2 border-black hard-shadow-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            title="Reset Ledger State"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {isLoaded && isSignedIn && (
            <div className="flex items-center gap-2 bg-white border-2 border-black p-1 hard-shadow-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-7 w-7 border border-black",
                  },
                }}
              />
              <span className="hidden xl:inline font-mono text-[11px] font-bold text-black pr-1 truncate max-w-[120px]">
                {user.firstName || user.username || "Operator"}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Split-Screen Workspace Content */}
      <main className="flex-1 w-full p-4 sm:p-6 max-w-[1800px] mx-auto flex flex-col">
        {/* Workspace Subheader Info Banner */}
        <div className="mb-4 bg-[#272727] border-2 border-black p-3 rounded-none hard-shadow-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[#b7c6c2]">
          <div className="flex items-center gap-2">
            <span className="bg-[#ffe17c] text-black font-bold px-2 py-0.5 border border-black">
              PROTECTED CO-PILOT
            </span>
            <span>Gemini AI Engine + Deterministic Indian Event Economics</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Mode: Interactive Session</span>
            <span className="text-emerald-400 font-bold">Auto-Syncing</span>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[820px]">
          {/* Left Panel: Conversational Co-pilot (5 Columns) */}
          <div className="lg:col-span-5 h-full">
            <ChatPanel />
          </div>

          {/* Right Panel: Live Decision Dashboard (7 Columns) */}
          <div className="lg:col-span-7 h-full">
            <DecisionDashboard />
          </div>
        </div>
      </main>

      {/* Event Intake Modal */}
      <IntakeModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}
