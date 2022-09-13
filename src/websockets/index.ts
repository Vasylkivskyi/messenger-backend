import socketIO from "socket.io";
import { createMessage } from "~/controllers/message.controller";
import { joinRoom } from "~/controllers/room.controller";
import { MessagesEvents, RoomEvents } from "~/types";


const websocketController = (socket: socketIO.Socket, io: socketIO.Server): void => {
  socket.on(MessagesEvents.CREATE_MESSAGE, data => createMessage({ data, io}));
  socket.on(RoomEvents.JOIN_ROOM, data => joinRoom({ data, socket, io }));
};

export default websocketController;