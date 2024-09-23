import { NextRequest, NextResponse } from 'next/server';

import { AccountPartial } from '@/features/account/types/Account';
import { ValidateTokenRequest } from '@/features/account/types/ValidateTokenRequest';
import { LoginRequest } from '@/features/auth/types/LoginRequest';
import { ResetPasswordFormRequest } from '@/features/auth/types/ResetPasswordFormRequest';
import { ResetPasswordRequest } from '@/features/auth/types/ResetPasswordRequest';
import { ResponseCode } from '@/types/ResponseCode';
import { getIpAddress } from '@/utils/getIpAddress';
import { getLastSegment } from '@/utils/getLastSegment';

import {
  deleteAccountByIdService,
  getAccountByIdService,
  handleUserLoginOrCreate,
  resetPasswordAction,
  resetPasswordRequestAction,
  updateAccountByIdService,
  validateToken,
} from './accountService';

// Handler to get a Account by ID
export async function getAccountHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const Account = await getAccountByIdService(id);
  if (!Account) {
    return NextResponse.json({ message: 'Account not found' }, { status: ResponseCode.NOT_FOUND });
  }
  return NextResponse.json(Account, { status: ResponseCode.OK });
}

// Handler to update a Account by ID
export async function updateAccountHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const data = await req.json();
  const safeBody = AccountPartial.parse(data);
  const updatedAccount = await updateAccountByIdService(id, safeBody);
  if (!updatedAccount) {
    return NextResponse.json({ message: 'Account not found' }, { status: ResponseCode.NOT_FOUND });
  }
  return NextResponse.json(updatedAccount, { status: ResponseCode.OK });
}

// Handler to delete a Account by ID
export async function deleteAccountHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  await deleteAccountByIdService(id);
  return NextResponse.json({ message: 'Account deleted successfully' }, { status: ResponseCode.OK });
}

// ***** Additional Functions *****
// Handler to handle user login or account creation
export async function accountLoginHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = LoginRequest.parse(data);
  const ipAddress = getIpAddress(req);
  console.log('accountLoginHandler');
  const user = await handleUserLoginOrCreate(safeBody, ipAddress);
  console.log('accountLoginHandler user', user);
  return NextResponse.json(user, { status: 200 });
}

// Handler to handle reset password request
export async function resetPasswordRequestHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = ResetPasswordFormRequest.parse(data);
  const ipAddress = getIpAddress(req);
  await resetPasswordRequestAction(safeBody.email, ipAddress);
  return NextResponse.json({ message: 'Password reset request received' }, { status: ResponseCode.OK });
}

export async function validateTokenHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = ValidateTokenRequest.parse(data);
  const valid = await validateToken(safeBody.token);
  return NextResponse.json({ isValid: valid }, { status: ResponseCode.OK });
}

export async function resetPasswordActionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = ResetPasswordRequest.parse(data);
  const ipAddress = getIpAddress(req);
  const valid = await resetPasswordAction(safeBody.token, safeBody.password, ipAddress);
  return NextResponse.json({ isValid: valid }, { status: ResponseCode.OK });
}
