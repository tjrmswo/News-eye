"use client";
import Image from "next/image";
import { NewsDataType } from "@/types/news";
import { useEffect, useState } from "react";
import { useHandleHeader } from "@/shared";

export default function Categories() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { getData, categoryData, categorySuccess } = useHandleHeader();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(!isReady);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div
        className={` ${categorySuccess ? "opacity-100" : "opacity-0"} flex min-h-screen w-full flex-row justify-center transition-opacity duration-100 ease-in-out`}
      >
        <main className="mb-20 flex w-4/5 flex-row flex-wrap justify-center">
          {categorySuccess &&
            categoryData.map((a: NewsDataType, i: number) => {
              return (
                <div
                  key={i}
                  className="hover:showUpArticles flex w-md cursor-pointer flex-row justify-between rounded-md p-1 pr-3 text-sm hover:shadow-md"
                  onClick={() => getData(a, i)}
                >
                  <Image
                    className="m-2 rounded-md"
                    src={a.urlToImage ? a.urlToImage : "/images/news-eye.png"}
                    alt="뉴스사진"
                    width={150}
                    height={150}
                    loading="lazy"
                  />
                  <div className="flex flex-col justify-evenly">
                    <span>{a.title.slice(0, 25) + "..."}</span>
                    <span>{a.description.slice(0, 25) + "..."}</span>
                    <span className="text-xs text-[#BEBEBE]">{a.author}</span>
                  </div>
                </div>
              );
            })}
        </main>
      </div>
    </div>
  );
}
