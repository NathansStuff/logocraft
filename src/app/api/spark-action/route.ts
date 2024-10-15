import { NextRequest, NextResponse } from 'next/server';

import {
  createSparkActionHandler,
  getMostSparkActionsHandler,
} from '@/features/sparkAction/server/sparkActionController';
import { TryCatchMiddleware } from '@operation-firefly/error-handling';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createSparkActionHandler(req));
}

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getMostSparkActionsHandler());
}
