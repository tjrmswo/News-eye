export interface HeaderType {
  componentChange: boolean;
  handleInputComponent(): void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyDownEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  field: string;
  handleCategories: (value: string) => void;
}

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
