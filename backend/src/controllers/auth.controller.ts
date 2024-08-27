import { Request, Response, NextFunction } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest, UserSchemaTS } from "../types";
import User from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import { ACCESS_TOKEN, cookieOptions, REFRESH_TOKEN } from "../constant";
import errorCode from "../utils/errorMsg";

//note: SIGNUP USER_
const signUp = asyncHandler(
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
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

//note: LOGIN USER_
const login = asyncHandler(
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password }: UserSchemaTS = request.body;

    /* check validation */
    if ([email, password].some((item) => item.trim() === "")) {
      return next(errorCode(400, "please fill all fields"));
    }

    /* check user if existed */
    const isUserExist = await User.findOne({
      $or: [{ email }],
    }).select("+password");

    if (!isUserExist) {
      return next(errorCode(400, "user not found"));
    }

    /* create new user */
    const isPasswordVerified = await isUserExist.isPasswordCorrect(password);

    if (!isPasswordVerified) {
      return next(errorCode(400, "password not match, unauthorize user"));
    }

    /* generate access and refresh token */
    const accessTokenGen: string = await generateAccessToken({
      _id: String(isUserExist._id),
      email: isUserExist.email,
    });
    const refreshTokenGen: string = await generateRefreshToken(
      String(isUserExist._id)
    );

    /* send responce */
    response
      .status(201)
      .cookie(ACCESS_TOKEN, accessTokenGen, cookieOptions)
      .cookie(REFRESH_TOKEN, refreshTokenGen, cookieOptions)
      .json({
        message: "Login User Successfully",
      });
  }
);
//note: LOGOUT USER_
const logout = asyncHandler(
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    // request insertion
    const _req = request as AuthRequest;
    const userID = _req.userId;

    /* check user if existed */
    const isUserExist = await User.findById({ _id: userID });
    if (!isUserExist) {
      return next(errorCode(400, "user not found"));
    }

    /* send responce */
    response
      .status(200)
      .clearCookie(ACCESS_TOKEN, {
        httpOnly: true,
        expires: new Date(0),
      })
      .clearCookie(REFRESH_TOKEN, {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        message: "user logout successfully",
      });
  }
);

//! EXPORT CONTROLLERS_
export { signUp, login, logout };
