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
    <div className="relative bottom-10 flex h-[420px] w-full flex-row items-center justify-around">
      <div className="containerAnimation relative top-10 flex size-[500px] flex-col items-center justify-around gap-4 rounded-[0.5rem] bg-[#ffffff]">
        <div className="loginElement mt-4 text-2xl font-[Open_Sans] font-black">
          회원가입
        </div>

        <div className="loginElement flex w-full flex-col items-center  gap-5">
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
        <div className="loginElement flex h-[150px] flex-col items-center gap-2 ">
          <Button
            className="h-[40px] w-[400px] rounded-[6px] font-sans text-[1rem] hover:border-[2.5px] hover:border-black hover:bg-[white] hover:text-black"
            size="lg"
          >
            Sign Up
          </Button>

          <Link href={'/login'}>
            <span className="cursor-pointer text-[0.8rem] font-thin text-[#c1c1c1] underline decoration-solid">
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
