import { NextRequest, NextResponse } from 'next/server';

import { CreateLogResponse } from '@/features/log/types/CreateLogResponse';
import { ResponseCode } from '@/types/ResponseCode';
import { getIpAddress } from '@/utils/getIpAddress';

import { CreateLogRequest } from '../types/CreateLogRequest';

import { createLogService } from './logService';

// Handler to create a new Log
export async function createLogHandler(req: NextRequest): Promise<NextResponse<CreateLogResponse>> {
  const data = await req.json();
  const safeBody = CreateLogRequest.parse(data);
  const ipAddress = getIpAddress(req);
  await createLogService(safeBody, ipAddress);
  return NextResponse.json({ isValid: true }, { status: ResponseCode.OK });
}
