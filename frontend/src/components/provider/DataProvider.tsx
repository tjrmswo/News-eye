'use client';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

// types
import { NewsDataType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';

// apis
import { NewsApiClient } from '@/app/api/newsApi';

// contexts
import { DataContext } from '@/contexts/home';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  // [id] 데이터
  const [selectedData, setSelectedData] = useState<NewsDataType>({
    id: 0,
    author: '',
    content: '',
    description: '',
    publishedAt: '',
    source: {
      id: null,
      name: null,
    },
    title: '',
    url: '',
    urlToImage: '',
  });
  // 컴포넌트 변경 boolean
  const [componentChange, setComponentChange] = useState<boolean>(false);
  // 단어 검색
  const [searchWord, setSearchWord] = useState<string>('');

  const getData = (data: Omit<NewsDataType, 'id'>, index: number) => {
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

  function handleInputComponent() {
    setComponentChange(!componentChange);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearchWord(value);
    localStorage.setItem('searchWord', value);
  }

  const { data: searchedData, mutate: searchNews } = useMutation<
    NewsDataType[],
    Error,
    string
  >({
    mutationKey: ['searchData'],
    mutationFn: async (searchWord: string) => {
      const response = await NewsApiClient.post('/api/news/search', {
        field: searchWord,
      });

      return response.data;
    },
    onSuccess: () => {
      router.push(`/search`);
    },
  });

  function keyDownEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === 'Enter') {
      searchNews(searchWord);
    }
  }

  return (
    <DataContext.Provider
      value={{
        selectedData,
        getData,
        handleInputComponent,
        componentChange,
        handleInput,
        searchWord,
        keyDownEnter,
        searchedData,
        searchNews,
        setComponentChange,
        setSearchWord,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
