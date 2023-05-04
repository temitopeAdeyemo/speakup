import { Request, Response, NextFunction } from 'express';
import { CelebrateError } from 'celebrate';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { AxiosError, isAxiosError } from 'axios';
import AppError from '../utils/AppError';
import { MulterError } from 'multer';

export default function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: null,
    });
  }

  if (error instanceof CelebrateError) {
    const bodyMessage = error.details.get('body')?.message;
    const queryMessage = error.details.get('query')?.message;
    const paramsMessage = error.details.get('params')?.message;

    return response.status(400).json({
      success: false,
      message: bodyMessage || queryMessage || paramsMessage,
      data: null,
    });
  }

  if (error instanceof AxiosError) {
    return response.status(error.response?.status || 502).json({
      success: false,
      message: error.message || 'UPSTREAM_SERVER_ERROR',
      data: error.response?.data || null,
    });
  }

  if (error instanceof MulterError && error.code === 'LIMIT_UNEXPECTED_FILE') {
    return response.status(400).json({
      success: false,
      message: `${error.message} ${error.field}, max image uploads allowed are 2.`,
      data: null,
    });
  }

  if (error instanceof TokenExpiredError) {
    return response.status(401).json({
      success: false,
      message: 'Token expired',
      data: null,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({
      success: false,
      message: 'Token invalid',
      data: null,
    });
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error',
    data: null,
  });
}
