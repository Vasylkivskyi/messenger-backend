import { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';

const connectSockets = (app: Application): { io: Server, httpServer: http.Server } => {
  const httpServer = http.createServer(app);
  const io: Server = new Server( httpServer, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST']
    }
  });
  return { io , httpServer};
};

export default connectSockets;
