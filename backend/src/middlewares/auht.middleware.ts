import { Request, Response, NextFunction } from "express";
import asyncHandler from "../helpers/asyncHandler.js";
import { ACCESS_TOKEN } from "../constant.js";
import { verifyAccessToken } from "../utils/generateTokens.js";
import errorCode from "../utils/errorMsg.js";
import { AuthRequest, TokenData } from "../types/index.js";

import { JwtPayload } from "jsonwebtoken";

// ? Authenticated User
const isUserAuthenticated = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    // extract token from request and validate
    const getAccessToken =
      request.cookies[ACCESS_TOKEN] ||
      (request.headers.cookie &&
        request.headers.cookie.split("; ")[0].split("=")[1]);

    if (!getAccessToken) {
      throw new Error("please login to access");
    }

    // verify and validate access token
    const decoded = (await verifyAccessToken(getAccessToken)) as JwtPayload &
      TokenData;
    if (!decoded) {
      return next(errorCode(404, "Invalid token data"));
    }

    // request insertion
    const _req = request as AuthRequest;
    _req.userId = decoded._id as string;

    next();
  }
);

// // ? Authorize Admin
// const isUserAuthorizeAdmin = asyncHandler(async (request, response, next) => {
//   const { userId } = request;
//   const user = await User.findOne({ _id: userId }).select({ password: 0 });
//   if (!(user && user.isAdmin)) {
//     throw new Error("user not authorize as admin");
//   }
//   next();
// });
export { isUserAuthenticated };
