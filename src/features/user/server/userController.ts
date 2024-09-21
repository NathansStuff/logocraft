import { NextRequest, NextResponse } from 'next/server';

import { User, UserPartial } from '@/features/user/types/User';
import { ResponseCode } from '@/types/ResponseCode';
import { getIpAddress } from '@/utils/getIpAddress';
import { getLastSegment } from '@/utils/getLastSegment';

import {
  createUserService,
  deleteUserAndAccounts,
  deleteUserByIdService,
  findOrCreateUserByEmail,
  getUserByIdService,
  resendEmailVerificationService,
  updateUserByIdService,
  validateUserEmailService,
} from './userService';

// ***** Basic CRUD *****
// Handler to create a new user
export async function createUserHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = User.parse(data);
  const ipAddress = getIpAddress(req);
  const result = await createUserService(safeBody, ipAddress);
  return NextResponse.json(result, { status: ResponseCode.CREATED });
}

// Handler to get a user by ID
export async function getUserHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const user = await getUserByIdService(id);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: ResponseCode.NOT_FOUND });
  }
  return NextResponse.json(user, { status: ResponseCode.OK });
}

// Handler to update a user by ID
export async function updateUserHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const data = await req.json();
  const safeBody = UserPartial.parse(data);
  const updatedUser = await updateUserByIdService(id, safeBody);
  if (!updatedUser) {
    return NextResponse.json({ message: 'User not found' }, { status: ResponseCode.NOT_FOUND });
  }
  return NextResponse.json(updatedUser, { status: ResponseCode.OK });
}

// Handler to delete a user by ID
export async function deleteUserHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  await deleteUserByIdService(id);
  return NextResponse.json({ message: 'User deleted successfully' }, { status: ResponseCode.OK });
}

// ***** Additional Functions *****
// Handler to find or create a user by email
export async function findOrCreateUserHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = User.parse(data);
  const ipAddress = getIpAddress(req);
  const existingUser = await findOrCreateUserByEmail(safeBody.email, safeBody, ipAddress);
  return NextResponse.json(existingUser, { status: 200 });
}

// Handler to delete a user and all linked accounts
export async function deleteUserAndAccountsHandler(req: NextRequest): Promise<NextResponse> {
  const userId = getLastSegment(req.nextUrl.pathname);
  await deleteUserAndAccounts(userId);
  return NextResponse.json(
    { message: 'User and associated accounts deleted successfully' },
    { status: ResponseCode.OK }
  );
}

// Handler to validate a user's email
export async function validateUserEmailHandler(req: NextRequest): Promise<NextResponse> {
  const userId = getLastSegment(req.nextUrl.pathname);
  const ipAddress = getIpAddress(req);
  const isValid = await validateUserEmailService(userId, ipAddress);
  return NextResponse.json({ isValid }, { status: ResponseCode.OK });
}

// Handler to resend a verification email
export async function resendVerificationEmailHandler(req: NextRequest): Promise<NextResponse> {
  const userId = getLastSegment(req.nextUrl.pathname);
  const ipAddress = getIpAddress(req);
  await resendEmailVerificationService(userId, ipAddress);
  return NextResponse.json({ message: 'Verification email sent' }, { status: ResponseCode.OK });
}
