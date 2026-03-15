type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="rounded-3xl bg-white shadow-soft p-4 md:p-5">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="연도, 사건명, 왕 이름, 키워드 검색"
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
      />
    </div>
  );
}