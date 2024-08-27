import "dotenv/config";
import jwt from "jsonwebtoken";
import envValidation from "../validation/env.validation";

const generateAccessToken = async (data: { _id: string; email: string }) => {
  return jwt.sign(
    { _id: data._id, email: data.email },
    envValidation.JWT_ACCESS_KEY,
    {
      expiresIn: envValidation.JWT_ACCESS_KEY_EXPIRY,
    }
  );
};

const generateRefreshToken = async (_id: string) => {
  return jwt.sign({ _id: _id }, envValidation.JWT_REFRESH_KEY, {
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
