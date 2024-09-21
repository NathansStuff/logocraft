import { NextRequest, NextResponse } from 'next/server';

import { createLogHandler } from '@/features/log/server/logController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createLogHandler(req));
}
