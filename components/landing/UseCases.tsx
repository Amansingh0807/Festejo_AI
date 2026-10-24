"use client";

import React from "react";
import { Users, Building, Cake } from "lucide-react";

export function UseCases() {
  const personas = [
    {
      badge: "COUPLES & FAMILIES",
      title: "Multi-Day Indian Weddings",
      desc: "Balancing Haldi, Mehendi, Sangeet, and Reception. Protects your family from outside decorator penalty royalties, unmetered generator diesel, and caterer plate inflation.",
      bg: "bg-[#b7c6c2] text-black",
      shadow: "hard-shadow-4",
      icon: <Users className="h-6 w-6 text-black" />,
      highlight: "80% Minimum Guarantee + 10% Floating Buffer",
    },
    {
      badge: "SOCIETY COMMITTEES",
      title: "Community & Festive Melas",
      desc: "Managing high-footfall Diwali or cultural society gatherings. Enforces Supreme Court 10 PM sound permits, electrical fire clearance, and crowd control vendor SLAs.",
      bg: "bg-[#ffe17c] text-black",
      shadow: "hard-shadow-8",
      icon: <Building className="h-6 w-6 text-black" />,
      highlight: "Society NOC Compliance & Overtime Lock",
    },
    {
      badge: "HOSTS & ENTERPRISE",
      title: "Milestone Birthdays & Galas",
      desc: "High-energy 4-hour banquets or corporate milestones. Optimizes kid-to-adult plate pricing ratios, live chaat stalls, and emcee entertainment contracts.",
      bg: "bg-[#272727] text-white",
      shadow: "hard-shadow-4",
      icon: <Cake className="h-6 w-6 text-[#ffe17c]" />,
      highlight: "Live Stalls vs Heavy Dinner Format Shift",
    },
  ];

  return (
    <section className="w-full bg-white border-b-2 border-black py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#171e19] bg-[#b7c6c2] px-3.5 py-1 rounded-full border-2 border-black hard-shadow-2">
            TAILORED ENGINES
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-black tracking-tight">
            BUILT FOR EVERY CELEBRATION SCALE
          </h2>
          <p className="font-body text-sm sm:text-base text-[#171e19] max-w-xl mx-auto">
            From intimate 80-guest gatherings to 1,000-guest royal banquets, Festejo AI calibrates to tier economics automatically.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {personas.map((p, idx) => (
            <div
              key={idx}
              className={`${p.bg} border-2 border-black rounded-2xl p-7 ${p.shadow} flex flex-col justify-between`}
            >
              <div>
                {/* White Pill Badge */}
                <div className="inline-flex items-center gap-1.5 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border-2 border-black hard-shadow-2 mb-6">
                  {p.icon}
                  <span>{p.badge}</span>
                </div>

                <h3 className="font-heading text-2xl font-extrabold mb-3 leading-snug">
                  {p.title}
                </h3>

                <p className="font-body text-sm leading-relaxed opacity-90">
                  {p.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-xs font-bold">
                <span className="block text-[10px] uppercase opacity-75">BENCHMARK RULE:</span>
                <span>{p.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
