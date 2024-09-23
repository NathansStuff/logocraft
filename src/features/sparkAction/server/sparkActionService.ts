import { ObjectId } from 'mongodb';

import { createSparkAction, getAllSparkActionsWithUser } from '../db/sparkActionDal';
import { SparkActionRequest } from '../types/SparkActionRequest';
import { SparkActionWithUser } from '../types/SparkActionWithUser';
import { SparkAction, SparkActionWithId } from '../types/SparkMeter';

// ***** Basic CRUD *****
// Service to create a Log
export async function createSparkActionService(spark: SparkActionRequest): Promise<SparkActionWithId> {
  const newSparkAction: SparkAction = {
    userId: new ObjectId(spark.userId),
    sparksUsed: spark.sparksUsed,
  };
  const valid = SparkAction.parse(newSparkAction);
  return await createSparkAction(valid);
}

// Service to get all Logs
export async function getAllSparkActionsService(): Promise<SparkActionWithUser[]> {
  return await getAllSparkActionsWithUser();
}
