import { Request } from "express";
import mongoose from "mongoose";

export interface IUser {
  nickname: string;
  hint: string;
  password?: string;
}

export interface Message {
  user: mongoose.Schema.Types.ObjectId
  text: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user?: any; // or any other type
}