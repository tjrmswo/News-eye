"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSubjectVisible, setIsSubjectVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSubjectVisible(true), 100);
    setTimeout(() => setIsTitleVisible(true), 600);
  }, []);

  return (
    <main className="mb-20 flex h-xs w-full flex-col items-center justify-center gap-10 shadow-lg">
      {isSubjectVisible && (
        <div className="subject text-5xl">세상 사는 눈을 키운다</div>
      )}
      {isTitleVisible && (
        <span className="title text-4xl text-[#c1c1c1]">News-eye</span>
      )}
    </main>
  );
}
