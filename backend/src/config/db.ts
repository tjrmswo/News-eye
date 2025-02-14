import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// 환경 변수 로딩
dotenv.config({});

const dbConfig = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const pool = mysql.createPool(dbConfig);

export { dbConfig, pool };
