import { Request } from "express";
import mongoose from "mongoose";

export interface IUser {
  username: string;
  hint: string;
  password?: string;
}

export interface Message {
  user: mongoose.Schema.Types.ObjectId;
  room: mongoose.Schema.Types.ObjectId;
  text: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user?: any; // or any other type
}

export interface Room {
  users: [mongoose.Types.ObjectId];
  messages: [mongoose.Types.ObjectId];
}