import { ModelGenerator, wrapWithConnection } from '@operation-firefly/mongodb-package';
import { createServerLogService } from '@/features/log/server/logService';
import { ELogStatus } from '@/features/log/types/ELogStatus';
import { ELogType } from '@/features/log/types/ELogType';
import { User } from '../types/User';
import { Log } from '@/features/log/types/Log';
import { UserPartial, UserWithId } from '@/features/user/types/User';
import { MongoDB } from '@/lib/mongodb';
import { BadRequestError } from '@operation-firefly/error-handling';

import { ConvertZodToMongoose } from '@operation-firefly/mongodb-package';

const userSchema = ConvertZodToMongoose(User);
const UserModel = ModelGenerator<User>('User', userSchema);

const baseUserDal = {
  // Get a User by Stripe Customer ID
  async getUserByStripeCustomerId(stripeCustomerId: string): Promise<UserWithId | null> {
    const result = await UserModel.findOne({ stripeCustomerId });
    return result;
  },

  // Update a User
  async updateUserById(id: string, user: UserPartial, ipAddress?: string | null): Promise<UserWithId> {
    const result = await UserModel.findByIdAndUpdate(id, user, { new: true });
    if (!result) {
      throw new BadRequestError('User not found');
    }
    const log: Log = {
      userId: result._id,
      action: ELogType.USER_UPDATE,
      status: ELogStatus.SUCCESS,
      additionalInfo: { updatedFields: Object.keys(user) },
      ipAddress: ipAddress ?? null,
    };
    await createServerLogService(log);
    return result;
  },

  // Get User by Email
  async getUserByEmail(email: string): Promise<UserWithId | null> {
    const result = await UserModel.findOne({ email });
    return result ? result.toObject() : null;
  },

  // Get Users With Most Sparks
  async getTopUsersWithSparks(): Promise<UserWithId[]> {
    const result = await UserModel.find({ sparksUsed: { $gt: 0 } })
      .sort({ sparksUsed: -1 })
      .limit(3);
    return result;
  },
};

// Wrap the DAL with connection handling and export
export const UserDal = wrapWithConnection<User, UserWithId>(baseUserDal, MongoDB, UserModel);
