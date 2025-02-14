'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

// constants
import { tabNames } from '@/constants/home';

// contexts
import { DataContext } from '@/contexts/home';

// libraries
import { ChartBar, Search } from 'lucide-react';

// apis
import { NewsApiClient } from '../api/newsApi';

export default function NewsDetail() {
  const [content, setContent] = useState<string[]>([]);

  const { selectedData } = useContext(DataContext); // URL에서 id를 추출

  // 컴포넌트 변경 boolean
  const [componentChange, setComponentChange] = useState<boolean>(false);

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  const fetchArticleContent = async () => {
    try {
      const response = await NewsApiClient.post('/api/news/content', {
        url: selectedData.url,
      });
      console.log('클라이언트측 데이터 페칭 성공: ', response.data.content);
      const data = response.data.content as string;

      const control = data.split('\\n');
      console.log(control);

      setContent(control);
    } catch (e) {
      console.error('Error fetching article content:', e);
      throw e; // 에러를 호출하는 곳으로 전달
    }
  };

  useEffect(() => {
    fetchArticleContent();
  }, []); // articleUrl이 변경될 때마다 실행

  useEffect(() => {
    console.log('본문 내용: ', content);
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
      <main className="w-3/5 mb-20 flex flex-col justify-center gap-10">
        <div className="flex flex-col gap-2">
          <div className="text-[#BEBEBE] text-sm">{selectedData?.author}</div>
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
        <div className="text-[#5C5959] text-sm">
          {content.map((c, i) => (
            <div key={i} className="mb-2">
              {c}.
            </div>
          ))}
        </div>
      </main>

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
