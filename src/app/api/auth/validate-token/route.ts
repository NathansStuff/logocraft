import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { validateTokenHandler } from '@/features/account/server/accountController';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => validateTokenHandler(req));
}
