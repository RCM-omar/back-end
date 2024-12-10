import dotenv from "dotenv";
dotenv.config();


export const SERVER_PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT;
export const EXTERNAL_API_BASE_URL = process.env.EXTERNAL_API_BASE_URL;
// export const API_KEY = process.env.API_KEY;