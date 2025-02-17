'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
// libraries
import { ChartBar, Search } from 'lucide-react';

// apis
import { NewsApiClient } from '@/app/api/newsApi';
// constants
import { tabNames } from '@/constants/home';
// contexts
import { DataContext } from '@/contexts/home';
import { useQuery } from '@tanstack/react-query';

export default function NewsDetail() {
  const { selectedData } = useContext(DataContext); // URL에서 id를 추출

  // 컴포넌트 변경 boolean
  const [componentChange, setComponentChange] = useState<boolean>(false);

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  const fetchArticle = useQuery<string[]>({
    queryKey: ['fetchArticle'],
    queryFn: async () => {
      const response = await NewsApiClient.post('/api/news/content', {
        url: selectedData.url,
      });
      console.log('클라이언트측 데이터 페칭 성공: ', response.data.content);
      const data = response.data.content as string;

      const control = data.split('\\n');
      console.log(control);

      return control;
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
      <main className="mb-20 flex w-3/5 flex-col justify-center gap-10">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[#BEBEBE]">{selectedData?.author}</div>
          <div className="text-2xl">{selectedData?.title}</div>
          <div>
            <div className="text-[#B4B4B4]">
              입력: {selectedData?.publishedAt}
            </div>
            <Link
              href={selectedData && selectedData.url}
              className="text-sm text-[#d1d1d2]"
            >
              원문 주소: {selectedData.url}
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={selectedData?.urlToImage || '/images/news-eye.png'}
            alt="기사사진"
            width={500}
            height={500}
          />
        </div>
        <div className="text-sm text-[#5C5959]">
          {fetchArticle.isSuccess &&
            fetchArticle.data?.map((c, i) => (
              <div key={i} className="mb-2">
                {c}.
              </div>
            ))}
        </div>
      </main>

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
