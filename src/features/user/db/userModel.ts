import { model, models } from 'mongoose';

import { User } from '../types/User';
import { userSchema } from './userSchema';

export const UserModel = models.User || model<User>('User', userSchema);
