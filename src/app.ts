import express, { Request, Response, Router } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import socketIO, { Server } from "socket.io";
import websocketContainer from './websockets';

dotenv.config();
const { PORT } = process.env;
const app = express();
const router: Router = express.Router();
const httpServer = http.createServer(app);
const io: socketIO.Server = new Server( httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST']
  }
});

router.use((req: Request, res: Response, next) => {
  console.info('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('Birds home page');
});

app.use(router);

io.on('connection', (socket: socketIO.Socket) => websocketContainer(socket, io));

httpServer.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});