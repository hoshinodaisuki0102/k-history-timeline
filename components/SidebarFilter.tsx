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
  return (
    <aside className="rounded-3xl bg-white shadow-soft p-5 md:p-6 h-fit sticky top-6">
      <h2 className="text-xl font-bold">시대 필터</h2>

      <div className="mt-5 space-y-2">
        <button
          onClick={() => setSelectedPeriod("전체")}
          className={`w-full rounded-2xl px-4 py-3 text-left border ${
            selectedPeriod === "전체"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white border-slate-200"
          }`}
        >
          전체 보기
        </button>

        <button
          onClick={() => setSelectedPeriod("고려")}
          className={`w-full rounded-2xl px-4 py-3 text-left border ${
            selectedPeriod === "고려"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white border-slate-200"
          }`}
        >
          고려만
        </button>

        <button
          onClick={() => setSelectedPeriod("조선")}
          className={`w-full rounded-2xl px-4 py-3 text-left border ${
            selectedPeriod === "조선"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white border-slate-200"
          }`}
        >
          조선만
        </button>
      </div>

      <div className="mt-5">
        <button
          onClick={() => setImportantOnly(!importantOnly)}
          className={`w-full rounded-2xl px-4 py-3 text-left border ${
            importantOnly
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white border-slate-200"
          }`}
        >
          {importantOnly ? "✓ 중요 사건만 보는 중" : "중요 사건만 보기"}
        </button>
      </div>
    </aside>
  );
}