import { env } from '@/constants';
import { deleteAccountByIdService, getAccountsByUserIdService } from '@/features/account/server/accountService';
import { purchaseConfirmationEmailTemplate } from '@/features/email/templates/purchaseConfirmationEmailTemplate';
import { resendEmailVerificationTemplate } from '@/features/email/templates/resendEmailVerificationTemplate';
import { verifyEmailTemplate } from '@/features/email/templates/verifyEmailTemplate';
import { Email } from '@/features/email/types/Email';
import { sendEmail } from '@/features/email/utils/sendEmail';
import { products } from '@/features/product/products';
import { User, UserPartial, UserWithId } from '@/features/user/types/User';
import { UserDal } from '@/features/user/db/userDal';
import { BadRequestError } from '@operation-firefly/error-handling';

// ***** Basic CRUD *****
// Service to create a user
export async function createUserService(user: User, ipAddress: string): Promise<UserWithId> {
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
}

// Service to get a user by ID
export async function getUserByIdService(id: string): Promise<UserWithId | null> {
  return await UserDal.getById(id);
}

// Service to get a user by Stripe Customer ID
export async function getUserByStripeCustomerIdService(stripeCustomerId: string): Promise<UserWithId | null> {
  return await UserDal.getUserByStripeCustomerId(stripeCustomerId);
}

// Service to update a user by ID
export async function updateUserByIdService(
  id: string,
  user: UserPartial,
  ipAddress?: string | null
): Promise<UserWithId> {
  try {
    const updatedUser = await UserDal.updateUserById(id, user, ipAddress);

    // Check if there are new one-time purchases
    const existingUser = await getUserByIdService(id);
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
}

// Service to delete a user by ID
export async function deleteUserByIdService(id: string): Promise<void> {
  return await UserDal.deleteById(id);
}

// ***** Additional Functions *****
// Service to find or create a user by email
export async function findOrCreateUserByEmail(email: string, user: User, ipAddress: string): Promise<UserWithId> {
  let existingUser = await UserDal.getUserByEmail(email);
  if (!existingUser) {
    existingUser = await createUserService(user, ipAddress);
  }
  return existingUser;
}

// Service to get a user by Email
export async function getUserByEmailService(email: string): Promise<UserWithId | null> {
  return await UserDal.getUserByEmail(email);
}

// Service to delete a user and all linked accounts
export async function deleteUserAndAccounts(userId: string): Promise<void> {
  // Fetch all accounts linked to the user
  const accounts = await getAccountsByUserIdService(userId);

  // Delete all accounts
  for (const account of accounts) {
    await deleteAccountByIdService(account._id.toString());
  }

  // Delete the user
  await UserDal.deleteById(userId);
}

// Service to validate a user's email
export async function validateUserEmailService(userId: string, ipAddress: string | null): Promise<boolean> {
  const user = await getUserByIdService(userId);
  if (!user) {
    return false;
  }

  const updatedUser = await updateUserByIdService(userId, { isEmailVerified: true }, ipAddress);

  return !!updatedUser;
}

// Service to resend email verification
export async function resendEmailVerificationService(userId: string, ipAddress: string): Promise<void> {
  const user = await getUserByIdService(userId);
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
}

export async function updateUserSparkAction(userId: string, sparksUsed: number): Promise<void> {
  const user = await UserDal.getById(userId);
  if (!user) {
    return;
  }

  await UserDal.updateUserById(userId, {
    sparksUsed: user.sparksUsed + sparksUsed,
    credits: {
      sparks: user.credits.sparks - sparksUsed,
    },
  });
}

// New service to get top users with sparks
export async function getTopUsersWithSparksService(): Promise<UserWithId[]> {
  return await UserDal.getTopUsersWithSparks();
}
