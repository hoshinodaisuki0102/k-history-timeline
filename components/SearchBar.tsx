type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="rounded-[24px] md:rounded-[28px] border border-[#e7dcc9] bg-[#fffdf9]/95 shadow-[0_10px_30px_rgba(95,61,38,0.07)] p-4 md:p-5">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="연도, 사건명, 왕 이름, 키워드 검색"
        className="w-full rounded-2xl border border-[#e7dcc9] bg-[#faf6f0] px-4 py-3 text-sm sm:text-base outline-none transition focus:border-[#b1845e] focus:bg-white"
      />
    </div>
  );
}