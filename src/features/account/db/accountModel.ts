import { model, models } from 'mongoose';

import { Account } from '@/features/account/types/Account';

import { accountSchema } from './accountSchema';

export const AccountModel = models.Account || model<Account>('Account', accountSchema);
