import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { ResponseCode } from '@/types/ResponseCode';

import { returnErrorHandler } from './returnErrorHandler';

export function zodErrorHandler(error: ZodError): NextResponse<object> {
  const parsedErrors = JSON.parse(error.message);
  // Map over the parsed errors and create a formatted string for each
  const formattedErrors = parsedErrors.map(
    (err: { code?: string; expected?: string; received?: string; path?: string[]; message?: string }) => {
      let errorMessage = '';

      if (err.path && Array.isArray(err.path)) errorMessage += `Path: ${err.path.join('.')}. `;
      if (err.code) errorMessage += `Code: ${err.code}. `;
      if (err.expected) errorMessage += `Expected: ${err.expected}. `;
      if (err.received) errorMessage += `Received: ${err.received}. `;
      if (err.message) errorMessage += `Message: ${err.message}.`;

      return errorMessage;
    }
  );

  return returnErrorHandler(
    {
      message: 'Invalid request body',
      errors: formattedErrors,
    },
    ResponseCode.BAD_REQUEST
  );
}
