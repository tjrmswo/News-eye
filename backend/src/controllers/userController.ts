import { Request, Response } from 'express';
import { QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2/promise'; // 타입 가져오기
import user from '../models/userModel';
import { userType } from '../types/user';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (req.method === 'GET') {
      // 사용자 데이터 가져오기
      const rows: QueryResult = await user.getUsers();

      if (rows) {
        res.status(200).json(rows);
      } else {
        res.status(404).json({ message: 'No users found' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getOneUser = async (req: Request, res: Response) => {
  try {
    const User: QueryResult = await user.getUser(Number(req.params.id));

    console.log(`User:`, User);

    if (User) {
      res.status(200).json(User);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createUsers = async (req: Request, res: Response) => {
  try {
    if (req.method === 'POST') {
      const existingUser = await user.findUser(req.body.userID);

      if (existingUser) {
        res.status(404).json({ message: 'User already exists' });
      }

      const create = (await user.createUsers(req.body)) as ResultSetHeader;

      if (create.insertId > 0) {
        res.status(200).json(create.insertId);
      } else {
        res.status(404).json({ message: 'User creation error' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUsers = async (req: Request, res: Response) => {
  try {
    const userInfo = (await user.getUser(Number(req.params.id))) as userType[];

    if (!userInfo) {
      res.status(404).json({ message: 'User not found' });
    }

    const body = {
      id: userInfo[0].id,
      ...req.body,
    };

    const update = (await user.updateUsers(body)) as ResultSetHeader;

    console.log(update);

    if (update.affectedRows > 0) {
      res.status(200).json({ message: 'Updated successfully' });
    } else {
      res.status(404).json({ message: 'Failed to update' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUsers = async (req: Request, res: Response) => {
  try {
    const users = (await user.getUser(Number(req.params.id))) as userType[];

    console.log(users);
    if (users) {
      res.status(404).json({ message: 'User not found' });
    }

    const deleteUser = await user.deleteUsers(Number(req.params.id));

    if (deleteUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllUsers, getOneUser, createUsers, updateUsers, deleteUsers };
