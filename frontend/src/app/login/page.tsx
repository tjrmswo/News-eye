'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// styles
import './styles.css';

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
    <div className="relative bottom-10 flex h-[420px] w-full flex-row items-center justify-around">
      <div className="imgElement relative">
        <Image
          className=""
          src={'/images/person.png'}
          alt="사람"
          width={400}
          height={400}
        />
      </div>
      <div className="containerAnimations relative top-10 flex size-[500px] flex-col items-center justify-around rounded-[0.5rem] bg-white">
        <div className="loginElement flex w-2/4 flex-row items-center">
          <Image
            src={'/images/news-eye.png'}
            width={70}
            height={70}
            alt="로고"
          />
          <div className="text-3xl font-[Open_Sans] font-black">News-eye</div>
        </div>

        <div className="loginElement flex w-full flex-col items-center  gap-5">
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

        <div className="loginElement flex h-[150px] flex-col items-center gap-2 ">
          <Button
            className="h-[40px] w-[400px] rounded-[6px] font-sans text-[1rem] font-bold hover:border-[2.5px] hover:border-black hover:bg-[white] hover:text-black"
            size="lg"
            onClick={login}
          >
            로그인
          </Button>

          <Button
            className="flex h-[40px] w-[400px] flex-row items-center justify-center rounded-[6px] bg-[#FEE608] hover:bg-[#FEE608]"
            variant="outline"
            onClick={() => kakaoLogin()}
          >
            <Image
              src={'/images/kakao_login_symbol.png'}
              alt="로고"
              width={25}
              height={25}
            />
            <span className="ml-2 font-sans text-base font-bold text-[#282828]">
              카카오 계정으로 로그인
            </span>
          </Button>

          <Link href={'/signup'}>
            <span className="cursor-pointer text-[0.8rem] font-thin text-[#c1c1c1] underline decoration-solid">
              회원가입
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
