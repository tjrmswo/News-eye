'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// styles
import './styles.css';

// constants
import { loginImgElement } from '@/constants/login';

export default function Login() {
  const router = useRouter();

  // 로그인
  function login() {
    router.push('/');
  }

  function kakaoLogin() {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  }

  return (
    <div className="relative bottom-10 flex flex-row w-full h-[420px] items-center justify-around">
      <div className="imgElement relative">
        <Image
          className=""
          src={'/images/person.png'}
          alt="사람"
          width={400}
          height={400}
        />
        {/* {loginImgElement.map(
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
      <div className="containerAnimations relative top-10 flex flex-col justify-around w-[500px] h-[500px] items-center bg-white rounded-[0.5rem]">
        <div className="loginElement flex flex-row w-2/4 items-center">
          <Image
            src={'/images/news-eye.png'}
            width={70}
            height={70}
            alt="로고"
          />
          <div className="font-black text-3xl font-[Open_Sans]">News-eye</div>
        </div>

        <div className="loginElement flex flex-col w-full gap-5  items-center">
          <Input
            type="text"
            className="w-[400px]"
            placeholder="아이디를 입력해주세요"
          />
          <Input
            type="password"
            className="w-[400px]"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>

        <div className="loginElement flex flex-col items-center gap-2 h-[150px] ">
          <Button
            className="w-[400px] h-[40px] text-[1rem] rounded-[6px] font-[600] hover:bg-[white] hover:text-black hover:border-[2.5px] hover:border-black font-sans"
            size="lg"
            onClick={login}
          >
            로그인
          </Button>

          <Button
            className="flex flex-row justify-center items-center w-[400px] h-[40px] bg-[#FEE608] hover:bg-[#FEE608] rounded-[6px]"
            variant="outline"
            onClick={() => kakaoLogin()}
          >
            <Image
              src={'/images/kakao_login_symbol.png'}
              alt="로고"
              width={25}
              height={25}
            />
            <span className="ml-2 text-[1rem] text-base font-sans font-[600] text-[#282828]">
              카카오 계정으로 로그인
            </span>
          </Button>

          <Link href={'/signup'}>
            <span className="underline decoration-solid text-[0.8rem] text-[#c1c1c1] font-thin cursor-pointer">
              회원가입
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
