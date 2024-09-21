import { ObjectId } from 'mongodb';

import { createGuestbookMessage, getAllGuestbookMessagesWithUser } from '../db/guestbookMessageDal';
import { GuestbookMessage, GuestbookMessageWithId } from '../types/GuestbookMessage';
import { GuestbookMessageRequest } from '../types/GuestbookMessageRequest';
import { GuestbookMessageWithUser } from '../types/GuestbookMessageWithUser';

// ***** Basic CRUD *****
// Service to create a Log
export async function createguestbookMessageService(message: GuestbookMessageRequest): Promise<GuestbookMessageWithId> {
  const newMessage: GuestbookMessage = {
    userId: new ObjectId(message.userId),
    message: message.message,
  };
  const valid = GuestbookMessage.parse(newMessage);
  return await createGuestbookMessage(valid);
}

// Service to get all Logs
export async function getAllGuestbookMessagesService(): Promise<GuestbookMessageWithUser[]> {
  return await getAllGuestbookMessagesWithUser();
}
