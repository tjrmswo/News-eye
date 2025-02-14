import express from 'express';
import {
  createUsers,
  deleteUsers,
  getAllUsers,
  getOneUser,
  updateUsers,
} from '../controllers/userController';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/user/:id', getOneUser);
router.post('/signup', createUsers);
router.patch('/user/:id', updateUsers);
router.delete('/user/:id', deleteUsers);

export default router;
