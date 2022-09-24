import socketIO from "socket.io";
import { createMessage } from "~/controllers/message.controller";
import { upSaveSocketUser } from "~/controllers/socketUser.controller";
import { MessagesEvents, SocketUserEvents } from "~/types";


const websocketController = (socket: socketIO.Socket, io: socketIO.Server): void => {
  socket.on(SocketUserEvents.ADD_USER, userId => upSaveSocketUser({ socketId: socket.id, userId }));
  socket.on(MessagesEvents.SEND_MESSAGE, data => createMessage({ data, io }));
  socket.on('disconnect', () => console.info('user disconnected'));
};

export default websocketController;