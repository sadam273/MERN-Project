import mongoose from "mongoose";
import { StringLiteral } from "typescript";

export interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>();
