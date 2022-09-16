import SocketUser from "~/models/socketUser.model";

export const upSaveSocketUser = async (
  { socketId, userId }: { socketId: string; userId: string }
  ): Promise<void> => {
  const socketUser = await SocketUser.findOne({ userId });
  if (socketUser) {
    socketUser.socketId = socketId;
    await socketUser.save();
  } else {
    await SocketUser.create({ socketId, userId });
  }
};

export const deleteSocketUser = async ({ socketId }: { socketId: string }): Promise<void> => {
  await SocketUser.findOneAndDelete({ socketId });
};