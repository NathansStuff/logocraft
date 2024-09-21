import { NextRequest, NextResponse } from 'next/server';

import { validateTokenHandler } from '@/features/account/server/accountController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => validateTokenHandler(req));
}
