import { NextRequest, NextResponse } from 'next/server';

import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';
import { createLogHandler } from '@/features/log/db/logController';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createLogHandler(req));
}
