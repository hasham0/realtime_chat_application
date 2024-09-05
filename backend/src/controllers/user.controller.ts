import { Request, Response, NextFunction } from "express";
import asyncHandler from "../helpers/asyncHandler.js";
import { AuthRequest, UserSchemaTS } from "../types/index.js";
import User, { UserType } from "../models/user.model.js";
import errorCode from "../utils/errorMsg.js";
import mongoose from "mongoose";

//note: USER_INFORMATION
const UserInfo = asyncHandler(
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    // request insertion
    const _req = request as AuthRequest;
    const userID = _req.userId;

    /* check user if existed */
    const isUserExist: UserType = await User.findOne({
      _id: new mongoose.Types.ObjectId(userID),
    });
    if (!isUserExist) {
      return next(errorCode(400, "user not found"));
    }

    /* send responce */
    response.status(200).json({
      message: "user information fetch successfully",
      data: isUserExist,
    });
  }
);

//note: USER_INFORMATION
const UpdateUserInfo = asyncHandler(
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    // request insertion
    const _req = request as AuthRequest;
    const userID = _req.userId;

    /* check user if existed */
    const isUserExist: UserType = await User.findOne({
      _id: new mongoose.Types.ObjectId(userID),
    });
    if (!isUserExist) {
      return next(errorCode(400, "user not found"));
    }

    const { email, first_name, last_name, color }: UserSchemaTS = request.body;

    /* check validation */
    if ([email, first_name, last_name].some((item) => item.trim() === "")) {
      return next(errorCode(400, "please fill all fields"));
    }
    if (!(typeof color === "number")) {
      return next(errorCode(400, "please fill correct value"));
    }

    /* create new user */
    const newUser: UserType = await User.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(userID) },
      {
        email: email,
        first_name: first_name,
        last_name: last_name,
        color: color,
        profile_setup: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    /* send responce */
    response.status(201).json({
      message: "User Information Updated Successfully",
      data: newUser,
    });
  }
);
//! EXPORT CONTROLLERS_
export { UserInfo, UpdateUserInfo };
