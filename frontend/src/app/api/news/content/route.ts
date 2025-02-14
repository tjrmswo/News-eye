import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json(); // 요청 본문에서 URL 추출

    console.log('Fetching content from URL:', url);

    // 해당 URL에서 데이터를 가져오기
    const response = await axios.get(url); // 외부 API나 웹 페이지에서 데이터 가져오기
    const html = response.data;

    const $ = cheerio.load(html); // cheerio로 HTML 파싱
    let articleBody = '';

    // 각 p 태그의 텍스트를 가져오고 한글만 필터링
    $('p').each((i, element) => {
      const text = $(element).text(); // 각 p 요소의 텍스트 추출
      // 한글만 남기고 나머지 문자 제거 (온점은 제외)
      const koreanText = text.replace(/[^가-힣\s]+/g, ''); // 한글과 공백만 남기고 나머지 문자 제거

      articleBody += ' ' + koreanText;
    });

    // 최종 문자열 양 끝의 공백 제거
    articleBody = articleBody.trim();

    // '다' 뒤에 \\n을 추가
    articleBody = articleBody.replace(/다/g, '다\\n');

    // '다' 뒤에 한글이 있는 경우 \\n을 제거하고 이어 붙임
    articleBody = articleBody.replace(
      /다\\n(?=[가-힣])|(?<![가-힣])\\n/g,
      '다'
    );

    return NextResponse.json({ content: articleBody }, { status: 200 }); // 본문만 반환
  } catch (err) {
    console.error('Error fetching article content:', err);
    return NextResponse.json(
      { message: 'Internal Server Error!' },
      { status: 500 }
    ); // 에러 응답 반환
  }
}
