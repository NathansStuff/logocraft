import { NextRequest, NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { SparkActionRequest } from '../types/SparkActionRequest';

import { createSparkActionService, getAllSparkActionsService } from './sparkActionService';

export async function createSparkActionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = SparkActionRequest.parse(data);
  const spark = await createSparkActionService(safeBody);
  return NextResponse.json({ spark }, { status: ResponseCode.OK });
}

export async function getAllSparkActionsHandler(): Promise<NextResponse> {
  const sparks = await getAllSparkActionsService();
  return NextResponse.json({ sparks }, { status: ResponseCode.OK });
}
