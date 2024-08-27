import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "../types";

const asyncHandler = (requestHandler: RequestHandler) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      return Promise.resolve(requestHandler(request, response, next));
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
