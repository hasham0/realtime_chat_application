import "dotenv/config";
import jwt from "jsonwebtoken";
import envValidation from "../validation/env.validation.js";
import { TokenData } from "../types/index.js";

const generateAccessToken = async (data: TokenData) => {
  return jwt.sign(
    { _id: String(data._id), email: data.email },
    envValidation.JWT_ACCESS_KEY,
    {
      expiresIn: envValidation.JWT_ACCESS_KEY_EXPIRY,
    }
  );
};

const generateRefreshToken = async (_id: string) => {
  return jwt.sign({ _id: String(_id) }, envValidation.JWT_REFRESH_KEY, {
    expiresIn: envValidation.JWT_REFRESH_KEY_EXPIRY,
  });
};

const verifyAccessToken = async (token: string) => {
  return jwt.verify(token, envValidation.JWT_ACCESS_KEY);
};
const verifyRefreshToken = async (token: string) => {
  return jwt.verify(token, envValidation.JWT_REFRESH_KEY);
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
