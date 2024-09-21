import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import { getRedisClient } from '@/lib/redis';
import { ResponseCode } from '@/types/ResponseCode';
import { getIpAddressNullable } from '@/utils/getIpAddress';

const redisClient = getRedisClient();

export async function rateLimit(req: NextRequest, points: number, duration: number): Promise<NextResponse<unknown>> {
  if (!redisClient) {
    console.log('Rate limiting is disabled because Redis is not available.');
    return NextResponse.next(); // Allow all requests if Redis is disabled
  }

  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points, // Number of points
    duration, // Per second(s)
  });

  const ip = getIpAddressNullable(req);

  if (!ip) {
    return new NextResponse('Unable to determine IP address', { status: ResponseCode.BAD_REQUEST });
  }

  try {
    await rateLimiter.consume(ip);
    return NextResponse.next();
  } catch (rateLimiterRes) {
    return new NextResponse('Too many requests', { status: ResponseCode.TOO_MANY_REQUESTS });
  }
}
