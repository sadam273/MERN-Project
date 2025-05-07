import dotenv from "dotenv";
dotenv.config();
//:string untuk memastikan bahwa database_url adalah string
export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const SECRET: string = process.env.SECRET || "";
export const EMAIL_SMTP_SECURE: boolean = 
Boolean(process.env.EMAIL_SMTP_SECURE) || false;
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_STMP_PASS || "";
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PORT: number = Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_STMP_HOST || "";
export const EMAIL_SMTP_NAME: string = process.env.EMAIL_SMTP_NAME || "";