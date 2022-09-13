/* eslint-disable no-shadow */
import { Request } from "express";
import mongoose from "mongoose";

export enum MessagesEvents {
  CREATE_MESSAGE = "create_message",
}

export enum RoomEvents {
  JOIN_ROOM = "join_room",
  ROOM_CREATED = 'room_created'
}
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
export interface IRoom {
  _id: string;
  users: [mongoose.Types.ObjectId];
  messages: [mongoose.Types.ObjectId];
}
