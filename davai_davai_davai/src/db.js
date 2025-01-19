import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;

export async function connectDB() {
  if (!db) {
    try {
      //env 파일에 있는 정보로 DB 연결
      db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
      });
      console.log("Successfully connected to the database.");
    } catch (err) {
      console.error("Failed to connect to Database : ", err.message);
      throw err;
    }
  }

  //DB 연결 상태 확인 및 재연결 시도
  try {
    await db.ping();
  } catch (err) {
    console.log("DB connection lost, reconnecting...", err);
    db = null;
    return connectDB();
  }

  return db;
}
