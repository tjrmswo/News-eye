'use client';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

// contexts
import { DataContext } from '@/contexts/home';

// types
import { NewsDataType } from '@/types/home';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
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

  return (
    <DataContext.Provider value={{ selectedData, getData }}>
      {children}
    </DataContext.Provider>
  );
};
