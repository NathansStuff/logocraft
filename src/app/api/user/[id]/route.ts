import { NextRequest, NextResponse } from 'next/server';

import { deleteUserAndAccountsHandler, getUserHandler, updateUserHandler } from '@/features/user/server/userController';
import { TryCatchMiddleware } from '@operation-firefly/error-handling';
async function getHandler(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getUserHandler(req));
}

async function updateHandler(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => updateUserHandler(req));
}

async function deleteHandler(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => deleteUserAndAccountsHandler(req));
}

export { deleteHandler as DELETE, getHandler as GET, updateHandler as PUT };
