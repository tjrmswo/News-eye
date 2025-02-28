'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
// libraries
import { ChartBar, Search } from 'lucide-react';

// apis
import { NewsApiClient } from '@/app/api/newsApi';
// constants
import { tabNames } from '@/constants/home';

// contexts
import { DataContext } from '@/contexts/home';

// types
import { ContextType, articleContentType } from '@/types/news';

export default function NewsDetail() {
  const [content, setContent] = useState<string[]>([]);

  const { selectedData, handleInput, keyDownEnter } =
    useContext<ContextType>(DataContext); // URL에서 id를 추출

  // 컴포넌트 변경 boolean
  const [componentChange, setComponentChange] = useState<boolean>(false);

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  const fetchArticleContent = async () => {
    try {
      const response: articleContentType = await NewsApiClient.post(
        '/api/news/content',
        {
          url: selectedData.url,
        }
      );

      const data = response.data.content;
      const control = data.split('\\n');
      setContent(control);

      // LocalStorage에 저장: 데이터를 가져온 후
      const newsData = {
        ...selectedData,
        content: control,
      };

      localStorage.setItem('newsData', JSON.stringify(newsData));
    } catch (e) {
      console.error('Error fetching article content:', e);
      throw e;
    }
  };

  function replaceNewsData(field: string) {
    const newsData = localStorage.getItem('newsData');
    if (!newsData) {
      return;
    }
    const getFieldData = JSON.parse(newsData);

    return getFieldData[`${field}`];
  }

  useEffect(() => {
    // 컴포넌트가 unmount될 때 로컬 스토리지에서 데이터 삭제
    return () => {
      localStorage.removeItem('newsData');
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('newsData')) {
      fetchArticleContent();
    }
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
      <main className="mb-20 flex w-3/5 flex-col justify-center gap-10">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[#BEBEBE]">
            {selectedData?.author
              ? selectedData?.author
              : replaceNewsData('author')}
          </div>
          <div className="text-2xl">
            {selectedData?.title
              ? selectedData?.title
              : replaceNewsData('title')}
          </div>
          <div>
            <div className="text-[#B4B4B4]">
              입력:{' '}
              {selectedData?.publishedAt
                ? selectedData?.publishedAt
                : replaceNewsData('publishedAt')}
            </div>
            <Link
              href={selectedData && selectedData.url}
              className="text-sm text-[#d1d1d2]"
            >
              원문 주소:{' '}
              {selectedData.url ? selectedData.url : replaceNewsData('url')}
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={
              selectedData?.urlToImage
                ? selectedData?.urlToImage || '/images/news-eye.png'
                : replaceNewsData('urlToImage')
            }
            alt="기사사진"
            width={500}
            height={500}
          />
        </div>
        <div className="text-sm text-[#5C5959]">
          {content.length > 0
            ? content.map((c, i) => (
                <div className="mb-2" key={i}>
                  {c}.
                </div>
              ))
            : replaceNewsData('content') &&
              replaceNewsData('content').map((c: string, i: number) => (
                <div className="mb-2" key={i}>
                  {c}.
                </div>
              ))}
        </div>
      </main>

      <footer className="flex w-full flex-col items-center justify-evenly bg-[#000000] p-5">
        <div className="relative left-[50] mb-3 flex flex-row items-center">
          <span className="relative top-3 p-10 text-xl font-[Open_Sans] font-black text-white">
            News-eye
          </span>
          <div className="border-l-2 p-10 text-sm font-[Open_Sans] font-black text-white">
            제작자: 서근재
            <br /> 연락처: 010-0000-0000
            <br /> 이메일: example@eaxmple.com
            <br /> 이 프로젝트는 개인 사이드 프로젝트입니다😁
          </div>
        </div>
        <span className="relative right-8 text-xs text-white">
          Copyright ⓒ 서근재
        </span>
      </footer>
    </div>
  );
}
