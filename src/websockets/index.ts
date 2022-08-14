import socketIO from "socket.io";


const websocketController = (socket: socketIO.Socket, io: socketIO.Server): void => {
  console.info('hello');
};

export default websocketController;