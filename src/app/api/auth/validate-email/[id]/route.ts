import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { validateUserEmailHandler } from '@/features/user/server/userController';
export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => validateUserEmailHandler(req));
}
