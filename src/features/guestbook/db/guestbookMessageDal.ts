import connectMongo from '@/lib/mongodb';

import { GuestbookMessage, GuestbookMessageWithId } from '../types/GuestbookMessage';
import { GuestbookMessageWithUser } from '../types/GuestbookMessageWithUser';

import { GuestbookMessageModel } from './guestbookMessageModel';

// ***** Basic CRUD *****
// Create a Log
export async function createGuestbookMessage(message: GuestbookMessage): Promise<GuestbookMessageWithId> {
  await connectMongo();
  const result = await GuestbookMessageModel.create(message);
  return result;
}

// Get all Logs with user name and email
export async function getAllGuestbookMessagesWithUser(): Promise<GuestbookMessageWithUser[]> {
  await connectMongo();
  const result = await GuestbookMessageModel.find({}).populate('userId', 'name email imageUrl'); // Populate the userId field with name and email
  return result;
}
