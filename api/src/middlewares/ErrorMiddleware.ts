/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiError from "@src/util/errors/ApiError";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: Error & ApiError,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const statusCode = error.code || 500
  const message = error.code ? error.message : 'Something went wrong!'
  return res.status(statusCode).json({
    code: statusCode,
    message
  })
}