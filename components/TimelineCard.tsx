"use client";

import { useState } from "react";
import type { TimelineEvent } from "@/data/timeline";
import { getKingInfo } from "@/lib/timeline-utils";

type TimelineCardProps = {
  event: TimelineEvent;
};

export default function TimelineCard({ event }: TimelineCardProps) {
  const [open, setOpen] = useState(false);
  const { regnalYearText } = getKingInfo(event);

  return (
    <div className="relative pl-6 sm:pl-8">
      <div className="absolute left-0 top-7 h-3 w-3 rounded-full bg-[#7b5538]" />

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left"
      >
        <div className="rounded-[22px] md:rounded-[28px] border border-[#e7dcc9] bg-[#fffdf9] p-4 sm:p-5 md:p-6 shadow-[0_8px_24px_rgba(95,61,38,0.06)] transition hover:shadow-[0_12px_28px_rgba(95,61,38,0.10)]">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="rounded-full bg-[#7b5538] px-3 py-1 text-white">
              {event.year}년
            </span>
            <span className="rounded-full border border-[#e7dcc9] bg-[#faf6f0] px-3 py-1 text-[#6a5648]">
              {event.period}
            </span>
            <span className="rounded-full border border-[#e7dcc9] bg-[#faf6f0] px-3 py-1 text-[#6a5648]">
              {event.section}
            </span>
            <span className="rounded-full border border-[#e7dcc9] bg-[#faf6f0] px-3 py-1 text-[#6a5648]">
              {event.category}
            </span>
            <span className="rounded-full bg-[#efe3d3] px-3 py-1 text-[#6b4d37]">
              {regnalYearText}
            </span>
            {event.importance === "상" && (
              <span className="rounded-full bg-[#f6d9a8] px-3 py-1 text-[#7a4e10]">
                중요
              </span>
            )}
          </div>

          <h3 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-[#3f2c1f]">
            {event.title}
          </h3>

          <p className="mt-2 text-sm sm:text-base leading-7 text-[#665b52]">
            {event.summary}
          </p>

          {open && (
            <div className="mt-4 rounded-2xl bg-[#faf6f0] p-4 text-sm sm:text-base leading-7 text-[#544840] border border-[#eadfce]">
              {"detail" in event && event.detail ? (
                <p>{event.detail}</p>
              ) : (
                <p>{event.summary}</p>
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}