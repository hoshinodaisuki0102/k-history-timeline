type KingAchievement = {
  period: "고려" | "조선";
  name: string;
  reign: string;
  achievements: string[];
};

type KingAchievementsSidebarProps = {
  data: KingAchievement[];
  selectedPeriod: string;
};

export default function KingAchievementsSidebar({
  data,
  selectedPeriod,
}: KingAchievementsSidebarProps) {
  const filtered =
    selectedPeriod === "전체"
      ? data
      : data.filter((item) => item.period === selectedPeriod);

  return (
    <aside className="rounded-3xl bg-white shadow-soft p-5 md:p-6 h-fit xl:sticky xl:top-6">
      <h2 className="text-xl font-bold">왕별 업적 정리</h2>
      <p className="mt-2 text-sm text-slate-600 leading-6">
        교과서에서 비중 있게 다루는 왕과 통치 시기의 특징만 간단히 모아 정리했어.
      </p>

      <div className="mt-5 space-y-4 max-h-[70vh] overflow-auto pr-1">
        {filtered.map((king) => (
          <div key={`${king.period}-${king.name}-${king.reign}`} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
                {king.period}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                {king.reign}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold">{king.name}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 leading-6">
              {king.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
