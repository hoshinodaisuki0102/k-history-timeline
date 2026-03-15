type SidebarFilterProps = {
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  importantOnly: boolean;
  setImportantOnly: (value: boolean) => void;
};

export default function SidebarFilter({
  selectedPeriod,
  setSelectedPeriod,
  importantOnly,
  setImportantOnly,
}: SidebarFilterProps) {
  const baseBtn =
    "w-full rounded-2xl px-4 py-3 text-left border transition text-sm sm:text-base";
  const active =
    "bg-[#7b5538] text-white border-[#7b5538] shadow-sm";
  const inactive =
    "bg-white border-[#e7dcc9] text-[#4b3a2f] hover:bg-[#faf4ec]";

  return (
    <aside className="rounded-[24px] md:rounded-[28px] border border-[#e7dcc9] bg-[#fffdf9]/95 shadow-[0_10px_30px_rgba(95,61,38,0.07)] p-4 md:p-5 xl:sticky xl:top-6">
      <h2 className="text-lg md:text-xl font-bold text-[#3f2c1f]">시대 필터</h2>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => setSelectedPeriod("전체")}
          className={`${baseBtn} ${selectedPeriod === "전체" ? active : inactive}`}
        >
          전체 보기
        </button>

        <button
          onClick={() => setSelectedPeriod("고려")}
          className={`${baseBtn} ${selectedPeriod === "고려" ? active : inactive}`}
        >
          고려만
        </button>

        <button
          onClick={() => setSelectedPeriod("조선")}
          className={`${baseBtn} ${selectedPeriod === "조선" ? active : inactive}`}
        >
          조선만
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setImportantOnly(!importantOnly)}
          className={`${baseBtn} ${importantOnly ? active : inactive}`}
        >
          {importantOnly ? "✓ 중요 사건만 보는 중" : "중요 사건만 보기"}
        </button>
      </div>
    </aside>
  );
}