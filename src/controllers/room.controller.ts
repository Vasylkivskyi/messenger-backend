import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import User from "~/models/user.model";
import Room from "~/models/room.model";

export const createRoom = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.body;
  if (!senderId || !receiverId) {
    res.status(400);
    throw new Error('Sender or receiver id is missing');
  }
  const users = await User.find({
    '_id': { $in: [senderId, receiverId] }
  }).select('-password');

  const alreadyCreatedRoom = await Room
    .findOne({ members: { $all: users.map(id => id) } })
    .populate({ path: 'members', model: 'User', select: ['-password']});

  if (alreadyCreatedRoom) {
    res.status(200).json(alreadyCreatedRoom);
  } else {
    const newRoom = await Room.create({ members: users });
    res.status(200).json(newRoom);
  }
});


export const getRooms = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error('User id is missing');
  }
  const result = await Room.find({ members: { $in: userId } })
    .populate({ path: 'members', model: 'User', select: ['-password']});

  if (result.length) {
    res.json(result);
  } else {
    res.status(404);
    throw new Error('Rooms not found');
  }
});

export const deleteRoom = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;
  const result = await Room.findOneAndDelete({ _id: roomId });
  res.status(200).json(result);
});




