import { TOKEN_EXPIRY_TIME } from '@/constants';
import { Account, AccountPartial, AccountWithId } from '@/features/account/types/Account';
import { createServerLogService } from '@/features/log/server/logService';
import { ELogStatus } from '@/features/log/types/ELogStatus';
import { ELogType } from '@/features/log/types/ELogType';
import { Log } from '@/features/log/types/Log';
import connectMongo from '@/lib/mongodb';

import { AccountModel } from './accountModel';

// ***** Basic CRUD *****
// Create a Account
export async function createAccount(Account: Account): Promise<AccountWithId> {
  await connectMongo();
  const result = await AccountModel.create(Account);
  return result;
}

// Get a Account by ID
export async function getAccountById(id: string): Promise<AccountWithId> {
  await connectMongo();
  const result = await AccountModel.findById(id);
  return result;
}

// Get all Accounts
export async function getAllAccounts(): Promise<AccountWithId[]> {
  await connectMongo();
  const result = await AccountModel.find({});
  return result;
}

// Update a Account
export async function updateAccountById(
  id: string,
  Account: AccountPartial,
  ipAddress?: string | null
): Promise<AccountWithId> {
  await connectMongo();
  const result = await AccountModel.findByIdAndUpdate(id, Account, {
    new: true,
  });
  const log: Log = {
    userId: null,
    action: ELogType.ACCOUNT_UPDATE,
    status: ELogStatus.SUCCESS,
    additionalInfo: { updatedFields: Object.keys(Account) },
    ipAddress: ipAddress ?? null,
  };
  await createServerLogService(log);

  return result;
}

// Delete a Account
export async function deleteAccountById(id: string): Promise<void> {
  await connectMongo();
  await AccountModel.findByIdAndDelete(id);
}

// ***** Additional Functions *****
// Get an Account by Provider and Provider ID
export async function getAccountByProviderAndProviderId(
  provider: string,
  providerId: string
): Promise<AccountWithId | null> {
  await connectMongo();
  const result = await AccountModel.findOne({ provider, providerId });
  return result ? result.toObject() : null;
}

export async function getAccountByEmail(email: string): Promise<AccountWithId | null> {
  await connectMongo();
  return await AccountModel.findOne({ email });
}

export async function getAccountsByUserId(userId: string): Promise<AccountWithId[]> {
  await connectMongo();
  return await AccountModel.find({ userId });
}

// Save a reset token to the Account
export async function saveResetTokenToAccount(email: string, resetToken: string): Promise<void> {
  await connectMongo();
  const expirationTime = new Date(Date.now() + TOKEN_EXPIRY_TIME);

  await AccountModel.updateOne({ email }, { $set: { resetToken, resetTokenExpiry: expirationTime } });
}

// Check if a reset token is valid
export async function getAccountByResetToken(resetToken: string): Promise<AccountWithId | null> {
  await connectMongo();
  const account = await AccountModel.findOne({ resetToken });
  return account;
}
