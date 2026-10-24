"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Zap, Bot, User } from "lucide-react";
import { useEventStore } from "@/lib/store/useEventStore";
import { FeasibilityWarningCard } from "./FeasibilityWarningCard";
import { RippleAlertCard } from "./RippleAlertCard";
import { QuoteComparisonCard } from "./QuoteComparisonCard";

export function ChatPanel() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    chatMessages,
    sendUserMessage,
    isProcessing,
    triggerRippleEffect,
    compareVendorQuotesAction,
    initEventPlan,
    metadata,
  } = useEventStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isProcessing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    const text = input;
    setInput("");
    await sendUserMessage(text);
  };

  const runSimulation = (type: string) => {
    if (isProcessing) return;

    if (type === "plus_50_guests") {
      triggerRippleEffect({
        variable: "guestCount",
        newGuestCount: metadata.guestCount + 50,
      });
    } else if (type === "venue_hike") {
      triggerRippleEffect({
        variable: "categoryCost",
        deltaValue: 40000,
        categoryName: "Venue & Power Logistics",
      });
    } else if (type === "rain_forecast") {
      triggerRippleEffect({
        variable: "weather",
      });
    } else if (type === "compare_quotes") {
      compareVendorQuotesAction("Catering");
    } else if (type === "test_unfeasible") {
      initEventPlan(200000, 300, "Mumbai", "Tier-1", "Wedding", "2026-12-15");
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#171e19] text-white border-2 border-black rounded-2xl hard-shadow-8 overflow-hidden">
      {/* Header Bar */}
      <div className="border-b-2 border-black px-4 py-3 bg-[#ffe17c] text-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-black text-[#ffe17c] flex items-center justify-center border-2 border-black hard-shadow-2">
            <Zap className="h-4 w-4 fill-[#ffe17c]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-extrabold uppercase leading-none">
              Festejo Co-Pilot
            </h2>
            <span className="font-mono text-[10px] text-[#171e19] font-bold block">
              State-Aware Decision Agent
            </span>
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-black text-[#ffe17c] rounded border border-black">
          ONLINE
        </span>
      </div>

      {/* Quick Simulation Chips Banner */}
      <div className="border-b-2 border-black bg-[#272727] p-3 font-mono text-xs">
        <div className="text-[10px] uppercase font-bold text-[#b7c6c2] tracking-wider mb-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffe17c]" />
          <span>STRESS-TEST CHIPS (1-CLICK PRESS):</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => runSimulation("plus_50_guests")}
            disabled={isProcessing}
            className="px-2.5 py-1 bg-white text-black font-mono text-[11px] font-bold uppercase rounded-md border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer"
          >
            +50 Guests
          </button>

          <button
            onClick={() => runSimulation("venue_hike")}
            disabled={isProcessing}
            className="px-2.5 py-1 bg-[#ffe17c] text-black font-mono text-[11px] font-bold uppercase rounded-md border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer"
          >
            Venue +INR 40k
          </button>

          <button
            onClick={() => runSimulation("rain_forecast")}
            disabled={isProcessing}
            className="px-2.5 py-1 bg-[#b7c6c2] text-black font-mono text-[11px] font-bold uppercase rounded-md border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer"
          >
            Rain on Lawn
          </button>

          <button
            onClick={() => runSimulation("compare_quotes")}
            disabled={isProcessing}
            className="px-2.5 py-1 bg-white text-black font-mono text-[11px] font-bold uppercase rounded-md border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer"
          >
            Compare Quotes
          </button>

          <button
            onClick={() => runSimulation("test_unfeasible")}
            disabled={isProcessing}
            className="px-2.5 py-1 bg-[#ff5f57] text-white font-mono text-[11px] font-bold uppercase rounded-md border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer"
          >
            Test Deficit
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 neo-dots-charcoal">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="font-mono text-[10px] uppercase text-[#b7c6c2] tracking-wider mb-1 flex items-center gap-1.5">
              {msg.sender === "user" ? (
                <>
                  <User className="h-3 w-3 text-[#ffe17c]" />
                  <span className="font-bold text-white">HOST QUERY</span>
                </>
              ) : (
                <>
                  <Bot className="h-3 w-3 text-[#ffe17c]" />
                  <span className="font-bold text-[#ffe17c]">FESTEJO AI</span>
                  {msg.stage && (
                    <span className="bg-black text-[#b7c6c2] px-1 rounded border border-[#272727]">
                      STAGE {msg.stage}
                    </span>
                  )}
                </>
              )}
              <span className="text-gray-400">({msg.timestamp})</span>
            </div>

            <div
              className={`max-w-[95%] p-3.5 rounded-xl border-2 border-black text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#ffe17c] text-black font-bold hard-shadow-4"
                  : "bg-white text-black font-medium hard-shadow-4"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.feasibilityAlert && (
                <FeasibilityWarningCard alert={msg.feasibilityAlert} />
              )}

              {msg.rippleAlert && (
                <RippleAlertCard ripple={msg.rippleAlert} />
              )}

              {msg.quoteComparison && (
                <QuoteComparisonCard comparison={msg.quoteComparison} />
              )}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="p-2.5 border-2 border-black bg-[#ffe17c] text-black font-mono text-xs font-bold rounded-lg hard-shadow-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-black animate-ping" />
            <span>CALCULATING TELEMETRY AND DEPENDENCY RIPPLE...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="border-t-2 border-black bg-[#ffe17c] p-3 space-y-2 text-black"
      >
        <div className="flex gap-2">
          <input
            id="chat-input"
            aria-label="Event planning query or parameter adjustment"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type change (e.g. 'Guests increased by 50' or 'Venue cost +40k')..."
            className="flex-1 border-2 border-black bg-white px-3 py-2 font-mono text-xs text-black placeholder-gray-500 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-black hard-shadow-2"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || isProcessing}
            className="px-4 py-2 bg-black text-[#ffe17c] font-heading font-extrabold text-xs uppercase tracking-wider rounded-lg border-2 border-black hard-shadow-2 neo-push-btn disabled:opacity-40 cursor-pointer flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-black"
          >
            <span>Send</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex justify-between font-mono text-[10px] text-[#171e19] font-bold">
          <span>Neo-Brutalist Push Interface</span>
          <span>Zero Hallucination Arithmetic</span>
        </div>
      </form>
    </div>
  );
}
