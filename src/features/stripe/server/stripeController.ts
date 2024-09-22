import { NextRequest, NextResponse } from 'next/server';

import { GetPurchasesRequest } from '@/features/product/data/GetPurchasesRequest';
import { CreatePurchaseRequest } from '@/features/stripe/types/CreatePurchaseRequest';
import { CreateSubscriptionRequest } from '@/features/stripe/types/CreateSubscriptionRequest';
import { ResponseCode } from '@/types/ResponseCode';

import { createPaymentIntent, createSubscriptionIntent, getSuccessfulChargesByEmail } from './stripeService';

export async function getSuccessfulStripeChargesHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = GetPurchasesRequest.parse(data);
  const successfulCharges = await getSuccessfulChargesByEmail(safeBody.email);
  return NextResponse.json(successfulCharges, { status: ResponseCode.OK });
}

export async function createOneTimePurchaseHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = CreatePurchaseRequest.parse(data);
  const paymentIntent = await createPaymentIntent(
    safeBody.email,
    safeBody.priceId,
    safeBody.customerId,
    safeBody.userId
  );
  return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: ResponseCode.OK });
}

export async function createOSubscriptionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = CreateSubscriptionRequest.parse(data);
  const clientSecret = await createSubscriptionIntent(safeBody.email, safeBody.priceId, safeBody.customerId);
  return NextResponse.json({ clientSecret }, { status: ResponseCode.OK });
}
