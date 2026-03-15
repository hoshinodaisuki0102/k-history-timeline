"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import SidebarFilter from "@/components/SidebarFilter";
import TimelineCard from "@/components/TimelineCard";
import KingAchievementsSidebar from "@/components/KingAchievementsSidebar";
import { timelineData } from "@/data/timeline";
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
          event.detail ?? "",
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
    <main className="min-h-screen px-3 py-4 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-4 md:space-y-6">
        <section className="rounded-[24px] md:rounded-[32px] border border-[#e7dcc9] bg-[#fffdf9]/90 shadow-[0_12px_40px_rgba(95,61,38,0.08)] p-5 md:p-8 backdrop-blur-sm">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#7a5a44]">
              <span className="rounded-full bg-[#efe3d3] px-3 py-1">한국사 암기 보조</span>
              <span className="rounded-full border border-[#e7dcc9] px-3 py-1">고려 ~ 조선 말기</span>
              <span className="rounded-full border border-[#e7dcc9] px-3 py-1">왕대·사건 흐름 정리</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#3f2c1f]">
                고려~조선 말기 역사 타임라인
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-7 text-[#6f6257]">
                사건을 연도순으로 정리하고, 각 사건이 어느 왕대에 해당하는지 함께 보면서
                흐름을 빠르게 복습할 수 있도록 만든 사이트
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[260px_minmax(0,1fr)_320px] xl:gap-6">
          <div className="order-2 xl:order-1">
            <SidebarFilter
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              importantOnly={importantOnly}
              setImportantOnly={setImportantOnly}
            />
          </div>

          <section className="order-1 xl:order-2 space-y-4">
            <SearchBar value={search} onChange={setSearch} />

            <div className="rounded-[24px] md:rounded-[32px] border border-[#e7dcc9] bg-[#fffdf9]/95 shadow-[0_12px_40px_rgba(95,61,38,0.08)] p-4 sm:p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-[#3f2c1f]">
                  연도순 타임라인
                </h2>
                <span className="w-fit rounded-full bg-[#efe3d3] px-3 py-1 text-sm text-[#6b4d37]">
                  검색 결과 {filtered.length}개
                </span>
              </div>

              <div className="relative mt-5 space-y-4 before:absolute before:left-[5px] before:top-0 before:h-full before:w-px before:bg-[#d8c2ab] sm:before:left-[7px]">
                {filtered.map((event) => (
                  <TimelineCard
                    key={`${event.year}-${event.title}`}
                    event={event}
                  />
                ))}
              </div>
            </div>
          </section>

          <div className="order-3">
            <KingAchievementsSidebar selectedPeriod={selectedPeriod} />
          </div>
        </div>
      </div>
    </main>
  );
}