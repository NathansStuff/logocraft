import connectMongo from '@/lib/mongodb';

import { SparkAction, SparkActionWithId } from '../types/SparkMeter';

import { SparkActionModel } from './sparkActionModel';

// ***** Basic CRUD *****
// Create a Log
export async function createSparkAction(message: SparkAction): Promise<SparkActionWithId> {
  await connectMongo();
  const result = await SparkActionModel.create(message);
  return result;
}
