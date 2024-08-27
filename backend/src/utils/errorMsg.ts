import createHttpError from "http-errors";

const errorCode = (statusCode: number, message: string) => {
  return createHttpError(statusCode, { message: message });
};

export default errorCode;
