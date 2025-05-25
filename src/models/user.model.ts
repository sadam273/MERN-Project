import mongoose from "mongoose";
import { StringLiteral } from "typescript";
import { encrypt } from "../utils/encryption";
import { renderHtml, sendEmail, transporter } from "../utils/mail/mail";
import { CLIENT_HOST } from "../utils/env";

export interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
  createdAt?: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>(
  {
    fullname: {
      type: Schema.Types.String,
      required: true,
    },

    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },

    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
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

    profilePicture: {
      type: Schema.Types.String,
      default: "user.jpg",
    },

    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },

    activationCode: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  user.password = encrypt(user.password);
  user.activationCode = encrypt(user.id);
  next();
});

UserSchema.post("save", async function (doc, next) {
  try {
    const user = doc;

    console.log("Send email to: ", user.email);

    const contentMail = await renderHtml("registration-success.ejs", {
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      createdAt: user.createdAt,
      activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
    });

    await sendEmail({
      from: "ashleyfreak488@gmail.com",
      to: user.email,
      subject: "Aktivasi Akun Coba",
      html: contentMail,
    });

    console.log("SMTP CONFIG >" + transporter.options);
  } catch (error) {
    console.log("Error >" + error);
  } finally {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
