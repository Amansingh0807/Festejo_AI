"use client";

import React from "react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Discovery Gatekeeper",
      subtitle: "Stage 1 Intake",
      desc: "Provide 4 core anchors: Event Type, City Tier, Guest Count, and Total Budget. Festejo AI refuses to generate fictional plans without anchors.",
      glowColor: "border-[#b7c6c2]",
      tagColor: "bg-[#b7c6c2] text-black",
      circleBg: "bg-[#171e19] text-[#b7c6c2]",
    },
    {
      num: "02",
      title: "Pre-Computation Stress-Test",
      subtitle: "Stage 2 Feasibility",
      desc: "Calculates Per-Head Economics against city benchmarks. If unrealistic, issues an immediate Feasibility Alert with 3 concrete trade-offs.",
      glowColor: "border-[#ffe17c]",
      tagColor: "bg-[#ffe17c] text-black",
      circleBg: "bg-[#171e19] text-[#ffe17c]",
    },
    {
      num: "03",
      title: "State-Aware Adaptation",
      subtitle: "Stage 3 & 4 Execution",
      desc: "Delivers 4 interlinked deliverables. Test variable shocks anytime to observe downstream timeline shifts and vendor cost absorption.",
      glowColor: "border-white",
      tagColor: "bg-white text-black",
      circleBg: "bg-[#171e19] text-white",
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#171e19] text-white py-20 px-4 sm:px-8 border-b-2 border-black">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-black bg-[#b7c6c2] px-3.5 py-1 rounded-full border-2 border-black hard-shadow-2">
            OPERATIONAL ARCHITECTURE
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#ffe17c] tracking-tight">
            HOW FESTEJO AI EXECUTES
          </h2>
          <p className="font-body text-sm sm:text-base text-[#b7c6c2] max-w-xl mx-auto">
            A 4-stage deterministic pipeline where the AI remains in one state at a time, ensuring arithmetic integrity and zero messy outputs.
          </p>
        </div>

        {/* 3-Step Horizontal Flow with Connected Line */}
        <div className="relative">
          {/* Connecting Dark Gray #272727 Horizontal Line on desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-[#272727] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            {steps.map((st, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                {/* 24x24 Circle (h-24 w-24 = 96px) with 4px colored border */}
                <div
                  className={`h-24 w-24 rounded-full border-4 ${st.glowColor} ${st.circleBg} flex items-center justify-center font-heading text-3xl font-extrabold hard-shadow-4`}
                >
                  {st.num}
                </div>

                <span className={`font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded border border-black ${st.tagColor}`}>
                  {st.subtitle}
                </span>

                <h3 className="font-heading text-xl font-bold text-white">
                  {st.title}
                </h3>

                <p className="font-body text-sm text-[#b7c6c2] leading-relaxed max-w-xs">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
