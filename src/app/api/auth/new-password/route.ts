import { NextRequest, NextResponse } from 'next/server';

import { resetPasswordActionHandler } from '@/features/account/server/accountController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => resetPasswordActionHandler(req));
}
