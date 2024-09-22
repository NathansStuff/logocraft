import { NextRequest, NextResponse } from 'next/server';

import { contactEmailHandler } from '@/features/contactForm/server/emailerController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => contactEmailHandler(req));
}
