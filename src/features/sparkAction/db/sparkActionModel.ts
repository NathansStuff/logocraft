import { model, models } from 'mongoose';

import { SparkAction } from '../types/SparkMeter';

import { sparkActionSchema } from './sparkActionSchema';

export const SparkActionModel = models.SparkAction || model<SparkAction>('SparkAction', sparkActionSchema);
