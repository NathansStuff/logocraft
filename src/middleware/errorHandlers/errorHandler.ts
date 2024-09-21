import { NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { returnErrorHandler } from './returnErrorHandler';

export function errorHandler(error: Error): NextResponse<object> {
  if (error.message) {
    if (error.message.includes('E11000')) {
      console.log(error.message);
      // This is a duplicate key error
      return returnErrorHandler(
        {
          message: 'Duplicate key error',
        },
        ResponseCode.BAD_REQUEST
      );
    } else if (error.message.includes('Cast to ObjectId failed for value')) {
      // This is a cast error
      return returnErrorHandler(
        {
          message: 'Invalid ID',
        },
        ResponseCode.BAD_REQUEST
      );
    } else {
      // This is some other internal error
      return returnErrorHandler({ message: `Unknown error: ${error.message}` }, ResponseCode.INTERNAL_SERVER_ERROR);
    }
  } else {
    // This is some other internal error
    return returnErrorHandler(
      {
        message: 'Unknown error without a message',
      },
      ResponseCode.INTERNAL_SERVER_ERROR
    );
  }
}
