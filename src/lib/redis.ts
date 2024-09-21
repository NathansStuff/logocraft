import Redis from 'ioredis';

import { env, REDIS_ENABLED } from '@/constants';

// Initialize Redis client outside the handler to allow reuse across invocations
let redisClient: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (REDIS_ENABLED !== 'true') {
    console.log('Redis is disabled in this environment.');
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis({
      host: env.REDIS_HOST,
      port: parseInt(env.REDIS_PORT || '6379', 10),
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }
  return redisClient;
}
