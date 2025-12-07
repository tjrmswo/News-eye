"use client";
import { NewsApiClient } from "@/shared";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NewsDataType } from "./type";
import { sortingCategory } from "../lib/constants";

export default function useHandleHeader() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ query parameter 읽기

  // ✅ URL query에서 field 읽기, 없으면 '과학' 기본값
  const fieldFromQuery = searchParams.get("field") || "과학";
  // tab 상태
  const [field, setField] = useState<string>(fieldFromQuery);

  // ✅ query parameter가 바뀔 때마다 field 업데이트
  useEffect(() => {
    const newField = searchParams.get("field") || "과학";
    setField(newField);
  }, [searchParams]);

  // [id] 데이터
  const [_selectedData, setSelectedData] = useState<NewsDataType>({
    id: 0,
    author: "",
    content: "",
    description: "",
    publishedAt: "",
    source: {
      id: null,
      name: null,
    },
    title: "",
    url: "",
    urlToImage: "",
  });

  // 컴포넌트 변경 boolean
  const [componentChange, setComponentChange] = useState<boolean>(false);

  // 단어 검색
  const [searchWord, setSearchWord] = useState<string>("");

  const getData = (data: Omit<NewsDataType, "id">, index: number) => {
    setSelectedData({
      id: index,
      ...data,
      source: {
        id: data.source.id,
        name: data.source.name,
      },
    });

    router.push(`/${index}`);
  };

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearchWord(value);
    localStorage.setItem("searchWord", value);
  }

  const {
    data: searchedData,
    mutate: searchNews,
    isSuccess: searchSuccess,
  } = useMutation<NewsDataType[], Error, string>({
    mutationKey: ["searchData"],
    mutationFn: async (searchWord: string) => {
      const response = await NewsApiClient.post("/api/news/search", {
        field: searchWord,
      });

      return response.data;
    },
    onSuccess: () => {
      router.push(`/search`);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function keyDownEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      searchNews(searchWord);
    }
  }

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  const { data: categoryData = [], isSuccess: categorySuccess } = useQuery<
    NewsDataType[]
  >({
    queryKey: ["getCategoryData", field],
    queryFn: async () => {
      const response = await NewsApiClient.get(
        `/api/news/category?field=${field}`,
      );
      const data = response.data;

      console.log("뉴스 데이터: ", data);

      return data;
    },
    retry: false,
  });

  // ✅ 카테고리 변경 시 URL 업데이트
  const handleCategories = (value: string) => {
    if (value in sortingCategory) {
      setField(value);
      router.push(`/categories?field=${value}`); // ✅ query parameter로 이동
    } else {
      console.error(`Invalid category key: ${value}`);
    }
  };

  return {
    handleInput,
    searchWord,
    keyDownEnter,
    searchedData,
    searchSuccess,
    handleInputComponent,
    getData,
    componentChange,
    categoryData,
    categorySuccess,
    field,
    handleCategories,
  };
}
