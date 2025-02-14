import { pool } from '../config/db';
import { NewsDataType } from '../types/news';

const news = {
  getMyNews: async () => {
    const [getUsers] = await pool.execute('SELECT * FROM news');
    return getUsers;
  },

  getNewsById: async (id: number) => {
    const [rows] = await pool.execute(
      'SELECT * FROM news WHERE newsUserID = ?',
      [id]
    );
    return rows;
  },

  saveNews: async (data: NewsDataType) => {
    const {
      author,
      content,
      description,
      publishedAt,
      title,
      url,
      urlToImage,
      newsUserID,
    } = data;
    const { id, name } = data.source;

    const [rows] = await pool.execute(
      'INSERT INTO news (author, content, description, publishedAt, id, name, title, url, urlToImage, newsUserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        author,
        content,
        description,
        publishedAt,
        id,
        name,
        title,
        url,
        urlToImage,
        newsUserID,
      ]
    );

    return rows;
  },
  findNews: async (title: string) => {
    const [rows] = await pool.execute('SELECT * FROM news WHERE title = ?', [
      title,
    ]);

    return rows;
  },
  findNewsById: async (id: number) => {
    const [rows] = await pool.execute('SELECT * FROM news WHERE newsID = ?', [
      id,
    ]);
    // console.log('newsID로 찾은 뉴스 데이터: ', rows);

    return rows;
  },
  deleteNews: async (id: number) => {
    const [rows] = await pool.execute('DELETE FROM news WHERE newsID LIKE ?', [
      id,
    ]);

    return rows;
  },
};

export default news;
