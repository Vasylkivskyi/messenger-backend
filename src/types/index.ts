/* eslint-disable no-shadow */
import { Request } from "express";
import mongoose from "mongoose";
import { Socket, Server } from 'socket.io';


export enum MessagesEvents {
  SEND_MESSAGE = "send_message",
  RECEIVE_MESSAGE = "receive_message",
  GET_MESSAGES = "get_messages",
  MESSAGES_RECEIVED = "messages_received",
}

export enum RoomEvents {
  JOIN_ROOMS = "join_rooms",
  ROOM_CREATED = 'room_created',
  CREATE_ROOM = "create_room",
}

export enum SocketUserEvents {
  ADD_USER = 'add_user'
}
export interface IUser {
  name: string;
  email: string;
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

export type CreateRoomType = {
  data: { usersIds: Array<string> },
  socket: Socket,
  io: Server
}

export type JoinRoomType = {
  data: { roomsIds: Array<string>}
  socket: Socket
}
