import { model, models } from 'mongoose';


import { Account } from '../types/Account';
import { accountSchema } from './accountSchema';

export const AccountModel = models.Account || model<Account>('Account', accountSchema);
