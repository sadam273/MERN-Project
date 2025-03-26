import dotenv from "dotenv";
dotenv.config();
//:string untuk memastikan bahwa database_url adalah string
export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const SECRET: string = process.env.SECRET || "";
