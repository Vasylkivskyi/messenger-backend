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
import authRouter from './routes/authRouter';
import errorHandler from './middleware/errorMiddleware';

dotenv.config();
connectDB();

const { PORT } = process.env;

const app: Application = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);


const { io, httpServer }: { io: Server, httpServer: HTTPServer } = connectSockets(app);
io.on('connection', (socket: Socket) => websocketController(socket, io));
app.use(errorHandler);
httpServer.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});