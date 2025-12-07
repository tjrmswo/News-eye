"use client";
import Image from "next/image";
import { useContext, useEffect } from "react";

// contexts
import { DataContext } from "@/contexts/home";

// types
import { ContextType } from "@/types/news";

export default function SearchNews() {
  // ✅ 현재 query parameter의 field 값 가져오기
  const context = useContext<ContextType>(DataContext);

  const {
    searchedData,
    getData,
    searchNews,
    setComponentChange,
    setSearchWord,
  } = context;

  // 새로고침 시 로컬 저장소에서 검색어를 불러와 설정
  useEffect(() => {
    const storedSearchWord = localStorage.getItem("searchWord");
    if (storedSearchWord) {
      setTimeout(() => {
        setComponentChange(true);
      }, 100);
      setSearchWord(storedSearchWord);
      searchNews(storedSearchWord);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="flex min-h-screen w-full flex-row justify-center">
        <main className="mb-20 flex w-4/5 flex-row flex-wrap justify-center">
          {searchedData ? (
            searchedData.map((data, i) => (
              <div
                key={i}
                className="hover:showUpArticles flex w-md cursor-pointer flex-row justify-between rounded-md p-1 pr-3 text-sm hover:shadow-md"
                onClick={() => getData(data, i)}
              >
                <Image
                  className="m-2 rounded-md"
                  src={
                    data.urlToImage ? data.urlToImage : "/images/news-eye.png"
                  }
                  alt="뉴스사진"
                  width={150}
                  height={150}
                />
                <div className="flex flex-col justify-evenly">
                  <span>{data.title.slice(0, 25) + "..."}</span>
                  <span>{data.description.slice(0, 25) + "..."}</span>
                  <span className="text-xs text-[#BEBEBE]">{data.author}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="relative bottom-20 flex size-full items-center justify-center">
              <div className="typewriter">
                <div className="slide">
                  <i></i>
                </div>
                <div className="paper"></div>
                <div className="keyboard"></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
