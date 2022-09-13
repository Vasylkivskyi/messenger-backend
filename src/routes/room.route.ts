import { Router } from 'express';
import { deleteRoom, getRooms } from '~/controllers/room.controller';
import auth from '~/middleware/auth.middleware';

const roomRouter = Router();
roomRouter.get('/getRooms', auth, getRooms);
roomRouter.delete('/delete/:roomId', auth, deleteRoom);

export default roomRouter;