import { NextResponse } from "next/server";
import { NewsApiServer } from "@/shared/api/newsApi";
import { ServerNewsDataType } from "@/types/news";

export async function POST(req: Request) {
  const { field } = await req.json();

  try {
    const newsData = await NewsApiServer.get(
      `/everything?q=${field}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    );

    const articles: ServerNewsDataType[] = newsData.data.articles;

    if (articles.length > 0) {
      // return NextResponse.json(newsData.data.articles, { status: 200 });

      const processedArticles = await Promise.all(
        articles.map(async (article) => {
          if (article.urlToImage) {
            // 이미지 URL에서 데이터를 가져오기
            const imageResponse = await fetch(article.urlToImage);

            // 응답 체크: 성공적인 응답인지 확인
            if (!imageResponse.ok) {
              throw new Error(
                `Failed to fetch image: ${imageResponse.statusText}`,
              );
            }

            // arrayBuffer를 사용하여 이미지 데이터를 Buffer로 변환
            const arrayBuffer = await imageResponse.arrayBuffer();
            const imageBuffer = Buffer.from(arrayBuffer);

            // Base64 인코딩
            const base64Image = imageBuffer.toString("base64");
            const mimeType = imageResponse.headers.get("content-type");

            // article의 urlToImage를 base64로 변환
            article.urlToImage = `data:${mimeType};base64,${base64Image}`;
          }
          return article;
        }),
      );

      return NextResponse.json(processedArticles, { status: 200 });
    } else {
      return NextResponse.json({ message: "Not Found Data" }, { status: 404 });
    }
  } catch (e) {
    console.error("Error getting access token or user info:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
