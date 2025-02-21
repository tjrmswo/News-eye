'use client';
import Image from 'next/image';
import Link from 'next/link';

// components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// style
import '@/app/signup/styles.css';

export default function Signup() {
  return (
    <div className="relative bottom-10 flex flex-row w-full h-[420px] items-center justify-around">
      <div className="containerAnimation relative top-10 flex flex-col justify-around size-[500px] items-center bg-[#ffffff] rounded-[0.5rem] gap-4">
        <div className="loginElement font-black text-2xl font-[Open_Sans] mt-4">
          회원가입
        </div>

        <div className="loginElement flex flex-col w-full gap-5  items-center">
          <Input
            type="text"
            className="w-[400px]"
            placeholder="아이디를 입력해주세요"
          />
          <Input
            type="text"
            className="w-[400px]"
            placeholder="닉네임을 입력해주세요"
          />
          <Input
            type="password"
            className="w-[400px]"
            placeholder="비밀번호를 입력해주세요"
          />
          <Input
            type="password"
            className="w-[400px]"
            placeholder="비밀번호 확인"
          />
        </div>
        <div className="loginElement flex flex-col items-center gap-2 h-[150px] ">
          <Button
            className="w-[400px] h-[40px] text-[1rem] rounded-[6px] hover:bg-[white] hover:text-black hover:border-[2.5px] hover:border-black font-sans"
            size="lg"
          >
            Sign Up
          </Button>

          <Link href={'/login'}>
            <span className="underline decoration-solid text-[0.8rem] text-[#c1c1c1] font-thin cursor-pointer">
              로그인
            </span>
          </Link>
        </div>
      </div>
      <div className="imgElement relative">
        <Image
          className=""
          src={'/images/employee.png'}
          alt="사람"
          width={400}
          height={400}
        />
        {/* {signupImgElement.map(
          ({ img, left, top, bottom, alt, animationClass }, index) => {
            return (
              <Image
                key={index}
                src={img}
                alt={alt}
                width={100}
                height={100}
                className={`absolute ${animationClass}`}
                style={{
                  left: `${left}px`,
                  top: top ? `${top}px` : 'auto',
                  bottom: bottom ? `${bottom}px` : 'auto',
                }}
              />
            );
          }
        )} */}
      </div>
    </div>
  );
}
