import { model, models } from 'mongoose';

import { GuestbookMessage } from '../types/GuestbookMessage';

import { guestbookMessageSchema } from './guestbookMessageSchema';

export const GuestbookMessageModel =
  models.GuestbookMessage || model<GuestbookMessage>('GuestbookMessage', guestbookMessageSchema);
