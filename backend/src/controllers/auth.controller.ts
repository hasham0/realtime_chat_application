import { Request, Response, NextFunction } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { UserSchemaTS } from "../types";
import User from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import { ACCESS_TOKEN, cookieOptions, REFRESH_TOKEN } from "../constant";
import errorCode from "../utils/errorMsg";

//note: SIGNUP USER_
const signUp = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password }: UserSchemaTS = request.body;

    /* check validation */
    if ([email, password].some((item) => item.trim() === "")) {
      return next(errorCode(400, "please fill all fields"));
    }

    /* check user if existed */
    const isUserExist = await User.findOne({
      $or: [{ email }],
    });

    if (isUserExist) {
      return next(errorCode(400, "user already exist"));
    }

    /* create new user */
    const newUser = await User.create({ email: email, password: password });

    /* generate access and refresh token */
    const accessTokenGen: string = await generateAccessToken({
      _id: String(newUser._id),
      email: newUser.email,
    });
    const refreshTokenGen: string = await generateRefreshToken(
      String(newUser._id)
    );

    /* send responce */
    response
      .status(201)
      .cookie(ACCESS_TOKEN, accessTokenGen, cookieOptions)
      .cookie(REFRESH_TOKEN, refreshTokenGen, cookieOptions)
      .json({
        message: "User Created Successfully",
      });
  }
);

//! EXPORT CONTROLLERS_
export { signUp };
