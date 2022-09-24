import { Router } from 'express';
import { getMessages } from '~/controllers/message.controller';
import { auth } from '~/middleware/auth.middleware';

const messagesRouter = Router();

messagesRouter.get('/:roomId', auth, getMessages);

export default messagesRouter;