import { BadRequestError } from '@operation-firefly/error-handling';
import { CreateBaseService, FunctionMap } from '@operation-firefly/mongodb-package';

import { env } from '@/constants';
import { deleteAccountByIdService, getAccountsByUserIdService } from '@/features/account/server/accountService';
import { purchaseConfirmationEmailTemplate } from '@/features/email/templates/purchaseConfirmationEmailTemplate';
import { resendEmailVerificationTemplate } from '@/features/email/templates/resendEmailVerificationTemplate';
import { verifyEmailTemplate } from '@/features/email/templates/verifyEmailTemplate';
import { Email } from '@/features/email/types/Email';
import { sendEmail } from '@/features/email/utils/sendEmail';
import { products } from '@/features/product/products';
import { UserDal } from '@/features/user/db/userDal';
import { User, UserPartial, UserWithId } from '@/features/user/types/User';
interface UserService extends FunctionMap {
  create(user: User, ipAddress: string): Promise<UserWithId>;
}

const UserService = CreateBaseService(UserDal) as UserService;
UserService.create = async (user: User, ipAddress: string): Promise<UserWithId> => {
  const newUser = await UserDal.create(user);
  console.log(ipAddress);
  if (!user.isEmailVerified) {
    // Send verification email
    const { subject, body } = verifyEmailTemplate(user.name, `${env.NEXT_PUBLIC_BASE_URL}/verify-email/${newUser._id}`);
    const emailTemplate: Email = {
      to: user.email,
      subject,
      body,
      userId: newUser._id,
      ipAddress,
    };
    await sendEmail(emailTemplate);
  }

  return newUser;
};
UserService.updateById = async (id: string, user: UserPartial, ipAddress?: string | null): Promise<UserWithId> => {
  try {
    const updatedUser = await UserDal.updateById(id, user, ipAddress);

    // Check if there are new one-time purchases
    const existingUser = await UserService.getById(id);
    if (!existingUser) {
      throw new BadRequestError('User not found');
    }

    const newPurchases = user.oneTimePurchases?.filter((purchase) => !existingUser.oneTimePurchases.includes(purchase));

    // If there are new purchases, send the confirmation email
    if (newPurchases && newPurchases.length > 0) {
      for (const purchase of newPurchases) {
        const product = products.find((prod) => prod.productId === purchase);
        if (product) {
          const { subject, body } = purchaseConfirmationEmailTemplate(
            existingUser.name,
            product.name,
            `${env.NEXT_PUBLIC_BASE_URL}/view-product/${product.productId}`
          );
          const emailTemplate: Email = {
            to: existingUser.email,
            subject,
            body,
            userId: updatedUser._id,
            ipAddress: ipAddress ?? null,
          };
          await sendEmail(emailTemplate);
        }
      }
    }

    return updatedUser;
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }
    throw new Error('Failed to update user');
  }
};
UserService.findOrCreateUserByEmail = async (email: string, user: User, ipAddress: string): Promise<UserWithId> => {
  let existingUser = await UserDal.getByEmail(email);
  if (!existingUser) {
    existingUser = await UserService.create(user, ipAddress);
  }
  return existingUser;
};
UserService.deleteById = async (id: string): Promise<void> => {
  // Fetch all accounts linked to the user
  const accounts = await getAccountsByUserIdService(id);

  // Delete all accounts
  for (const account of accounts) {
    await deleteAccountByIdService(account._id.toString());
  }

  // Delete the user
  await UserDal.deleteById(id);
};
UserService.validateUserEmail = async (userId: string, ipAddress: string | null): Promise<boolean> => {
  const user = await UserService.getById(userId);
  if (!user) {
    return false;
  }

  const updatedUser = await UserService.updateById(userId, { isEmailVerified: true }, ipAddress);

  return !!updatedUser;
};
UserService.resendEmailVerification = async (userId: string, ipAddress: string): Promise<void> => {
  const user = await UserService.getById(userId);
  if (!user) {
    return;
  }

  const { subject, body } = resendEmailVerificationTemplate(
    user.name,
    `${env.NEXT_PUBLIC_BASE_URL}/verify-email/${userId}`
  );
  const emailTemplate: Email = {
    to: user.email,
    subject,
    body,
    userId: user._id,
    ipAddress,
  };
  await sendEmail(emailTemplate);
};

UserService.updateUserSpark = async (userId: string, sparksUsed: number): Promise<void> => {
  const user = await UserDal.getById(userId);
  if (!user) {
    return;
  }

  await UserDal.updateById(userId, {
    sparksUsed: user.sparksUsed + sparksUsed,
    credits: {
      sparks: user.credits.sparks - sparksUsed,
    },
  });
};

export { UserService };
