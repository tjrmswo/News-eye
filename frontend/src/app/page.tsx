'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// libraries
import anime from 'animejs/lib/anime.es.js';

// icons
import { ChartBar, Search } from 'lucide-react';

// styles
// constants
import { Images, tabNames } from '@/constants/home';

export default function Home() {
  const [isSubjectVisible, setSubjectVisible] = useState<boolean>(false);
  const [isTitleVisible, setTitleVisible] = useState<boolean>(false);
  const [componentChange, setComponentChange] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // requestAnimationFrame을 사용하여 DOM 업데이트 후 애니메이션 실행
      requestAnimationFrame(() => {
        anime({
          targets: '.function-based-values-demo .el',
          translateX: (el: HTMLElement) => el.getAttribute('data-x'),
          translateY: (el: HTMLElement, i: number) => 50 + -50 * i,
          scale: (el: HTMLElement, i: number, l: number) => l - 5,
          duration: 1800,
          delay: () => anime.random(0, 1000),
          direction: 'reverse',
          complete: () => {
            setSubjectVisible(true);
            setTimeout(() => {
              setTitleVisible(true);
            }, 500);
          },
        });
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

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
              <input className="mb-2 w-sm border-b-2 bg-[rgba(255,255,255,0)] p-1" />
            </div>
          </div>
        ) : (
          <div
            className={
              'showTabs flex w-md flex-row justify-between font-[Open_Sans]'
            }
          >
            {tabNames.map((name, i) => (
              <Link href={`${name.href}`} key={i}>
                <span
                  className="cursor-pointer rounded-2xl p-2 transition-colors duration-300 hover:bg-[#f3f3f3] focus:bg-[#f3f3f3] focus:text-[#797979]"
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
      <main className="mb-20 flex h-sm w-full flex-col items-center justify-center shadow-lg">
        {isSubjectVisible && (
          <div className="subject text-5xl ">세상 사는 눈을 키운다</div>
        )}
        {isTitleVisible && (
          <span className="title text-4xl text-[#c1c1c1] ">News-eye</span>
        )}
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
