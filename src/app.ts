/* eslint-disable no-console */
import express, { Application } from 'express';
import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import websocketController from './websockets';
import connectDB from './config/db';
import connectSockets from './config/sockets';
import userRoute from './routes/user.route';
import errorHandler from './middleware/error.middleware';
import roomRouter from './routes/room.route';
import messagesRouter from './routes/messages.route';
import { isValid } from './middleware/auth.middleware';

dotenv.config();
connectDB();

const { PORT } = process.env;

const app: Application = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ "extended": false }));

app.use('/api/user', userRoute);
app.use('/api/rooms', roomRouter);
app.use('/api/messages', messagesRouter);

const { io, httpServer }: { io: Server, httpServer: HTTPServer } = connectSockets(app);

io.use(async (socket, next) => {
  const { authorization: token } = socket.handshake.headers;
  if (isValid(token)) {
    return next();
  }
  socket.disconnect();
  return next(new Error('authentication error'));
});

io.on('connection', async (socket: Socket) => {
  console.info(`user ${socket.id} connected`);
  await websocketController(socket, io);
});
app.use(errorHandler);
httpServer.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});