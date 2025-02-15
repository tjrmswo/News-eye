'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// constants
import { mediaCompanies, tabNames } from '@/constants/home';

// types
import { NewsDataType } from '@/types/home';

// libraries
import { useQuery } from '@tanstack/react-query';
import { ChartBar, Search } from 'lucide-react';

// styles
import '@/app/styles.css';

// apis
import { NewsApiClient } from '../api/newsApi';

export default function Society() {
  const pathName = usePathname();
  const [componentChange, setComponentChange] = useState<boolean>(false);

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  const { data: SocietyData, refetch: refetchSocietyData } = useQuery<
    NewsDataType[]
  >({
    queryKey: ['getScienceData'],
    queryFn: async () => {
      const response = await NewsApiClient.get(`/api/news/search?field=사회`);
      const data = response.data;

      console.log(data);

      return data;
    },
  });

  useEffect(() => {
    refetchSocietyData();
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
              'case1 flex flex-row w-[400px] justify-between font-[Open_Sans]'
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
      <div className="w-full min-h-screen flex flex-row ">
        <aside className="p-2 flex flex-col items-center w-1/5">
          <span className="relative right-7 text-[#D1CDCD] text-sm font-[800]">
            언론사
          </span>
          <div className="p-2 relative left-9 w-3/4 flex flex-col border-r-[2px]">
            {mediaCompanies.map((company, i) => (
              <span
                key={i}
                className="w-full p-2 text-sm hover:bg-[#F3F3F3] rounded-[0.4rem]"
              >
                {company}
              </span>
            ))}
          </div>
        </aside>

        <main className=" w-4/5 mb-20 flex flex-row flex-wrap justify-center">
          {SocietyData ? (
            SocietyData.map((a, i: number) => {
              return (
                <div
                  key={i}
                  className="w-[45%] flex flex-row text-sm cursor-pointer"
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
    </div>
  );
}
