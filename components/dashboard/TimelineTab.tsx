"use client";

import React, { useState } from "react";
import { useEventStore } from "@/lib/store/useEventStore";

export function TimelineTab() {
  const timelineTasks = useEventStore((s) => s.timelineTasks);
  const metadata = useEventStore((s) => s.metadata);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", "Venue", "Catering", "Decor", "Permissions", "Logistics", "Execution"];

  const filteredTasks = React.useMemo(() => {
    return filterCategory === "All"
      ? timelineTasks
      : timelineTasks.filter((t) => t.category.toLowerCase() === filterCategory.toLowerCase());
  }, [filterCategory, timelineTasks]);

  return (
    <div className="p-6 space-y-6 text-black font-body">
      {/* Section Header */}
      <div className="border-b-2 border-black pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#171e19] bg-[#b7c6c2] px-3 py-0.5 rounded border border-black inline-block mb-1">
            DECISION ENGINE SECTION II
          </span>
          <h3 className="font-heading text-3xl font-extrabold uppercase text-black tracking-tight">
            Dependency-Aware Reverse Countdown
          </h3>
        </div>

        <div className="font-mono text-xs font-bold text-black bg-[#ffe17c] px-3 py-1 rounded border border-black">
          EVENT DATE: {metadata.eventDate}
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 uppercase font-bold tracking-wider rounded-lg border-2 border-black transition-all cursor-pointer ${
              filterCategory === cat
                ? "bg-black text-[#ffe17c] hard-shadow-2 translate-x-[-1px] translate-y-[-1px]"
                : "bg-white text-black hover:bg-[#ffe17c] hard-shadow-2 neo-push-btn"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Feed */}
      <div className="border-l-4 border-black pl-6 space-y-5 ml-2">
        {filteredTasks.map((task, idx) => {
          const isTZero = task.tMinusDays === 0;

          return (
            <div key={task.id} className="relative">
              {/* Chronological Badge */}
              <div
                className={`absolute -left-[38px] top-1.5 h-7 w-7 rounded-full border-2 border-black font-mono text-xs font-extrabold flex items-center justify-center hard-shadow-2 ${
                  isTZero ? "bg-[#ff5f57] text-white" : "bg-[#ffe17c] text-black"
                }`}
              >
                {(idx + 1).toString().padStart(2, "0")}
              </div>

              {/* Task Card */}
              <div
                className={`border-2 border-black rounded-xl p-4.5 bg-white hard-shadow-4 ${
                  isTZero ? "bg-[#ffe17c]/20" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-2 mb-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded font-extrabold uppercase tracking-wider border border-black ${
                        isTZero ? "bg-[#ff5f57] text-white" : "bg-black text-[#ffe17c]"
                      }`}
                    >
                      {isTZero ? "EVENT DAY" : `T-${task.tMinusDays} DAYS`}
                    </span>

                    <span className="text-gray-600 font-bold">({task.targetDate})</span>

                    <span className="border-2 border-black bg-[#b7c6c2] px-2 py-0.2 rounded font-bold uppercase text-[10px] text-black">
                      {task.category}
                    </span>
                  </div>

                  <span className="uppercase text-[10px] font-extrabold text-black bg-[#f4f4f5] px-2 py-0.5 rounded border border-black">
                    STATUS: {task.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>

                <h4 className="font-heading text-lg font-extrabold text-black">
                  {task.taskTitle}
                </h4>

                {/* Precedent Dependency Warning */}
                {task.dependencyWarning && (
                  <div className="mt-2.5 p-2.5 bg-[#ffe17c] border-2 border-black rounded-lg font-mono text-xs text-black hard-shadow-2">
                    <span className="font-extrabold text-[#ff5f57] uppercase block text-[10px]">
                      PRECEDENT DEPENDENCY LOCK:
                    </span>
                    <span className="font-body text-xs text-black font-medium">
                      {task.dependencyWarning}
                    </span>
                  </div>
                )}

                {/* Indian Context Tip */}
                <div className="mt-2.5 p-2.5 border-2 border-black rounded-lg bg-[#b7c6c2]/40 font-body text-xs text-black leading-relaxed">
                  <span className="font-mono text-[10px] font-extrabold uppercase text-black tracking-wider block mb-0.5">
                    Statutory & Cultural Ground Reality:
                  </span>
                  {task.indianContextTip}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
