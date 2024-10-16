import { BadRequestError } from '@operation-firefly/error-handling';
import { ObjectId } from 'mongodb';

import { UserService } from '@/features/user/server/userService';
import { UserWithId } from '@/features/user/types/User';

import { createSparkAction } from '../db/sparkActionDal';
import { SparkActionRequest } from '../types/SparkActionRequest';
import { SparkAction, SparkActionWithId } from '../types/SparkMeter';

// ***** Basic CRUD *****
// Service to create a Log
export async function createSparkActionService(spark: SparkActionRequest): Promise<SparkActionWithId> {
  const newSparkAction: SparkAction = {
    userId: new ObjectId(spark.userId),
    sparksUsed: spark.sparksUsed,
  };
  const valid = SparkAction.parse(newSparkAction);

  // Check user has enough credit
  const user = await UserService.getById(spark.userId);
  if (!user) {
    throw new BadRequestError('User not found');
  }

  if (user.credits.sparks < spark.sparksUsed) {
    throw new BadRequestError('Not enough sparks');
  }

  const action = await createSparkAction(valid);

  // No need to await this
  void UserService.updateById(user._id.toString(), spark.sparksUsed);

  return action;
}

// Service to get all Logs
export async function getMostSparkActionsService(): Promise<UserWithId[]> {
  return await UserService.getTopUsersWithSparks();
}
