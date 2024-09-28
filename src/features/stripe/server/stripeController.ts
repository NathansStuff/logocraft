import { NextRequest, NextResponse } from 'next/server';

import { BadRequestError } from '@/exceptions';
import { GetPurchasesRequest } from '@/features/product/data/GetPurchasesRequest';
import { CreatePurchaseRequest } from '@/features/stripe/types/CreatePurchaseRequest';
import { ResponseCode } from '@/types/ResponseCode';

import { CancelSubscriptionRequest } from '../types/CancelSubscriptionRequest';
import { CreateSubscriptionRequest } from '../types/CreateSubscriptionRequest';
import { GetSubscriptionIdRequest } from '../types/GetSubscriptionIdRequest';
import { ReEnableSubscriptionRequest } from '../types/ReEnableSubscriptionRequest';
import { UpdateSubscriptionRequest } from '../types/UpdateSubscriptionRequest';

import {
  cancelSubscriptionImmediately,
  createPaymentIntent,
  createSubscriptionIntent,
  getCurrentPlanService,
  getSubscruiptionIdService,
  getSuccessfulChargesByEmail,
  reenableSubscriptionIdService,
  updateSubscriptionService,
} from './stripeService';

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

export async function createSubscriptionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = CreateSubscriptionRequest.parse(data);
  const clientSecret = await createSubscriptionIntent(
    safeBody.email,
    safeBody.priceId,
    safeBody.customerId,
    safeBody.userId
  );
  return NextResponse.json({ clientSecret }, { status: ResponseCode.OK });
}

export async function createCancelSubscriptionImmediateHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = CancelSubscriptionRequest.parse(data);
  const response = await cancelSubscriptionImmediately(safeBody.priceId, safeBody.customerId);
  return NextResponse.json({ response }, { status: ResponseCode.OK });
}

export async function getCurrentPlanHandler(req: NextRequest): Promise<NextResponse> {
  const customerId = req.url.split('?customerId=')[1];
  if (!customerId) {
    throw new BadRequestError('Customer ID is required');
  }
  const response = await getCurrentPlanService(customerId);
  return NextResponse.json({ response }, { status: ResponseCode.OK });
}

export async function getSubscriptionIdHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = GetSubscriptionIdRequest.parse(data);
  const response = await getSubscruiptionIdService(safeBody.customerId);
  return NextResponse.json({ response }, { status: ResponseCode.OK });
}

export async function reenableSubscriptionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = ReEnableSubscriptionRequest.parse(data);
  const response = await reenableSubscriptionIdService(safeBody.customerId, safeBody.userId);
  return NextResponse.json({ response }, { status: ResponseCode.OK });
}

export async function updateSubscriptionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = UpdateSubscriptionRequest.parse(data);
  const response = await updateSubscriptionService(safeBody.userId, safeBody.priceId, safeBody.subscriptionId);
  return NextResponse.json({ response }, { status: ResponseCode.OK });
}
