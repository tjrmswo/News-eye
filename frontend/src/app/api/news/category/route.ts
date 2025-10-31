import { NextResponse } from 'next/server';
import { NewsApiServer } from '@/app/api/newsApi';
import { ServerNewsDataType } from '@/types/news';
import fetch from 'node-fetch';
async function fetchImageMimeType(url: string) {
  try {
    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    const mimeType = imageResponse.headers.get('content-type');
    const supportedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    // MIME 타입이 지원되지 않는 경우 경고하고 null 반환
    if (mimeType && !supportedMimeTypes.includes(mimeType)) {
      console.warn(`Unsupported MIME type: ${mimeType}.`);
      return null; // 지원하지 않는 경우 null 반환
    }

    return mimeType; // 지원하는 MIME 타입 반환
  } catch (error) {
    console.error(error);
    return null; // 에러 발생 시 null 반환
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const field = searchParams.get('field');

  // field 파라미터 체크
  if (!field || Array.isArray(field)) {
    return NextResponse.json(
      { message: 'Field parameter is required and must be a string' },
      { status: 400 }
    );
  }

  const sliceString = field.split('/');
  const joinString = sliceString.join(' OR ');

  try {
    const newsData = await NewsApiServer.get(`/everything`, {
      params: {
        q: field.includes('/') ? joinString : field,
        sortBy: 'relevancy',
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
    });

    const articles: ServerNewsDataType[] = newsData.data.articles;

    // const MAX_CONCURRENT_REQUESTS = 5; // 동시에 처리할 이미지 요청 수

    // const processedArticles = [];

    // for (let i = 0; i < articles.length; i += MAX_CONCURRENT_REQUESTS) {
    //   const batch = articles.slice(i, i + MAX_CONCURRENT_REQUESTS);

    //   const results = await Promise.all(
    //     batch.map(async (article) => {
    //       if (article.urlToImage) {
    //         const base64Image = await fetchImageMimeType(article.urlToImage);
    //         article.urlToImage = base64Image || '/images/news-eye.png'; // 기본 이미지로 대체
    //       }
    //       return article;
    //     })
    //   );

    //   processedArticles.push(...results);
    // }

    if (articles.length > 0) {
      return NextResponse.json(newsData.data.articles, { status: 200 });

      // return NextResponse.json(processedArticles, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No news data' }, { status: 404 });
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    return NextResponse.json(
      { message: 'Internal Server Error', error: err },
      { status: 500 }
    );
  }
}
