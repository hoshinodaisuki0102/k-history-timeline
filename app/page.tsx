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
  const [mobilePanel, setMobilePanel] = useState<"timeline" | "filter" | "kings">("timeline");

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

  const mobileTabBase =
    "flex-1 rounded-2xl px-3 py-3 text-sm font-medium border transition";
  const mobileTabActive =
    "bg-[#7b5538] text-white border-[#7b5538]";
  const mobileTabInactive =
    "bg-white text-[#4b3a2f] border-[#e7dcc9]";

  return (
    <main className="min-h-screen px-3 py-4 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-4 md:space-y-6">
        <section className="rounded-[24px] md:rounded-[32px] border border-[#e7dcc9] bg-[#fffdf9]/90 shadow-[0_12px_40px_rgba(95,61,38,0.08)] p-5 md:p-8">
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
                사건을 연도순으로 정리하고, 각 사건이 어느 왕대에 해당하는지 함께 보면서 흐름을 빠르게 복습할 수 있도록 만든 사이트
              </p>
            </div>
          </div>
        </section>

        <SearchBar value={search} onChange={setSearch} />

        {/* 모바일 전용 탭 */}
        <div className="xl:hidden sticky top-2 z-20 rounded-[24px] border border-[#e7dcc9] bg-[#fffdf9]/95 backdrop-blur p-3 shadow-[0_10px_30px_rgba(95,61,38,0.07)]">
          <div className="flex gap-2">
            <button
              className={`${mobileTabBase} ${mobilePanel === "timeline" ? mobileTabActive : mobileTabInactive}`}
              onClick={() => setMobilePanel("timeline")}
            >
              타임라인
            </button>
            <button
              className={`${mobileTabBase} ${mobilePanel === "filter" ? mobileTabActive : mobileTabInactive}`}
              onClick={() => setMobilePanel("filter")}
            >
              시대 필터
            </button>
            <button
              className={`${mobileTabBase} ${mobilePanel === "kings" ? mobileTabActive : mobileTabInactive}`}
              onClick={() => setMobilePanel("kings")}
            >
              왕별 업적
            </button>
          </div>
        </div>

        {/* 모바일 전용 패널 */}
        <div className="xl:hidden">
          {mobilePanel === "timeline" && (
            <section className="space-y-4">
              <div className="rounded-[24px] border border-[#e7dcc9] bg-[#fffdf9]/95 shadow-[0_12px_40px_rgba(95,61,38,0.08)] p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-bold text-[#3f2c1f]">연도순 타임라인</h2>
                  <span className="w-fit rounded-full bg-[#efe3d3] px-3 py-1 text-sm text-[#6b4d37]">
                    검색 결과 {filtered.length}개
                  </span>
                </div>

                <div className="relative mt-5 space-y-4 before:absolute before:left-[5px] before:top-0 before:h-full before:w-px before:bg-[#d8c2ab]">
                  {filtered.map((event) => (
                    <TimelineCard key={`${event.year}-${event.title}`} event={event} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {mobilePanel === "filter" && (
            <SidebarFilter
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              importantOnly={importantOnly}
              setImportantOnly={setImportantOnly}
            />
          )}

          {mobilePanel === "kings" && (
            <KingAchievementsSidebar selectedPeriod={selectedPeriod} />
          )}
        </div>

        {/* PC 전용 3열 */}
        <div className="hidden xl:grid xl:grid-cols-[260px_minmax(0,1fr)_320px] xl:gap-6">
          <SidebarFilter
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            importantOnly={importantOnly}
            setImportantOnly={setImportantOnly}
          />

          <section className="space-y-4">
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
                  <TimelineCard key={`${event.year}-${event.title}`} event={event} />
                ))}
              </div>
            </div>
          </section>

          <KingAchievementsSidebar selectedPeriod={selectedPeriod} />
        </div>
      </div>
    </main>
  );
}
