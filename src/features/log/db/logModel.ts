import { model, models } from 'mongoose';

import { Log } from '@/features/log/types/Log';

import { logSchema } from './logSchema';

export const LogModel = models.Log || model<Log>('Log', logSchema);
