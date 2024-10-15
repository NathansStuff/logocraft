import { NextRequest, NextResponse } from 'next/server';

import { createUserHandler } from '@/features/user/server/userController';
import { TryCatchMiddleware } from '@operation-firefly/error-handling';
async function postHandler(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createUserHandler(req));
}

// async function getHandler(): Promise<NextResponse> {
//   return await TryCatchMiddleware(() => getAllUsersHandler());
// }

export { postHandler as POST };
