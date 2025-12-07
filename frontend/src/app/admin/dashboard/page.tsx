"use client";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  AnalysisBarChartDataType,
  ContextType,
  NewsDataType,
} from "@/types/news";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { NewsApiClient } from "@/shared";
import { DataContext } from "@/contexts/home";

Chart.register(...registerables); // Chart.js의 모든 요소 등록

export default function DashboardPage() {
  const context = useContext<ContextType>(DataContext);

  const { setAnalysisField } = context;
  // 선택된 필드 데이터
  const [selectedField, setSelectedField] = useState<string>("");

  // BarChart 데이터
  const [barChartData, setBarChartData] = useState<AnalysisBarChartDataType[]>(
    [],
  );

  const getField = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      if (value !== selectedField) {
        setSelectedField(value);
        setAnalysisField(value);
        localStorage.setItem("analysisField", value);
      }
    },
    [],
  );

  // Bar 차트 데이터
  const data = {
    labels: barChartData && barChartData.map((item) => item.keyword), // 모든 keyword를 labels 배열에 추가
    datasets: [
      {
        label: "Usage by News", // 그래프의 레이블
        data: barChartData && barChartData.map((item) => item.count), // 모든 count를 Y축 데이터에 추가
        backgroundColor: "rgba(180, 177, 177, 0.2)", // 막대의 배경색
        borderColor: "rgba(69, 69, 69, 0.2)", // 막대의 경계색
        borderWidth: 1, // 경계 두께
      },
    ],
  };

  // Bar 차트 옵션
  const options = {
    scales: {
      y: {
        beginAtZero: true, // Y축 0부터 시작
        title: {
          display: true,
          text: "사용 빈도", // Y축 제목
        },
      },
      x: {
        beginAtZero: true, // Y축 0부터 시작
        title: {
          display: true,
          text: "기사에서 자주 나온 단어들", // X축 제목
        },
      },
    },
  };

  const {
    data: AnalysisData,
    isSuccess: AnalysisDataSuccess,
    mutate: getAnalysisData,
  } = useMutation<NewsDataType[]>({
    mutationKey: ["getAnalysisData", selectedField],
    mutationFn: async () => {
      const response = await NewsApiClient.get(
        `/api/news/category?field=${selectedField}`,
      );
      const data = response.data;

      // console.log('뉴스 데이터: ', response.data);

      return data;
    },
  });

  useEffect(() => {
    if (selectedField.length > 0) {
      getAnalysisData();
    }
  }, [selectedField]);

  const { mutate: openAIAPIMutate } = useMutation<string[][], void>({
    mutationKey: ["getScienceData"],
    mutationFn: async () => {
      const descriptions = AnalysisData?.map(
        (d: NewsDataType) => d.description,
      );

      const jsonData = JSON.stringify(descriptions);

      if (!descriptions) return []; // 이렇게 수정

      // console.log(jsonData);

      const messages = [
        {
          role: "system",
          content:
            "답변은 항상 한국어로 해주세요. 그리고 답변 토큰의 갯수는 100으로 제한합니다",
        },
        {
          role: "user",
          content:
            "내가 다음 보내주는 데이터들을 분석하고 많이 나온 키워드를 1~8번째를 뽑아서 나한테 제공해줘. 1.언급된 단어 - 횟수와 같이 간단한 내용 이런 형식으로 보여줘",
        },
        {
          role: "user",
          content: jsonData,
        },
      ];

      const gptInput = {
        model: "gpt-4o-mini",
        temperature: 0.5,
        messages: messages,
      };

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        gptInput,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      // console.log('open AI API 호출: ', response);

      const comment = response.data.choices[0].message.content;

      // console.log('AI 답변: ', comment);

      const answers: string[] = comment
        .split("\n")
        .filter((c: string) => /[1-9]./.test(c));

      // console.log('AI 답변 가공 중: ', answers);

      const filtering = answers.map((answer: string) => {
        const splitAnswer = answer
          .split(" ")
          .map((word) => {
            return word
              .replace(/\*/g, "")
              .replace(/[.]/g, "")
              .replace(/회/g, "");
          })
          .filter((word) =>
            /^[0-9가-힣a-zA-Z]+(?:\([a-zA-Z가-힣]+\))?$/.test(word),
          );

        return splitAnswer;
      });

      // console.log('데이터 가공 완료', filtering);

      return filtering;
    },
    onSuccess: (data: string[][]) => {
      if (data) {
        data.map((datum) => {
          // datum[0]은 index로 사용할 숫자
          const index = Number(datum[0]);
          let keyword = "";
          let count = 0;
          let countFound = false;

          // 데이터 안의 각 요소를 순회하여 keyword와 count를 설정
          for (let i = 1; i < datum.length; i++) {
            const value = datum[i];

            // 숫자인 경우 count로 할당
            if (!isNaN(Number(value))) {
              if (!countFound) {
                count = Number(value);
                countFound = true; // count 할당 완료
              }
            } else {
              // 숫자가 아닌 경우 keyword에 합침
              keyword += (keyword ? " " : "") + value; // 이전이 있으면 space 추가
            }
          }

          // barChartData 업데이트
          setBarChartData((prev) => {
            const filteredPrev = prev.filter((d) => d.index !== index);
            return [
              ...filteredPrev,
              {
                index: index,
                keyword: keyword,
                count: count,
              },
            ];
          });
        });
      }
    },
    onError: (err) => {
      console.log("open AI API Error: ", err);
    },
  });

  useEffect(() => {
    if (AnalysisDataSuccess) {
      openAIAPIMutate();
    }
  }, [AnalysisDataSuccess]);

  useEffect(() => {
    console.log(barChartData);
  }, [barChartData]);

  return (
    <div className="rounded- flex h-full flex-col bg-white p-7">
      <div className="flex flex-row justify-between">
        <span className="text-xl">Dashboard</span>

        <select className="font-mono" onChange={getField}>
          <option>분야</option>
          <option value="정보기술/과학">IT/과학</option>
          <option value="경제">경제</option>
          <option value="정치">정치</option>
          <option value="사회">사회</option>
          <option value="생활/문화">생활/문화</option>
        </select>
      </div>

      <div className="flex h-lg flex-row flex-wrap items-center justify-around">
        <div className="flex w-full justify-center">
          {barChartData.length > 0 ? (
            <Bar className="p-4" data={data} options={options} />
          ) : (
            <div id="wifi-loader">
              <svg className="circle-outer" viewBox="0 0 86 86">
                <circle className="back" cx="43" cy="43" r="40"></circle>
                <circle className="front" cx="43" cy="43" r="40"></circle>
                <circle className="new" cx="43" cy="43" r="40"></circle>
              </svg>
              <svg className="circle-middle" viewBox="0 0 60 60">
                <circle className="back" cx="30" cy="30" r="27"></circle>
                <circle className="front" cx="30" cy="30" r="27"></circle>
              </svg>
              <svg className="circle-inner" viewBox="0 0 34 34">
                <circle className="back" cx="17" cy="17" r="14"></circle>
                <circle className="front" cx="17" cy="17" r="14"></circle>
              </svg>
              <div className="text" data-text="분석중.."></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
