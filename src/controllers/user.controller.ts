import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { IUser } from "../types";
import User from "../models/user.model";

const generateToken = (id: string): string => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const register = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const { email, name, password }: IUser = req.body;
  if (!email || !password || !name ) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const userExists: IUser | null = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Username is already used');
  }
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Field missing');
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
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
  const users = await User.fuzzySearch(searchTerm).select("-password").limit(10);
  res.status(200).json(users);
});


