import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from "~/models/user.model";
import { IUser } from "~/types";

const generateToken = (id: string): string => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const register = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { username, password, hint }: IUser = req.body;
  if (!username || !password || !hint ) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const userExists: IUser | null = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error('Username is already used');
  }
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  const user = await User.create({ username, hint, password: hashedPassword });
  if (user) {
    res.status(201).json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error('Field missing');
  }

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ id: user.id, username: user.username, token: generateToken(user.id) });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

export const search = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { term } = req.query;
  const searchTerm = (term as string)?.trim();
  if (!searchTerm) {
    res.status(400);
    throw new Error('Term is not provided');
  }

  const users = await User.fuzzySearch(searchTerm).select("-password");
  res.status(200).json(users);
});


