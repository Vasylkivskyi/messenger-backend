/* eslint-disable */
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Room from "~/models/room.model";
import SocketUser from "~/models/socketUser.model";
import { MessagesEvents } from "~/types";
import Message from "../models/message.model";

export const createMessage = async ({ data, io }) => {
  const { senderId, roomId, text } = data;
  const saved = await Message.create({ text, roomId, senderId });
  if (saved) {
    const room = await Room.findOne({ id: roomId })
      .populate({ path: 'members', model: 'User', select: ['id'] });
    if (room) {
      const socketUsers = await SocketUser.find({ userId: { $in: room.members.map(m => m.id.toString()) } });
      const senderSocketUser = await SocketUser.findOne({ userId: senderId });
      socketUsers.forEach(u => io.to(u?.socketId))
      io.to(senderSocketUser?.socketId).emit(MessagesEvents.RECEIVE_MESSAGE, { message: saved });
    }
  }
};

export const getMessages = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;
  if (!roomId) {
    res.status(400);
    throw new Error('No roomId provided');
  }
  const messages = await Message.find({ roomId }).limit(100).sort({ createAt: -1 });
  if (messages.length) {
    res.status(200).json(messages);
  } else {
    res.status(404);
    throw new Error('messages not found');
  }
});