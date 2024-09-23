import connectMongo from '@/lib/mongodb';

import { SparkActionWithUser } from '../types/SparkActionWithUser';
import { SparkAction, SparkActionWithId } from '../types/SparkMeter';

import { SparkActionModel } from './sparkActionModel';

// ***** Basic CRUD *****
// Create a Log
export async function createSparkAction(message: SparkAction): Promise<SparkActionWithId> {
  await connectMongo();
  const result = await SparkActionModel.create(message);
  return result;
}

// Get all Logs with user name and email
export async function getAllSparkActionsWithUser(): Promise<SparkActionWithUser[]> {
  await connectMongo();
  const result = await SparkActionModel.find({}).populate('userId', 'name email imageUrl'); // Populate the userId field with name and email
  return result;
}
