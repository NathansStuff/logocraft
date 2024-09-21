import { NextRequest, NextResponse } from 'next/server';

import {
  deleteAccountHandler,
  getAccountHandler,
  updateAccountHandler,
} from '@/features/account/server/accountController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

async function getHandler(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getAccountHandler(req));
}

async function updateHandler(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => updateAccountHandler(req));
}

async function deleteHandler(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => deleteAccountHandler(req));
}

export { deleteHandler as DELETE, getHandler as GET, updateHandler as PUT };
