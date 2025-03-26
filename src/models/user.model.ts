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

const UserSchema = new Schema<User>({
  fullname: {
    type: Schema.Types.String,
    required: true,
  },

  username: {
    type: Schema.Types.String,
    required: true,
  },

  email: {
    type : Schema.Types.String,
    required: true,
  },

  password: {
    type: Schema.Types.String,
    required: true,
  },

  role: {
    type: Schema.Types.String,
    enum: ["admin", "user"],
    default: "user",
  },

  profilePicture:{
    type: Schema.Types.String,
    default: "user.jpg",
  },

  isActive: {
    type: Schema.Types.Boolean,
    default: false,
  },

  activationCode: {
    type: Schema.Types.String
  },
  
}, 
{
  timestamps: true,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
