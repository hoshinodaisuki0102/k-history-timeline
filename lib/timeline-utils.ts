import { kings } from "@/data/kings";
import type { TimelineEvent } from "@/data/timeline";

export function getKingInfo(event: TimelineEvent) {
  const king = kings.find(
    (k) => k.period === event.period && event.year >= k.startYear && event.year <= k.endYear
  );

  if (!king) {
    return {
      kingName: "미상",
      regnalYearText: "왕대 미상",
    };
  }

  const regnalYear = event.year - king.startYear + 1;
  const regnalYearText = regnalYear === 1 ? `${king.name} 즉위년` : `${king.name} ${regnalYear}년`;

  return {
    kingName: king.name,
    regnalYearText,
  };
}

export function sortTimeline<T extends { year: number }>(items: T[]) {
  return [...items].sort((a, b) => a.year - b.year);
}