import { Request, Response } from 'express';
import news from '../models/newsModel';
import { NewsDataType } from '../types/news';
import { ResultSetHeader } from 'mysql2';

const getAllNews = async (_req: Request, res: Response) => {
  try {
    const myNews = await news.getMyNews();
    console.log(myNews);

    if (myNews) {
      res.status(200).json(myNews);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (e) {
    console.error('Error fetching entire news:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getNewsById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const newsData = (await news.getNewsById(id)) as NewsDataType[];

    if (newsData.length > 0) {
      res.status(200).json(newsData);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createNews = async (req: Request, res: Response) => {
  try {
    const existingNews = (await news.findNews(
      req.body.title
    )) as NewsDataType[];
    console.log(existingNews);

    if (existingNews.length > 0) {
      res.status(404).json({ message: 'Already exist news' });
      return;
    }

    const response = (await news.saveNews(req.body)) as ResultSetHeader;

    if (response.insertId > 0) {
      res
        .status(200)
        .json({ id: response.insertId, message: 'created successfully' });
    } else {
      res.status(404).json({ message: 'Unable to create news' });
    }
  } catch (error) {
    console.log('Save News Error', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteNews = async (req: Request, res: Response) => {
  try {
    // 쿠키로 함께 보내는 newsUserID가 existingNews의 newsUserID값이 같으면 삭제하는 로직을 추가해야함
    const existingNews = (await news.findNewsById(
      Number(req.params.id)
    )) as NewsDataType[];

    if (existingNews.length > 0) {
      const response = (await news.deleteNews(
        Number(req.params.id)
      )) as ResultSetHeader;
      console.log('delete: ', response);
      if (response.affectedRows > 0) {
        res.status(200).json({ message: 'deleted successfully' });
      } else {
        res.status(404).json({ message: 'Unable to delete news' });
      }
    }
  } catch (error) {
    console.log('News Delete Error', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllNews, getNewsById, createNews, deleteNews };
