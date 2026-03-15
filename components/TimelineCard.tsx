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
    <div className="relative pl-8">
      <div className="absolute left-0 top-7 h-3 w-3 rounded-full bg-slate-900" />

      <button onClick={() => setOpen((prev) => !prev)} className="w-full text-left">
        <div className="rounded-3xl bg-white shadow-soft border border-slate-100 p-5 md:p-6 transition hover:shadow-lg">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-white">
              {event.year}년
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1">
              {event.period}
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1">
              {event.section}
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1">
              {event.category}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1">
              {regnalYearText}
            </span>
            {event.importance === "상" && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">
                중요
              </span>
            )}
          </div>

          <h3 className="mt-4 text-xl font-bold tracking-tight">{event.title}</h3>
          <p className="mt-2 text-slate-600 leading-7">{event.summary}</p>

          {open && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 leading-7">
              <p>{event.detail}</p>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
