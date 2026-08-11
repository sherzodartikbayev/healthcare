import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error.js";

export default function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof BaseError) {
    return res.status(error.status).json({
      message: error.message,
      ...(error.errors.length > 0 && {
        errors: error.errors,
      }),
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal Server Error",
  });
}