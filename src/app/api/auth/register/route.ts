import { NextRequest, NextResponse } from 'next/server';

import { registerUserHandler } from '@/features/auth/server/authController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => registerUserHandler(req));
}
