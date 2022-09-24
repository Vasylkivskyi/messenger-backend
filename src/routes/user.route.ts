import { Router } from 'express';
import { login, register, search } from '~/controllers/user.controller';
import { auth } from '~/middleware/auth.middleware';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/search', auth, search);

export default authRouter;