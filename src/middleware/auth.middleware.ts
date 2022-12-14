import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { NextFunction, Response } from 'express';
import { IGetUserAuthInfoRequest } from '~/types';
import User from '~/models/user.model';

export const auth = asyncHandler(async (
  req: IGetUserAuthInfoRequest, res: Response, next: NextFunction
): Promise<void> => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export const isValid = (token: string | undefined): boolean => {
  if (!token) return false;
  const withoutBearer = token.split(' ')[1];
  try {
    const result = jwt.verify(withoutBearer, process.env.JWT_SECRET);
    return !!result.id;
  } catch (error) {
    console.error(error);
    return false;
  }
};