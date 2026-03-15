import { kingAchievements } from "@/data/king-achievements";

type Props = {
  selectedPeriod: string;
};

export default function KingAchievementsSidebar({ selectedPeriod }: Props) {
  const filtered =
    selectedPeriod === "전체"
      ? kingAchievements
      : kingAchievements.filter((king) => king.period === selectedPeriod);

  return (
    <aside className="rounded-[24px] md:rounded-[28px] border border-[#e7dcc9] bg-[#fffdf9]/95 shadow-[0_10px_30px_rgba(95,61,38,0.07)] p-4 md:p-5 xl:sticky xl:top-6">
      <h2 className="text-lg md:text-xl font-bold text-[#3f2c1f]">
        왕별 업적 정리
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#6a5d53]">
        내신에서 자주 다뤄지는 왕을 중심으로 업적 흐름을 정리해보자.
      </p>

      <div className="mt-4 space-y-4 max-h-none xl:max-h-[80vh] xl:overflow-y-auto xl:pr-1">
        {filtered.map((king) => (
          <div
            key={`${king.period}-${king.name}`}
            className="rounded-2xl border border-[#eadfce] bg-[#faf6f0] p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#7b5538] px-3 py-1 text-xs text-white">
                {king.period}
              </span>
              <span className="font-semibold text-[#3f2c1f]">{king.name}</span>
              <span className="text-xs text-[#7b6e63]">
                {king.startYear} ~ {king.endYear}
              </span>
            </div>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#5a4f47]">
              {king.achievements.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#b1845e] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
