import { NextRequest } from 'next/server';

export function getIpAddress(req: NextRequest): string {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  const ipAddress = xForwardedFor ? xForwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip');

  return ipAddress || 'No IP address available';
}

export function getIpAddressNullable(req: NextRequest): string | null {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  const ipAddress = xForwardedFor ? xForwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip');

  return ipAddress || null;
}
