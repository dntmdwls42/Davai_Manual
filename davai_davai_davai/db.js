import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;

export async function connectDB() {
  if (!db) {
    try {
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

  try {
    await db.ping();
  } catch (err) {
    console.log("DB connection lost, reconnecting...", err);
    db = null;
    return connectDB();
  }

  return db;
}
