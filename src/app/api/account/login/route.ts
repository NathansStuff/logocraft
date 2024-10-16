import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { accountLoginHandler } from '@/features/account/server/accountController';
async function postHandler(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => accountLoginHandler(req));
}

export { postHandler as POST };
