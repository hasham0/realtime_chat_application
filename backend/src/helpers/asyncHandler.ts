import { Request, Response, NextFunction } from "express";

type RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void> | void;

const asyncHandler = (requestHandler: RequestHandler) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      return await Promise.resolve(requestHandler(request, response, next));
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
