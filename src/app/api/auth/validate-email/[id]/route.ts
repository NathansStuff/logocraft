import { NextRequest, NextResponse } from 'next/server';

import { validateUserEmailHandler } from '@/features/user/server/userController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => validateUserEmailHandler(req));
}
