'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';

// constants
import { tabNames } from '@/constants/home';

// types
import { ContextType, NewsDataType } from '@/types/home';

// libraries
import { useQuery } from '@tanstack/react-query';
import { ChartBar, Search } from 'lucide-react';

// apis
import { NewsApiClient } from '@/app/api/newsApi';

// contexts
import { DataContext } from '@/contexts/home';

export default function Politics() {
  const context = useContext<ContextType>(DataContext);

  const { getData } = context;

  const pathName = usePathname();
  const [componentChange, setComponentChange] = useState<boolean>(false);

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  const { data: PoliticsData } = useQuery<NewsDataType[]>({
    queryKey: ['getPoliticsData', pathName],
    queryFn: async () => {
      const response = await NewsApiClient.get(`/api/news/category?field=정치`);
      const data = response.data;

      console.log(data);

      return data;
    },
    staleTime: 60000,
  });

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
            <div className="input flex items-center justify-center w-md bg-[#FAFAFA] rounded-lg text-[#818181]">
              <input className="w-sm p-1 bg-[rgba(255,255,255,0)] border-b-2" />
            </div>
          </div>
        ) : (
          <div
            className={
              'showTabs flex flex-row w-md justify-between font-[Open_Sans]'
            }
          >
            {tabNames.map((name, i) => {
              if (name.href === pathName) {
                return (
                  <button key={i}>
                    <span
                      className="p-2 rounded-2xl bg-[#f3f3f3] text-[#797979] transition-colors duration-300"
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
                      className="p-2 rounded-2xl hover:bg-[#f3f3f3] focus:bg-[#f3f3f3] focus:text-[#797979] cursor-pointer transition-colors duration-300"
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
      <div className="w-full min-h-screen flex flex-row justify-center  ">
        <main className="mb-20 flex flex-row flex-wrap justify-center">
          {PoliticsData ? (
            PoliticsData.map((a, i: number) => {
              return (
                <div
                  key={i}
                  className="hover:showUpArticles w-md flex flex-row justify-between text-sm cursor-pointer hover:shadow-md p-1 pr-3 rounded-md"
                  onClick={() => getData(a, i)}
                >
                  <Image
                    className="rounded-md m-2"
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
    </div>
  );
}
