import { NextResponse } from 'next/server';
import { NewsApiServer } from '@/app/api/newsApi';

export async function POST(req: Request) {
  const { field } = await req.json();

  try {
    const newsData = await NewsApiServer.get(
      `/everything?q=${field}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );

    if (newsData.data.articles.length > 0) {
      return NextResponse.json(newsData.data.articles, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Not Found Data' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error getting access token or user info:', e);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
