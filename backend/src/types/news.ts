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
  newsUserID: number;
}
