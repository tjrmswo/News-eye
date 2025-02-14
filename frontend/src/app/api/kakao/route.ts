import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { code } = await req.json(); // POST 요청의 본문 추출

  // 카카오에서 액세스 토큰 요청
  try {
    const body = {
      client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
      grant_type: 'authorization_code',
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      code,
    };

    const token = await axios.post(
      `${process.env.NEXT_PUBLIC_KAKAO_TOKEN_URI}`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log(token.data);

    if (token.status !== 200) {
      return NextResponse.json({ message: 'Token Error' }, { status: 404 });
    }

    const accessToken = token.data.access_token;

    // 사용자의 정보 요청
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_KAKAO_USER_REQUEST_URI}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('사용자 정보 가져오기 성공 ', userResponse.data);

    if (userResponse.data) {
      return NextResponse.json(userResponse.data, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Not Found user' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error getting access token or user info:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
