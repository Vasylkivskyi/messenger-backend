import { Router } from 'express';
import { createRoom, deleteRoom, getRooms } from '~/controllers/room.controller';
import auth from '~/middleware/auth.middleware';

const roomRouter = Router();

roomRouter.post('/', auth, createRoom);
roomRouter.get('/:userId', auth, getRooms);
roomRouter.delete('/delete/:roomId', auth, deleteRoom);

export default roomRouter;