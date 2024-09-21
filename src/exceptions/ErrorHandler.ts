import { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@/constants';

import { AuthenticationError } from './AuthenticationError';
import { BadRequestError } from './BadRequestError';
import { CustomError } from './CustomError';
import { NotFoundError } from './NotFoundError';

export function ErrorHandler(
  err: CustomError,
  req: NextApiRequest,
  res: NextApiResponse
): BadRequestError | AuthenticationError | NotFoundError | undefined {
  const status = err.status !== null && err.status !== undefined ? err.status : 500;
  const message = err.message.length > 0 ? err.message : 'Something went wrong';
  const error = err.error !== null ? err.error : null;

  if (err instanceof BadRequestError || err instanceof AuthenticationError || err instanceof NotFoundError) {
    return err;
  }

  const errorResponse = {
    status,
    message,
    error,
    stack: env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? '🥞' : err.stack,
  };

  res.status(status).json(errorResponse);
}
