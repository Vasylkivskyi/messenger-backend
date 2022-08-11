import socketIO from "socket.io";


const websocketContainer = (socket: socketIO.Socket, io: socketIO.Server): void => {
  console.info('hello');
};

export default websocketContainer;