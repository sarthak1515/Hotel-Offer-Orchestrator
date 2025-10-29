import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  status?: number;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status ?? 500;
  const message =
    err.message || "Internal Server Error. Please try again later.";

  res.status(status).json({
    success: false,
    message,
  });
}
