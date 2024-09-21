import { NextResponse } from 'next/server';

// Easy to change the return type across different application types eg node so the whole try/catch middleware can be static
export function returnErrorHandler(jsonResponse: object, errorCode: number): NextResponse<object> {
  return NextResponse.json(jsonResponse, {
    status: errorCode,
  });
}
