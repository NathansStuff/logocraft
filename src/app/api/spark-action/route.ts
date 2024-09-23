import { NextRequest, NextResponse } from 'next/server';

import {
  createSparkActionHandler,
  getAllSparkActionsHandler,
} from '@/features/sparkAction/server/sparkActionController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createSparkActionHandler(req));
}

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getAllSparkActionsHandler());
}
