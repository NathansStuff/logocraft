import { NextRequest, NextResponse } from 'next/server';

import { getIpAddress } from '@/utils/getIpAddress';

import { ContactEmailRequest } from '../types/ContactEmailRequest';

import { sendContactEmail } from './emailerService';

export async function contactEmailHandler(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const request = ContactEmailRequest.parse(body);
  const ipAddress = getIpAddress(req);

  const success = await sendContactEmail(request, ipAddress);
  return NextResponse.json({ success });
}
