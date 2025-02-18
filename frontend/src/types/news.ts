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
}

export type searchParamsType = {
  query?: string;
  sort?: string;
  display?: number;
};
