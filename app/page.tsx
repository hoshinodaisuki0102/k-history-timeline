"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import SidebarFilter from "@/components/SidebarFilter";
import TimelineCard from "@/components/TimelineCard";
import KingAchievementsSidebar from "@/components/KingAchievementsSidebar";
import { timelineData } from "@/data/timeline";
import { kingAchievements } from "@/data/king-achievements";
import { getKingInfo, sortTimeline } from "@/lib/timeline-utils";

export default function Page() {
  const [search, setSearch] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("전체");
  const [importantOnly, setImportantOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return sortTimeline(timelineData).filter((event) => {
      const { kingName, regnalYearText } = getKingInfo(event);

      const matchesPeriod =
        selectedPeriod === "전체" || event.period === selectedPeriod;

      const matchesImportance =
        !importantOnly || event.importance === "상";

      const matchesSearch =
        !q ||
        [
          event.title,
          event.summary,
          event.detail,
          event.category,
          event.section,
          event.period,
          String(event.year),
          kingName,
          regnalYearText,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return matchesPeriod && matchesImportance && matchesSearch;
    });
  }, [search, selectedPeriod, importantOnly]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <section className="rounded-[28px] bg-white shadow-soft p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            고려~조선 말기 타임라인
          </h1>
          <p className="mt-3 text-slate-600 leading-7">
            고려 건국부터 조선 말기까지의 핵심 사건을 연도순으로 보고,
            왕대와 재위 연차, 왕별 주요 업적까지 함께 정리하는 암기 보조 사이트
          </p>
        </section>

        <div className="grid xl:grid-cols-[280px_minmax(0,1fr)_340px] gap-6">
          <SidebarFilter
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            importantOnly={importantOnly}
            setImportantOnly={setImportantOnly}
          />

          <section className="space-y-4 min-w-0">
            <SearchBar value={search} onChange={setSearch} />

            <div className="rounded-3xl bg-white shadow-soft p-5 md:p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="text-2xl font-bold">연도순 타임라인</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  검색 결과 {filtered.length}개
                </span>
              </div>

              <div className="relative mt-6 space-y-4 before:absolute before:left-[5px] before:top-0 before:h-full before:w-px before:bg-slate-200">
                {filtered.map((event) => (
                  <TimelineCard
                    key={`${event.year}-${event.title}`}
                    event={event}
                  />
                ))}
              </div>
            </div>
          </section>

          <KingAchievementsSidebar
            data={kingAchievements}
            selectedPeriod={selectedPeriod}
          />
        </div>
      </div>
    </main>
  );
}
