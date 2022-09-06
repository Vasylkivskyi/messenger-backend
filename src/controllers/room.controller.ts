import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import User from "~/models/user.model";
import Room from "~/models/room.model";
import mongoose from "mongoose";

export const createRoom = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { users: usersIds }: {users: Array<string>} = req.body;
  if (usersIds.length !== 2) {
    res.status(400);
    throw new Error('Please add users');
  }
  const users = await User.find({
    '_id': { $in: usersIds.map(id => id,)}
  });

  if (users.length !== 2) {
    res.status(400);
    throw new Error("Can't find users");
  }
  const roomExists = await Room
    .findOne({ users: {$all:  usersIds.map(id => id)}});
  if (roomExists) {
    res.status(201).json(roomExists);
    return;
  }
  const room = await Room.create({ users });
  if (room) {
    res.status(201).json(room);
  } else {
    res.status(400);
    throw new Error('Invalid room data');
  }
});

export const getRooms = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400);
    throw new Error('User id is missing');
  }
  const result = await Room.find({ users: {$in:  userId}}).populate({ path: 'users', model: 'User'}) ;

  if (result.length) {
    res.json(result);
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});

export const deleteRoom = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;
  const result = await Room.findOneAndDelete({ _id: roomId});
  res.status(200).json(result);
});


