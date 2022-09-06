import { Router } from 'express';
import { createRoom, deleteRoom, getRooms } from '~/controllers/room.controller';
// import auth from '~/middleware/auth.middleware';

const roomRouter = Router();

roomRouter.post('/create', createRoom);
roomRouter.get('/getRooms', getRooms);
roomRouter.delete('/delete/:roomId', deleteRoom);

export default roomRouter;