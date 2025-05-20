import chalk from 'chalk';
import { ErrorRequestHandler } from 'express';
import { HTTPSTATUS } from '../config/http.config';
import { AppError } from '../common/utils/AppError';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
): any => {
  console.log(
    chalk.red(`\n🔴 Error occurred on PATH: ${req.path}`),
    `\nMessage: ${error.message}`,
    `\nStack:\n${error.stack}\n`,
  );

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid JSON format, please check your request body',
    });
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  if (error instanceof ZodError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Validation failed',
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: error?.message || 'Unknown error occured',
  });
};
