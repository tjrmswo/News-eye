import express from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  deleteNews,
} from '../controllers/newsController';

const router = express.Router();

router.get('/news', getAllNews);
router.get('/news/:id', getNewsById);
router.post('/news', createNews);
router.delete('/news/:id', deleteNews);

export default router;
