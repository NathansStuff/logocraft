import { ObjectId } from 'mongodb';

export interface Email {
  to: string;
  subject: string;
  body: string;
  userId: ObjectId | null;
  ipAddress: string | null;
}
