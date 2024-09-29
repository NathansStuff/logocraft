import { Account } from '@/features/account/types/Account';
import { createServerLogService } from '@/features/log/server/logService';
import { ELogStatus } from '@/features/log/types/ELogStatus';
import { ELogType } from '@/features/log/types/ELogType';
import { Log } from '@/features/log/types/Log';
import { User, UserPartial, UserWithId } from '@/features/user/types/User';
import connectMongo from '@/lib/mongodb';

import { UserModel } from './userModel';

// ***** Basic CRUD *****
// Create a User
export async function createUser(user: User): Promise<UserWithId> {
  await connectMongo();
  const result = await UserModel.create(user);
  return result;
}

// Get a User by ID
export async function getUserById(id: string): Promise<UserWithId> {
  await connectMongo();
  const result = await UserModel.findById(id);
  return result;
}

// Get all Users
export async function getAllUsers(): Promise<UserWithId[]> {
  await connectMongo();
  const result = await UserModel.find({});
  return result;
}

// Get a User by Stripe Customer ID
export async function getUserByStripeCustomerId(stripeCustomerId: string): Promise<UserWithId | null> {
  await connectMongo();
  const result = await UserModel.findOne({ stripeCustomerId });
  return result;
}

// Update a User
export async function updateUserById(id: string, User: UserPartial, ipAddress?: string | null): Promise<UserWithId> {
  await connectMongo();
  const result = await UserModel.findByIdAndUpdate(id, User, { new: true });
  const log: Log = {
    userId: result._id,
    action: ELogType.USER_UPDATE,
    status: ELogStatus.SUCCESS,
    additionalInfo: { updatedFields: Object.keys(Account) },
    ipAddress: ipAddress ?? null,
  };
  await createServerLogService(log);
  return result;
}

// Delete a User
export async function deleteUserById(id: string): Promise<void> {
  await connectMongo();
  await UserModel.findByIdAndDelete(id);
}

// ***** Additional Functions *****
// Get User by Email
export async function getUserByEmail(email: string): Promise<UserWithId | null> {
  await connectMongo();
  const result = await UserModel.findOne({ email });
  return result ? result.toObject() : null;
}

// Get Users With Most Sparks
export async function getTopUsersWithSparks(): Promise<UserWithId[]> {
  await connectMongo();
  const result = await UserModel.find({ sparksUsed: { $gt: 0 } })
    .sort({ sparksUsed: -1 })
    .limit(3);
  return result;
}
