'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

// libraries
import { ChartBar, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
// constants
import { tabNames } from '@/constants/home';
// styles
import '@/app/styles.css';
// types
import { ContextType, NewsDataType } from '@/types/home';
// contexts
import { DataContext } from '@/contexts/home';
// apis
import { NewsApiClient } from '@/app/api/newsApi';

export default function Science() {
  const context = useContext<ContextType>(DataContext);

  const { getData } = context;

  // 경로 이름
  const pathName = usePathname();

  // 컴포넌트 변경 boolean
  const [componentChange, setComponentChange] = useState<boolean>(false);

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  const { data: ScienceData } = useQuery<NewsDataType[]>({
    queryKey: ['getScienceData'],
    queryFn: async () => {
      const response = await NewsApiClient.get(`/api/news/search?field=과학`);
      const data = response.data;

      // console.log(data);

      return data;
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="flex h-[150px] w-[800px] flex-row items-center justify-around">
        <div className="flex flex-row items-center">
          <Image
            src={'/images/news-eye.png'}
            width={55}
            height={55}
            alt="로고"
          />
          <span className="text-2xl font-[Open_Sans] font-black">News-eye</span>
        </div>

        {componentChange === true ? (
          <div className="flex w-[400px] items-center justify-center">
            <div className="input flex h-[40px] w-[400px] items-center justify-center rounded-[0.5rem] bg-[#FAFAFA] text-[#818181]">
              <input className="h-[30px] w-[380px] border-b-2 bg-[rgba(255,255,255,0)]" />
            </div>
          </div>
        ) : (
          <div
            className={
              'case1 flex w-[400px] flex-row justify-between font-[Open_Sans]'
            }
          >
            {tabNames.map((name, i) => {
              if (name.href === pathName) {
                return (
                  <button key={i}>
                    <span
                      className="rounded-2xl bg-[#f3f3f3] p-2 text-[#797979] transition-colors duration-300"
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
                      className="cursor-pointer rounded-2xl p-2 transition-colors duration-300 hover:bg-[#f3f3f3] focus:bg-[#f3f3f3] focus:text-[#797979]"
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
          className="cursor-pointer rounded-[0.2rem] p-1 text-[black] hover:bg-[#f3f3f3]"
          onClick={handleInputComponent}
        />
        <Link href={'/admin'}>
          <ChartBar
            className="cursor-pointer rounded-[0.2rem] p-1 text-[black] hover:bg-[#f3f3f3]"
            size={30}
          />
        </Link>
      </header>
      <div className="flex min-h-screen w-full flex-row justify-center ">
        <main className=" mb-20 flex w-4/5 flex-row flex-wrap justify-center">
          {ScienceData ? (
            ScienceData.map((a: NewsDataType, i: number) => {
              return (
                <div
                  key={i}
                  className="flex w-[38%] cursor-pointer flex-row text-sm"
                  onClick={() => getData(a, i)}
                >
                  <Image
                    className="m-2 rounded-[0.4rem] "
                    src={a.urlToImage ? a.urlToImage : '/images/news-eye.png'}
                    alt="뉴스사진"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col justify-evenly">
                    <span>{a.title.slice(0, 25) + '...'}</span>
                    <span>{a.description.slice(0, 25) + '...'}</span>
                    <span className="text-xs text-[#BEBEBE]">{a.author}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div>데이터 가져오는 중</div>
          )}
        </main>
      </div>

      <footer className="flex h-[200px] w-full flex-col items-center justify-evenly bg-[#000000]">
        <div className="relative left-[50] flex flex-row items-center">
          <span className="relative top-3 h-[140px] p-10 text-xl font-[Open_Sans] font-black text-white">
            News-eye
          </span>
          <div className="h-[140px] border-l-[3px] p-10 text-sm font-[Open_Sans] font-black text-white">
            제작자: 서근재
            <br /> 연락처: 010-0000-0000
            <br /> 이메일: example@eaxmple.com
            <br /> 이 프로젝트는 개인 사이드 프로젝트입니다😁
          </div>
        </div>
        <span className="relative right-8 text-[0.8rem] text-white">
          Copyright ⓒ 서근재
        </span>
      </footer>
    </div>
  );
}
