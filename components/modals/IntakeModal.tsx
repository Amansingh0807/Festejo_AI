"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { CityTier, EventType } from "@/lib/types/event";
import { useEventStore } from "@/lib/store/useEventStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function IntakeModal({ isOpen, onClose }: Props) {
  const { initEventPlan, metadata } = useEventStore();

  const [eventType, setEventType] = useState<EventType>(metadata.eventType);
  const [city, setCity] = useState(metadata.city);
  const [cityTier, setCityTier] = useState<CityTier>(metadata.cityTier);
  const [guestCount, setGuestCount] = useState(metadata.guestCount);
  const [totalBudget, setTotalBudget] = useState(metadata.totalBudget);
  const [eventDate, setEventDate] = useState(metadata.eventDate);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    initEventPlan(totalBudget, guestCount, city, cityTier, eventType, eventDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 select-none backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="intake-modal-title"
        className="relative w-full max-w-lg border-2 border-black bg-white rounded-2xl p-6 hard-shadow-12 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close intake dialog"
          className="absolute right-4 top-4 p-1.5 bg-black text-[#ffe17c] rounded-lg border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b-2 border-black pb-3 mb-4">
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#171e19] bg-[#ffe17c] px-3 py-0.5 rounded border border-black inline-block mb-1">
            STAGE 1 INTAKE GATEKEEPER
          </span>
          <h3 id="intake-modal-title" className="font-heading text-2xl font-extrabold uppercase text-black tracking-tight">
            New Context Dispatch
          </h3>
          <p className="font-body text-xs text-gray-700 mt-0.5 font-medium">
            Four core anchors are required prior to initiating deterministic feasibility stress testing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {/* Event Type & Tier */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="intake-event-type" className="block text-black uppercase font-bold text-[10px] tracking-wider mb-1">
                Event Format
              </label>
              <select
                id="intake-event-type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
                className="w-full border-2 border-black rounded-lg bg-white px-3 py-2 text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black hard-shadow-2 font-medium"
              >
                <option value="Wedding">Wedding (Multi-Function)</option>
                <option value="Birthday">Birthday Celebration</option>
                <option value="Community">Society / Community Event</option>
                <option value="Corporate">Corporate Gala</option>
              </select>
            </div>

            <div>
              <label htmlFor="intake-city-tier" className="block text-black uppercase font-bold text-[10px] tracking-wider mb-1">
                City Tier Benchmark
              </label>
              <select
                id="intake-city-tier"
                value={cityTier}
                onChange={(e) => setCityTier(e.target.value as CityTier)}
                className="w-full border-2 border-black rounded-lg bg-white px-3 py-2 text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black hard-shadow-2 font-medium"
              >
                <option value="Tier-1">Tier-1 (Delhi, Mumbai, Bengaluru)</option>
                <option value="Tier-2">Tier-2 (Jaipur, Lucknow, Chandigarh)</option>
                <option value="Tier-3">Tier-3 (Regional District)</option>
              </select>
            </div>
          </div>

          {/* City Name & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="intake-city" className="block text-black uppercase font-bold text-[10px] tracking-wider mb-1">
                Location / City
              </label>
              <input
                id="intake-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. New Delhi"
                required
                className="w-full border-2 border-black rounded-lg bg-white px-3 py-2 text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black hard-shadow-2 font-medium"
              />
            </div>

            <div>
              <label htmlFor="intake-date" className="block text-black uppercase font-bold text-[10px] tracking-wider mb-1">
                Target Date
              </label>
              <input
                id="intake-date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                className="w-full border-2 border-black rounded-lg bg-white px-3 py-2 text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black hard-shadow-2 font-medium"
              />
            </div>
          </div>

          {/* Guest Count & Budget */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="intake-guests" className="block text-black uppercase font-bold text-[10px] tracking-wider mb-1">
                Guest Headcount
              </label>
              <input
                id="intake-guests"
                type="number"
                min="20"
                max="5000"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                required
                className="w-full border-2 border-black rounded-lg bg-white px-3 py-2 text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black font-extrabold hard-shadow-2"
              />
              <span className="text-[10px] text-gray-500 font-medium">Determines volume scale</span>
            </div>

            <div>
              <label htmlFor="intake-budget" className="block text-black uppercase font-bold text-[10px] tracking-wider mb-1">
                Total Budget (INR)
              </label>
              <input
                id="intake-budget"
                type="number"
                min="50000"
                step="50000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                required
                className="w-full border-2 border-black rounded-lg bg-white px-3 py-2 text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black font-extrabold text-[#ff5f57] hard-shadow-2"
              />
              <span className="text-[10px] text-gray-500 font-medium">
                INR {(totalBudget / 100000).toFixed(1)} Lakhs
              </span>
            </div>
          </div>

          {/* Pre-Stress Preview Box */}
          <div className="border-2 border-black rounded-xl bg-[#ffe17c] p-3 hard-shadow-2">
            <span className="text-[10px] uppercase font-bold text-black block mb-1">
              Deterministic Pre-Stress Calculation:
            </span>
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium">Per-Guest Available Pool:</span>
              <span className="font-extrabold text-black">
                INR {Math.round((totalBudget * 0.9) / Math.max(1, guestCount)).toLocaleString("en-IN")} / head
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border-2 border-black rounded-lg bg-white text-black font-heading font-extrabold uppercase hover:bg-gray-100 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-black text-[#ffe17c] font-heading font-extrabold uppercase rounded-lg border-2 border-black hard-shadow-2 neo-push-btn cursor-pointer flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black"
            >
              <Check className="h-4 w-4" />
              <span>Execute Stress-Test</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
