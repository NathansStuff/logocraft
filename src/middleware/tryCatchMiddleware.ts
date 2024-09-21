import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { ResponseCode } from '@/types/ResponseCode';

import { CustomError } from '../exceptions';

import { errorHandler } from './errorHandlers/errorHandler';
import { returnErrorHandler } from './errorHandlers/returnErrorHandler';
import { zodErrorHandler } from './errorHandlers/zodErrorHandler';

export async function TryCatchMiddleware<T>(asyncFunction: () => Promise<T>): Promise<T | NextResponse<object>> {
  try {
    return await asyncFunction();
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      return returnErrorHandler(
        {
          message: error.message,
        },
        error.status ?? ResponseCode.INTERNAL_SERVER_ERROR
      );
    } else if (error instanceof ZodError) {
      return zodErrorHandler(error);
    } else if (error instanceof Error) {
      return errorHandler(error);
    } else {
      // This is some other internal error
      return returnErrorHandler({ message: 'Internal error. Error: Unknown' }, ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }
}
