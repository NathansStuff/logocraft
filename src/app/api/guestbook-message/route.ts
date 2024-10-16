import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import {
  createGuestbookMessageHandler,
  getAllGuestbookMessagesHandler,
} from '@/features/guestbook/server/guestbookMessageController';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createGuestbookMessageHandler(req));
}

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getAllGuestbookMessagesHandler());
}
