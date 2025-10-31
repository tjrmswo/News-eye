'use client';
import { useContext, useEffect, useState } from 'react';

// apis
import { NewsApiClient } from '@/app/api/newsApi';

// contexts
import { DataContext } from '@/contexts/home';

// types
import { ContextType, NewsDataType } from '@/types/news';

// libraries
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function AnalystPage() {
  const { analysisField } = useContext<ContextType>(DataContext);

  const localStorageAnalysisField = localStorage.getItem('analysisField');
  const [analysisResults, setAnalysisResults] = useState<string[]>([
    `AI로 ${
      analysisField.length > 0 ? analysisField : localStorageAnalysisField
    } 분야를 분석한 결과를 알려드리겠습니다!`,
  ]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const {
    data: AnalysisData,
    isSuccess: AnalysisDataSuccess,
    mutate: getAnalysisData,
  } = useMutation<NewsDataType[]>({
    mutationKey: ['getAnalysisData'],
    mutationFn: async () => {
      const field =
        analysisField.length > 0
          ? analysisField
          : localStorage.getItem('analysisField');

      const response = await NewsApiClient.get(
        `/api/news/category?field=${field}`
      );
      const data = response.data;

      console.log('뉴스 데이터: ', response.data);

      return data;
    },
  });

  useEffect(() => {
    if (analysisField.length > 0) {
      getAnalysisData();
    }
  }, [analysisField]);

  const { mutate: openAIAPIMutate, isSuccess: AIAnalysisDataSuccess } =
    useMutation<string[], void>({
      mutationKey: ['getAIAnalysisData'],
      mutationFn: async () => {
        const descriptions = AnalysisData?.map(
          (d: NewsDataType) => d.description
        );

        const jsonData = JSON.stringify(descriptions);

        if (!descriptions) return [];

        // console.log(jsonData);

        const messages = [
          {
            role: 'user',
            content:
              '내가 다음 보내주는 데이터들을 분석하고 많이 나온 키워드를 1~3번째를 뽑아서 나한테 제공해줘. 1.언급된 단어 (5회) -관련된 기사들의 내용 요약 같이 이런 형식으로 보여줘. 그리고 줄바꿈 되지 않게 출력해줘',
          },
          {
            role: 'user',
            content: jsonData,
          },
        ];

        const gptInput = {
          model: 'gpt-4o-mini',
          temperature: 0.5,
          messages: messages,
        };

        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          gptInput,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('open AI API 호출: ', response);

        const comment = response.data.choices[0].message.content;

        console.log('AI 답변: ', comment);

        const answers: string[] = comment
          .split(/\n/m)
          .filter((c: string) => /[1-9]\./.test(c)); // 각 문장에서 숫자와 점이 있는지 확인
        console.log('AI 답변 가공 중: ', answers);

        return answers;
      },
      onSuccess: (data: string[]) => {
        setAnalysisResults((prev) => [...prev, ...data]);
        setIsAnimating(true);
      },
      onError: (err) => {
        console.log('open AI API Error: ', err);
      },
    });

  useEffect(() => {
    if (AnalysisDataSuccess) {
      openAIAPIMutate();
    }
  }, [AnalysisDataSuccess]);

  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-7">
      <div className="flex flex-row justify-between">
        <span className="text-lg">
          {localStorage.getItem('analysisField')} 분야 분석 결과
        </span>
      </div>
      <div className="flex size-full flex-col items-center justify-center gap-3">
        {AIAnalysisDataSuccess ? (
          analysisResults.map((result, i) => (
            <div
              className={`flex w-full items-center justify-center opacity-0 ${isAnimating ? 'showAnwsers' : ''}`}
              key={i}
              style={{ animationDelay: `${i * 1}s` }}
            >
              <div className="flex h-20 w-2xl items-center rounded-r-xl rounded-tl-xl bg-[#f1f1f1] p-4 text-base font-extralight">
                {result}
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-xl flex-1 flex-row items-center justify-center">
            <div className="wrapper">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
