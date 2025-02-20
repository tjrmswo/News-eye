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
}

export interface articleContentType {
  data: {
    content: string;
  };
}
