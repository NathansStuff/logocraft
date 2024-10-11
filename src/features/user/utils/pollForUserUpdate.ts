import { loginUserAction } from '@/features/user/hooks/loginUserAction';
import { User } from '@/features/user/types/User';

export async function pollForUserUpdate(
  userId: string,
  condition: (user: User) => boolean,
  maxAttempts = 10,
  pollInterval = 500
): Promise<User> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
    const updatedUser = await loginUserAction(userId);
    if (condition(updatedUser)) {
      return updatedUser;
    }
  }
  throw new Error('Polling timed out');
}
