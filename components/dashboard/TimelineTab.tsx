"use client";

import React, { useState } from "react";
import { useEventStore } from "@/lib/store/useEventStore";

export function TimelineTab(): React.ReactElement {
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
      <div className="flex flex-wrap gap-2 font-mono text-xs" role="toolbar" aria-label="Timeline category filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={filterCategory === cat}
            aria-label={`Filter by ${cat}`}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 uppercase font-bold tracking-wider rounded-lg border-2 border-black transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-black outline-none ${
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
      <ol className="border-l-4 border-black pl-6 space-y-5 ml-2 list-none p-0">
        {filteredTasks.map((task) => {
          const isTZero = task.tMinusDays === 0;

          return (
            <li key={task.id} className="relative">
              {/* Chronological Badge */}
              <div
                aria-hidden="true"
                className={`absolute -left-[42px] top-1 h-8 w-8 rounded-full border-2 border-black flex items-center justify-center font-mono font-extrabold text-xs hard-shadow-2 ${
                  isTZero
                    ? "bg-[#ff5f57] text-white animate-pulse"
                    : task.status === "locked"
                    ? "bg-[#ffe17c] text-black"
                    : "bg-white text-black"
                }`}
              >
                {task.tMinusDays === 0 ? "D" : `T`}
              </div>

              {/* Task Card */}
              <div className="border-2 border-black rounded-xl bg-white p-4 hard-shadow-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold bg-[#171e19] text-[#ffe17c] px-2 py-0.5 rounded border border-black">
                      T-{task.tMinusDays} DAYS ({task.targetDate})
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase bg-[#b7c6c2] text-black px-2 py-0.5 rounded border border-black">
                      {task.category}
                    </span>
                  </div>

                  <span
                    className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-black ${
                      task.status === "locked"
                        ? "bg-black text-white"
                        : task.status === "in_progress"
                        ? "bg-[#ffe17c] text-black font-extrabold"
                        : "bg-white text-black"
                    }`}
                  >
                    STATUS: {task.status.replace("_", " ")}
                  </span>
                </div>

                <h4 className="font-heading text-lg font-extrabold text-black leading-snug">
                  {task.taskTitle}
                </h4>

                {task.dependencyWarning && (
                  <div className="p-2.5 bg-[#ff5f57]/15 border-l-4 border-[#ff5f57] text-[#171e19] text-xs font-medium font-mono">
                    <span className="font-bold text-[#ff5f57] uppercase block text-[10px]">
                      DOWNSTREAM BOTTLENECK WARNING:
                    </span>
                    {task.dependencyWarning}
                  </div>
                )}

                <div className="p-3 bg-[#f4f4f5] border border-black rounded-lg text-xs font-body text-gray-800 leading-relaxed">
                  <span className="font-mono text-[10px] uppercase font-bold text-black block mb-0.5">
                    GROUND REALITY WISDOM:
                  </span>
                  {task.indianContextTip}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
