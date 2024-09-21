import { NextRequest, NextResponse } from 'next/server';

import { CreateLogResponse } from '@/features/log/types/CreateLogResponse';
import { Log } from '@/features/log/types/Log';
import { ResponseCode } from '@/types/ResponseCode';

import { createLogService } from './logService';

// Handler to create a new Log
export async function createLogHandler(req: NextRequest): Promise<NextResponse<CreateLogResponse>> {
  const data = await req.json();
  const safeBody = Log.parse(data);
  await createLogService(safeBody);
  return NextResponse.json({ isValid: true }, { status: ResponseCode.OK });
}
