import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from "~/models/user.model";
import { IUser } from "~/types";

export const register = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { nickname, password, hint }: IUser = req.body;
  if (!nickname || !password || !hint ) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const userExists: IUser | null = await User.findOne({ nickname });
  if (userExists) {
    res.status(400);
    throw new Error('Nickname is already used');
  }
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  const user = await User.create({ nickname, hint, password: hashedPassword });
  if (user) {
    res.status(201).json({
      id: user.id,
      nickname: user.nickname
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Sign in'});
});

