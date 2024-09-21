import { GuestbookMessageWithId } from './GuestbookMessage';

export interface GuestbookMessageWithUser extends Omit<GuestbookMessageWithId, 'userId'> {
  userId: {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
}
