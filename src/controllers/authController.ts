import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';

export const signUp = asyncHandler((req: Request, res: Response): void => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('fksjdlfkjskl');
  }
  res.status(200).json({ message: 'Sign up'});
});

export const signIn = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Sign in'});
});

