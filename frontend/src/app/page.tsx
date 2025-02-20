'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// libraries
import anime from 'animejs/lib/anime.es.js';

// icons
import { Search } from 'lucide-react';

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
            {tabNames.map((name, i) => (
              <Link href={`${name.href}`} key={i}>
                <span
                  className="p-2 rounded-[1rem] hover:bg-[#f3f3f3] focus:bg-[#f3f3f3] focus:text-[#797979] cursor-pointer transition-colors duration-300"
                  tabIndex={0}
                >
                  {name.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Search
          size={20}
          className="cursor-pointer"
          onClick={handleInputComponent}
        />
      </header>
      <main
        className=" w-full h-[430px] mb-20 flex flex-col justify-center items-center"
        // style={{
        //   boxShadow: '0px 1px 5px 3px #f1f1f1',
        // }}
      >
        {isSubjectVisible && (
          <div className="subject text-5xl animate-showTag">
            세상 사는 눈을 키운다
          </div>
        )}
        {isTitleVisible && (
          <span className="title text-4xl text-[#c1c1c1] animate-showTags">
            News-eye
          </span>
        )}

        <div className="function-based-values-demo">
          {Images.map((img, i) => {
            const positionStyle = {
              left: img.left,
              right: img.right,
              top: img.top,
              bottom: img.bottom,
            };
            return (
              <Image
                key={i}
                className="el absolute"
                src={img.src}
                data-x={img.dataX}
                alt={img.alt}
                width={100}
                height={100}
                style={positionStyle}
              />
            );
          })}
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
