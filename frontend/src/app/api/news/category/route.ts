import { NextResponse } from 'next/server';
import { NewsApiServer } from '@/app/api/newsApi';

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

    if (newsData.data.articles.length > 0) {
      return NextResponse.json(newsData.data.articles, { status: 200 });
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
