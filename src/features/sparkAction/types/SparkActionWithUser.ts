import { SparkActionWithId } from './SparkMeter';

export interface SparkActionWithUser extends Omit<SparkActionWithId, 'userId'> {
  userId: {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
}
