import { ResponseCode } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { SparkActionRequest } from '../types/SparkActionRequest';

import { createSparkActionService, getMostSparkActionsService } from './sparkActionService';

export async function createSparkActionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = SparkActionRequest.parse(data);
  const spark = await createSparkActionService(safeBody);
  return NextResponse.json({ spark }, { status: ResponseCode.OK });
}

export async function getMostSparkActionsHandler(): Promise<NextResponse> {
  const users = await getMostSparkActionsService();
  return NextResponse.json({ users }, { status: ResponseCode.OK });
}
