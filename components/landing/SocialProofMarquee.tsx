"use client";

import React from "react";

export function SocialProofMarquee() {
  const brands = [
    "ACME HOSPITALITY GUILD",
    "GLOBEX BANQUET COUNCILS",
    "ROYAL MARWAR RESORTS",
    "METRO EVENT ALLIANCE",
    "FSSAI CATERERS GUILD",
    "SOUNDPRO STAGE LOGISTICS",
    "DELHI HERITAGE LAWNS",
    "MUMBAI PROTOCOL FORUM",
    "PACIFIC CATERING NETWORKS",
    "INNOVA EVENT SYSTEMS",
  ];

  return (
    <div className="w-full bg-[#171e19] border-b-2 border-black py-4 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-12 font-heading text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-[#b7c6c2] opacity-60">
        {brands.concat(brands).map((brand, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span>{brand}</span>
            <span className="h-2 w-2 rounded-full bg-[#ffe17c]" />
          </div>
        ))}
      </div>
    </div>
  );
}
