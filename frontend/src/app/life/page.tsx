'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';

// constants
import { tabNames } from '@/constants/home';

// types
import { ContextType, NewsDataType } from '@/types/news';

// libraries
import { useQuery } from '@tanstack/react-query';
import { ChartBar, Search } from 'lucide-react';
// apis
import { NewsApiClient } from '@/app/api/newsApi';

// contexts
import { DataContext } from '@/contexts/home';
import Footer from '@/components/common/Footer';

export default function Life() {
  const context = useContext<ContextType>(DataContext);

  const {
    getData,
    handleInputComponent,
    componentChange,
    handleInput,
    setComponentChange,
    keyDownEnter,
  } = context;

  const pathName = usePathname();

  const { data: LifeData } = useQuery<NewsDataType[]>({
    queryKey: ['getLifeData'],
    queryFn: async () => {
      const response = await NewsApiClient.get(`/api/news/category?field=생활`);
      const data = response.data;

      return data;
    },
    staleTime: 60000,
  });

  useEffect(() => {
    setComponentChange(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="flex w-4xl flex-row items-center justify-around p-10">
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
          <div className="flex w-md items-center justify-center">
            <div className="input flex w-md items-center justify-center rounded-lg bg-[#FAFAFA] text-[#818181]">
              <input
                className="mb-2 w-sm border-b-2 bg-[rgba(255,255,255,0)] p-1"
                onChange={(e) => handleInput(e)}
                onKeyDown={(e) => keyDownEnter(e)}
              />
            </div>
          </div>
        ) : (
          <div
            className={
              'showTabs flex w-md flex-row justify-between font-[Open_Sans]'
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
          className="cursor-pointer rounded-sm p-1 text-[black] hover:bg-[#f3f3f3]"
          onClick={handleInputComponent}
        />
        <Link href={'/admin'}>
          <ChartBar
            className="cursor-pointer rounded-sm p-1 text-[black] hover:bg-[#f3f3f3]"
            size={30}
          />
        </Link>
      </header>
      <div className="flex min-h-screen w-full flex-row justify-center ">
        <main className="mb-20 flex w-4/5 flex-row flex-wrap justify-center">
          {LifeData ? (
            LifeData.map((a, i: number) => {
              return (
                <div
                  key={i}
                  className="hover:showUpArticles flex w-md cursor-pointer flex-row justify-between rounded-md p-1 pr-3 text-sm hover:shadow-md"
                  onClick={() => getData(a, i)}
                >
                  <Image
                    className="m-2 rounded-md"
                    src={a.urlToImage ? a.urlToImage : '/images/news-eye.png'}
                    alt="뉴스사진"
                    width={150}
                    height={150}
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

      <Footer />
    </div>
  );
}
