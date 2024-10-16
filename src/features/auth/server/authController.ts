import { ResponseCode } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { UserWithId } from '@/features/user/types/User';
import { getIpAddress } from '@/utils/getIpAddress';

import { SignupFormRequest } from '../types/SignupFormRequest';

import { registerUserService } from './authService';

// Handler to create a new Log
export async function registerUserHandler(req: NextRequest): Promise<NextResponse<UserWithId>> {
  const data = await req.json();
  const safeBody = SignupFormRequest.parse(data);
  const ipAddress = getIpAddress(req);
  const user = await registerUserService(safeBody, ipAddress);
  return NextResponse.json(user, { status: ResponseCode.OK });
}
