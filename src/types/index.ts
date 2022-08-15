import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  nickname: string;
  hint: string;
  password: string;
}

export interface Message extends Document {
  user: mongoose.Schema.Types.ObjectId
  text: string;
}