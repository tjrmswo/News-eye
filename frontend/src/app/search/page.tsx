'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';

// constants
import { tabNames } from '@/constants/home';

// contexts
import { DataContext } from '@/contexts/home';

// types
import { ContextType } from '@/types/home';

// libraries
import { ChartBar, Search } from 'lucide-react';

export default function SearchNews() {
  const context = useContext<ContextType>(DataContext);

  const {
    handleInputComponent,
    componentChange,
    handleInput,
    keyDownEnter,
    searchWord,
    searchedData,
    getData,
    searchNews,
    setComponentChange,
    setSearchWord,
  } = context;

  // 새로고침 시 로컬 저장소에서 검색어를 불러와 설정
  useEffect(() => {
    const storedSearchWord = localStorage.getItem('searchWord');
    if (storedSearchWord) {
      setTimeout(() => {
        setComponentChange(true);
      }, 100);
      setSearchWord(storedSearchWord);
      searchNews(storedSearchWord);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="flex flex-row w-4xl items-center justify-around p-10">
        <div className="flex flex-row items-center">
          <Image
            src={'/images/news-eye.png'}
            width={55}
            height={55}
            alt="로고"
          />
          <span className="font-black text-2xl font-[Open_Sans]">News-eye</span>
        </div>

        {componentChange === true ? (
          <div className="flex items-center justify-center w-md">
            <div className="flex items-center justify-center w-md bg-[#FAFAFA] rounded-lg text-[#818181]">
              <input
                className="w-sm p-1 bg-[rgba(255,255,255,0)] border-b-2 mb-2"
                onChange={(e) => handleInput(e)}
                onKeyDown={(e) => keyDownEnter(e)}
                value={searchWord}
              />
            </div>
          </div>
        ) : (
          <div
            className={
              'showTabs flex flex-row w-md justify-between font-[Open_Sans]'
            }
          >
            {tabNames.map((name, i) => (
              <Link href={`${name.href}`} key={i}>
                <span
                  className="p-2 rounded-2xl hover:bg-[#f3f3f3] focus:bg-[#f3f3f3] focus:text-[#797979] cursor-pointer transition-colors duration-300"
                  tabIndex={0}
                >
                  {name.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Search
          size={30}
          className="text-[black] cursor-pointer hover:bg-[#f3f3f3] p-1 rounded-sm"
          onClick={handleInputComponent}
        />
        <Link href={'/admin'}>
          <ChartBar
            className="text-[black] cursor-pointer hover:bg-[#f3f3f3] p-1 rounded-sm"
            size={30}
          />
        </Link>
      </header>
      <div className="w-full min-h-screen flex flex-row justify-center ">
        <main className="w-4/5 mb-20 flex flex-row flex-wrap justify-center">
          {searchedData ? (
            searchedData.map((data, i) => (
              <div
                key={i}
                className="hover:showUpArticles w-md flex flex-row justify-between text-sm cursor-pointer hover:shadow-md p-1 pr-3 rounded-md"
                onClick={() => getData(data, i)}
              >
                <Image
                  className="rounded-md m-2"
                  src={
                    data.urlToImage ? data.urlToImage : '/images/news-eye.png'
                  }
                  alt="뉴스사진"
                  width={150}
                  height={150}
                />
                <div className="flex flex-col justify-evenly">
                  <span>{data.title.slice(0, 25) + '...'}</span>
                  <span>{data.description.slice(0, 25) + '...'}</span>
                  <span className="text-[#BEBEBE] text-xs">{data.author}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="relative bottom-20 flex items-center justify-center size-full">
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

      <footer className="flex flex-col items-center justify-evenly w-full p-5 bg-[#000000]">
        <div className="relative left-[50] flex flex-row items-center mb-3">
          <span className="relative top-3 p-10 font-black text-xl font-[Open_Sans] text-white">
            News-eye
          </span>
          <div className="p-10 border-l-2 font-black text-sm font-[Open_Sans] text-white">
            제작자: 서근재
            <br /> 연락처: 010-0000-0000
            <br /> 이메일: example@eaxmple.com
            <br /> 이 프로젝트는 개인 사이드 프로젝트입니다😁
          </div>
        </div>
        <span className="relative right-8 text-white text-xs">
          Copyright ⓒ 서근재
        </span>
      </footer>
    </div>
  );
}
