import { NextRequest, NextResponse } from 'next/server';

import { registerUserHandler } from '@/features/auth/server/authController';
import { TryCatchMiddleware } from '@operation-firefly/error-handling';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => registerUserHandler(req));
}
