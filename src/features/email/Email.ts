import { ObjectId } from 'mongodb';

export interface Email {
  to: string;
  subject: string;
  body: string;
  userId: ObjectId | null;
  accountId: ObjectId | null;
  ipAddress: string | null;
}
