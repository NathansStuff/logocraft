import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { CreatePurchaseRequest } from '@/features/stripe/types/CreatePurchaseRequest';
import { ResponseCode } from '@/types/ResponseCode';

import { CancelIncompleteSubscriptionRequest } from '../types/CancelIncompleteSubscriptionRequest';
import { ChangeSubscriptionRequest } from '../types/ChangeSubscriptionRequest';
import { CreateSubscriptionRequest } from '../types/CreateSubscriptionRequest';
import { DeleteSubscriptionRequest } from '../types/DeleteSubscriptionRequest';

import {
  cancelIncompleteSubscription,
  cancelStripeSubscription,
  changeStripeSubscription,
  createPaymentIntent,
  createSubscriptionIntent,
  getStripeEvent,
  handleStripeEventService,
  reenableStripeSubscription,
} from './stripeService';

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

export async function stripeWebhookHandler(req: NextRequest): Promise<NextResponse> {
  const body = await req.text();
  const signature = headers().get('stripe-signature');
  const event = getStripeEvent(signature, body);
  await handleStripeEventService(event);
  return NextResponse.json({ received: true }, { status: ResponseCode.OK });
}

export async function deleteSubscriptionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = DeleteSubscriptionRequest.parse(data);
  await cancelStripeSubscription(safeBody.stripeSubscriptionId);
  return NextResponse.json({ received: true }, { status: ResponseCode.OK });
}

export async function reenableSubscriptionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = DeleteSubscriptionRequest.parse(data);
  await reenableStripeSubscription(safeBody.stripeSubscriptionId);
  return NextResponse.json({ received: true }, { status: ResponseCode.OK });
}

export async function changeSubscriptionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = ChangeSubscriptionRequest.parse(data);
  await changeStripeSubscription(safeBody.stripeSubscriptionId, safeBody.newPriceId, safeBody.oldPriceId);
  return NextResponse.json({ received: true }, { status: ResponseCode.OK });
}

export async function cancelIncompleteSubscriptionHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = CancelIncompleteSubscriptionRequest.parse(data);
  await cancelIncompleteSubscription(safeBody.stripeCustomerId);
  return NextResponse.json({ received: true }, { status: ResponseCode.OK });
}
