import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고려~조선 1000년 타임라인",
  description: "고려 건국부터 조선 말기까지를 한눈에 보는 암기용 한국사 타임라인",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}