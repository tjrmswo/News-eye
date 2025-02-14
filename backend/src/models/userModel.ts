import { dbConfig } from '../config/db';
import mysql from 'mysql2/promise';
import { userType } from '../types/user';

const connection = mysql.createPool(dbConfig);

const user = {
  getUsers: async () => {
    const [getUsers] = await connection.execute('SELECT * FROM user');

    return getUsers;
  },
  getUser: async (id: Number) => {
    const [getUser] = await connection.execute(
      'SELECT * FROM user where id = ?',
      [id]
    );
    return getUser;
  },
  findUser: async (userID: string) => {
    const [findUser] = await connection.execute(
      'SELECT * FROM user where userID = ?',
      [userID]
    );
    return findUser;
  },
  createUsers: async (req: userType) => {
    const { userID, password, nickname } = req;
    const [createUser] = await connection.execute(
      'INSERT INTO user (userID, password, nickname) VALUES (?, ?, ?)',
      [userID, password, nickname]
    );
    return createUser;
  },
  updateUsers: async (req: userType) => {
    const updates: string[] = [];
    const params: string | number[] = [];
    const validFields = ['userID', 'password', 'nickname', 'profileImg']; // 허용되는 필드 목록

    for (const field of validFields) {
      if (req[field] !== undefined) {
        updates.push(`${field} = ?`);
        params.push(req[field]);
      }
    }

    const sql = `UPDATE user SET ${updates.join(', ')} WHERE id = ?`;
    params.push(req.id);

    const [updateUser] = await connection.execute(sql, params);

    return updateUser;
  },
  deleteUsers: async (id: number) => {
    const [deleteUser] = await connection.execute(
      'DELETE FROM user WHERE id LIKE ?',
      [id]
    );

    return deleteUser;
  },
};

export default user;
