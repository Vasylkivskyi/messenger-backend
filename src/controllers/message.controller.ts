/* eslint-disable */
import { MessagesEvents } from "~/types";
import Message from "../models/message.model";


// eslint-disable-next-line import/prefer-default-export
export const createMessage = async ({ data, io}) => {
  const { user, room, text } = data;
  const saved = await Message.create({ user, room, text });
  if (saved) {
    io.to(room).emit(MessagesEvents.CREATE_MESSAGE, { message: saved });
  }
};