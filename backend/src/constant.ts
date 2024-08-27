import { CookieOptions } from "express";
import envValidation from "./validation/env.validation";

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: envValidation.NODE_ENV === "development",
  sameSite: "none",
  maxAge: 30 * 24 * 60 * 60 * 1000 * 3,
};

export { ACCESS_TOKEN, REFRESH_TOKEN, cookieOptions };
