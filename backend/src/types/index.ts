import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";

type RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void> | void;

interface UserSchemaTS extends Document {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  image: string;
  color: number;
  profile_setup: boolean;
}
interface UserDocumentTS extends UserSchemaTS {
  isPasswordCorrect(password: string): Promise<boolean>;
}

interface TokenData {
  _id: string;
  email: string;
}

interface AuthRequest extends Request {
  userId: string;
}

export type {
  RequestHandler,
  UserDocumentTS,
  UserSchemaTS,
  TokenData,
  AuthRequest,
};
