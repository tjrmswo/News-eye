import { UseMutateFunction } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface sourceType {
  id: null | string;
  name: null | string;
}

export interface NewsDataType {
  id: number;
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: sourceType;
  title: string;
  url: string;
  urlToImage: string;
}

export interface ContextType {
  getData: (data: NewsDataType, index: number) => void;
  selectedData: NewsDataType;
  componentChange: boolean;
  handleInputComponent(): void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchWord: string;
  keyDownEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchedData: NewsDataType[] | undefined;
  searchNews: UseMutateFunction<NewsDataType[], Error, string, unknown>;
  setComponentChange: React.Dispatch<SetStateAction<boolean>>;
  setSearchWord: React.Dispatch<SetStateAction<string>>;
}

export interface articleContentType {
  data: {
    content: string;
  };
}

export interface NaverNewsDataType {
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
  title: string;
}

export type searchParamsType = {
  query?: string;
  sort?: string;
  display?: number;
};
