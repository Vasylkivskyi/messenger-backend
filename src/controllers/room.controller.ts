import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { Socket, Server } from 'socket.io';
import User from "~/models/user.model";
import Room from "~/models/room.model";
import { IRoom, RoomEvents } from "~/types";


export const getRooms = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.query;
  if (!userId) {
    res.status(400);
    throw new Error('User id is missing');
  }
  const result = await Room.find({ users: { $in: userId } })
    .slice('messages', 1)
    .select(['_id', 'messages', 'users'],)
    .sort({ 'messages': 'desc' })
    .populate({ path: 'users', model: 'User', select: ['_id', 'username'] });


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

type JoinRoomType = {
  data: { usersIds: Array<string> },
  socket: Socket,
  io: Server
}

export const joinRoom = async ({ data, socket, io }: JoinRoomType): Promise<void> => {
  const { usersIds } = data;
  const users = await User.find({
    '_id': { $in: usersIds.map(id => id,) }
  });

  const alreadyCreatedRoom: IRoom | null = await Room
    .findOne({ users: { $all: usersIds.map(id => id) } })
    .populate({ path: 'users', model: 'User', select: ['_id', 'username'] });

  if (alreadyCreatedRoom) {
    socket.join(alreadyCreatedRoom._id);
  } else {
    const { _doc: newRoom } = await Room.create({ users });
    socket.join(newRoom.id);
    io.sockets.in(newRoom.id)
      .emit(RoomEvents.ROOM_CREATED, { room: newRoom });
  }
};


