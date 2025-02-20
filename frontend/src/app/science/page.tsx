'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// constants
import { tabNames } from '@/constants/home';

// libraries
import { ChartBar, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// types
import { ContextType, NewsDataType } from '@/types/home';

// contexts
import { DataContext } from '@/contexts/home';

// apis
import { NewsApiClient } from '@/app/api/newsApi';

export default function Science() {
  const context = useContext<ContextType>(DataContext);

  const { selectedData, getData } = context;

  // 경로 이름
  const pathName = usePathname();

  // 컴포넌트 변경 boolean
  const [componentChange, setComponentChange] = useState<boolean>(false);

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  const { data: ScienceData, refetch: refetchScienceData } = useQuery<
    NewsDataType[]
  >({
    queryKey: ['getScienceData'],
    queryFn: async () => {
      const response = await NewsApiClient.get(`/api/news/category?field=과학`);
      const data = response.data;

      // console.log(data);

      return data;
    },
  });

  useEffect(() => {
    refetchScienceData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="flex flex-row w-[800px] h-[150px] items-center justify-around">
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
          <div className="flex items-center justify-center w-[400px]">
            <div className="input flex items-center justify-center w-[400px] h-[40px] bg-[#FAFAFA] rounded-[0.5rem] text-[#818181]">
              <input className="w-[380px] h-[30px] bg-[rgba(255,255,255,0)] border-b-2" />
            </div>
          </div>
        ) : (
          <div
            className={
              'showTabs flex flex-row w-[400px] justify-between font-[Open_Sans]'
            }
          >
            {tabNames.map((name, i) => {
              if (name.href === pathName) {
                return (
                  <button key={i}>
                    <span
                      className="p-2 rounded-[1rem] bg-[#f3f3f3] text-[#797979] transition-colors duration-300"
                      tabIndex={0}
                    >
                      {name.name}
                    </span>
                  </button>
                );
              } else {
                return (
                  <Link href={`${name.href}`} key={i}>
                    <span
                      className="p-2 rounded-[1rem] hover:bg-[#f3f3f3] focus:bg-[#f3f3f3] focus:text-[#797979] cursor-pointer transition-colors duration-300"
                      tabIndex={0}
                    >
                      {name.name}
                    </span>
                  </Link>
                );
              }
            })}
          </div>
        )}

        <Search
          size={30}
          className="text-[black] cursor-pointer hover:bg-[#f3f3f3] p-1 rounded-[0.2rem]"
          onClick={handleInputComponent}
        />
        <Link href={'/admin'}>
          <ChartBar
            className="text-[black] cursor-pointer hover:bg-[#f3f3f3] p-1 rounded-[0.2rem]"
            size={30}
          />
        </Link>
      </header>
      <div className="w-full min-h-screen flex flex-row justify-center ">
        <main className=" w-4/5 mb-20 flex flex-row flex-wrap justify-center">
          {ScienceData ? (
            ScienceData.map((a: NewsDataType, i: number) => {
              return (
                <div
                  key={i}
                  className="w-[38%] flex flex-row text-sm cursor-pointer"
                  onClick={() => getData(a, i)}
                >
                  <Image
                    className="rounded-[0.4rem] m-2 "
                    src={a.urlToImage ? a.urlToImage : '/images/news-eye.png'}
                    alt="뉴스사진"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col justify-evenly">
                    <span>{a.title.slice(0, 25) + '...'}</span>
                    <span>{a.description.slice(0, 25) + '...'}</span>
                    <span className="text-[#BEBEBE] text-xs">{a.author}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div>데이터 가져오는 중</div>
          )}
        </main>
      </div>

      <footer className="flex flex-col items-center justify-evenly w-full h-[200px] bg-[#000000]">
        <div className="relative left-[50] flex flex-row items-center">
          <span className="relative top-3 h-[140px] p-10 font-black text-xl font-[Open_Sans] text-white">
            News-eye
          </span>
          <div className="h-[140px] p-10 border-l-[3px] font-black text-sm font-[Open_Sans] text-white">
            제작자: 서근재
            <br /> 연락처: 010-0000-0000
            <br /> 이메일: example@eaxmple.com
            <br /> 이 프로젝트는 개인 사이드 프로젝트입니다😁
          </div>
        </div>
        <span className="relative right-8 text-white text-[0.8rem]">
          Copyright ⓒ 서근재
        </span>
      </footer>
    </div>
  );
}
