import { NextRequest, NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { GuestbookMessageRequest } from '../types/GuestbookMessageRequest';

import { createguestbookMessageService, getAllGuestbookMessagesService } from './guestbookMessageService';

export async function createGuestbookMessageHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = GuestbookMessageRequest.parse(data);
  const message = await createguestbookMessageService(safeBody);
  return NextResponse.json({ message }, { status: ResponseCode.OK });
}

export async function getAllGuestbookMessagesHandler(): Promise<NextResponse> {
  const messages = await getAllGuestbookMessagesService();
  return NextResponse.json({ messages }, { status: ResponseCode.OK });
}
