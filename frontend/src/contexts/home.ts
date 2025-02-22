import { createContext, useContext } from 'react';

// types
import { ContextType } from '@/types/home';

export const DataContext = createContext<ContextType>({
  getData: () => {},
  selectedData: {
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
  },
  componentChange: false,
  handleInputComponent: () => {},
  handleInput: () => {},
  searchWord: '',
  keyDownEnter: () => {},
  searchedData: [
    {
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
    },
  ],
  searchNews: () => {},
  setComponentChange: () => {},
  setSearchWord: () => {},
});

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
