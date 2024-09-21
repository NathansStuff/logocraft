import { deleteAccountByIdService, getAccountsByUserIdService } from '@/features/account/server/accountService';
import { createUser, deleteUserById, getUserByEmail, getUserById, updateUserById } from '@/features/user/db/userDal';
import { User, UserPartial, UserWithId } from '@/features/user/types/User';

// ***** Basic CRUD *****
// Service to create a user
export async function createUserService(user: User, ipAddress: string): Promise<UserWithId> {
  const newUser = await createUser(user);
  console.log(ipAddress);
  // if (!user.isEmailVerified) {
  //   // Send verification email
  //   const { subject, body } = verifyEmailTemplate(
  //     user.name,
  //     `${NEXT_PUBLIC_BASE_URL}/verify-email/${newUser._id}`
  //   );
  //   const emailTemplate: Email = {
  //     to: user.email,
  //     subject,
  //     body,
  //     userId: newUser._id,
  //     accountId: null,
  //     ipAddress,
  //   };
  //   await sendEmail(emailTemplate);
  // }

  return newUser;
}

// Service to get a user by ID
export async function getUserByIdService(id: string): Promise<UserWithId | null> {
  return await getUserById(id);
}

// Service to update a user by ID
export async function updateUserByIdService(
  id: string,
  user: UserPartial,
  ipAddress?: string | null
): Promise<UserWithId | null> {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    return null;
  }

  // Check if there are new one-time purchases
  const newPurchases = user.oneTimePurchases?.filter((purchase) => !existingUser.oneTimePurchases.includes(purchase));

  const updatedUser = await updateUserById(id, user, ipAddress);

  // If there are new purchases, send the confirmation email
  if (newPurchases && newPurchases.length > 0) {
    // for (const purchase of newPurchases) {
    //   const product = products.find(prod => prod.productId === purchase);
    //   if (product) {
    //     const { subject, body } = purchaseConfirmationEmailTemplate(
    //       existingUser.name,
    //       product.name,
    //       `${NEXT_PUBLIC_BASE_URL}/view-product/${product.productId}`
    //     );
    //     const emailTemplate: Email = {
    //       to: existingUser.email,
    //       subject,
    //       body,
    //       userId: updatedUser._id,
    //       accountId: null,
    //       ipAddress: ipAddress ?? null,
    //     };
    //     await sendEmail(emailTemplate);
    //   }
    // }
  }

  return updatedUser;
}
// Service to delete a user by ID
export async function deleteUserByIdService(id: string): Promise<void> {
  return await deleteUserById(id);
}

// ***** Additional Functions *****
// Service to find or create a user by email
export async function findOrCreateUserByEmail(email: string, user: User, ipAddress: string): Promise<UserWithId> {
  let existingUser = await getUserByEmail(email);
  if (!existingUser) {
    existingUser = await createUserService(user, ipAddress);
  }
  return existingUser;
}

// Service to get a user by Email
export async function getUserByEmailService(email: string): Promise<UserWithId | null> {
  return await getUserByEmail(email);
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
  await deleteUserById(userId);
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
// export async function resendEmailVerificationService(
//   userId: string,
//   ipAddress: string
// ): Promise<void> {
//   const user = await getUserByIdService(userId);
//   if (!user) {
//     return;
//   }

//   const { subject, body } = resendEmailVerificationTemplate(
//     user.name,
//     `${NEXT_PUBLIC_BASE_URL}/verify-email/${userId}`
//   );
//   const emailTemplate: Email = {
//     to: user.email,
//     subject,
//     body,
//     userId: user._id,
//     accountId: null,
//     ipAddress,
//   };
//   await sendEmail(emailTemplate);
// }
