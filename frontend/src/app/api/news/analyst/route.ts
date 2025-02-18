// libraries
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';

// types
import { searchParamsType } from '@/types/news';

type newsAnalysisData = {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
};

function preprocessText(text: string) {
  let cleanedText = text.replace(/<b>.*?<\/b>/g, '');

  cleanedText = cleanedText.replace(/[^가-힣a-zA-Z0-9\s.]+/g, '');

  return cleanedText.trim();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const data: searchParamsType = Object.fromEntries(searchParams.entries());

  const { query, sort, display } = data;

  const params = {
    query,
    sort,
    display,
  };

  const headers = {
    'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET_KEY,
  };

  const naverNews = await axios.get(
    'https://openapi.naver.com/v1/search/news.json',
    {
      params,
      headers,
    }
  );

  const { items } = naverNews.data;

  const descriptions = items.map((item: newsAnalysisData) =>
    preprocessText(item.description)
  );

  // console.log(descriptions);

  const keywordCount: Object = {};

  descriptions.forEach((element: string) => {
    const words = element.split(/\s+/); // 텍스트를 단어 단위로 분리

    // console.log(words);

    words.forEach((w: string) => {
      if (!keywordCount.hasOwnProperty(w)) {
        keywordCount[w] = (keywordCount[w] || 0) + 1; // 단어 카운트
      }
    });
  });

  console.log('단어 카운팅: ', keywordCount);
}
