import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "../types/index.js";

const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await requestHandler(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
