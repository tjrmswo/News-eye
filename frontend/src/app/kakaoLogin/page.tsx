'use client';
import axios from 'axios';
import './styles.css';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function KaKaoLoginLoadingPage() {
  const router = useRouter();
  const getTokens = useMutation({
    mutationKey: ['getTokens'],
    mutationFn: async () => {
      const kakaoCode = new URL(window.location.href).searchParams.get('code');
      const response = await axios.post('/api/kakao', {
        code: kakaoCode,
      });

      console.log(response);

      return response.data;
    },
  });

  useEffect(() => {
    // 소셜 로그인 실패 시 에러 핸들링 로직 추가 해야함
    getTokens.mutateAsync();

    if (getTokens.isSuccess) {
      setTimeout(() => {
        router.replace('/');
      }, 5000);
    }
  }, [getTokens, router]);
  return (
    <div className="container">
      <div className="macbook">
        <div className="macbook__topBord">
          <div className="macbook__display">
            <div className="macbook__load"></div>
          </div>
        </div>
        <div className="macbook__underBord">
          <div className="macbook__keybord">
            <div className="keybord">
              <div className="keybord__touchbar"></div>
              <ul className="keybord__keyBox">
                <li className="keybord__key key--01"></li>
                <li className="keybord__key key--02"></li>
                <li className="keybord__key key--03"></li>
                <li className="keybord__key key--04"></li>
                <li className="keybord__key key--05"></li>
                <li className="keybord__key key--06"></li>
                <li className="keybord__key key--07"></li>
                <li className="keybord__key key--08"></li>
                <li className="keybord__key key--09"></li>
                <li className="keybord__key key--10"></li>
                <li className="keybord__key key--11"></li>
                <li className="keybord__key key--12"></li>
                <li className="keybord__key key--13"></li>
              </ul>
              <ul className="keybord__keyBox--under">
                <li className="keybord__key key--14"></li>
                <li className="keybord__key key--15"></li>
                <li className="keybord__key key--16"></li>
                <li className="keybord__key key--17"></li>
                <li className="keybord__key key--18"></li>
                <li className="keybord__key key--19"></li>
                <li className="keybord__key key--20"></li>
                <li className="keybord__key key--21"></li>
                <li className="keybord__key key--22"></li>
                <li className="keybord__key key--23"></li>
                <li className="keybord__key key--24"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
