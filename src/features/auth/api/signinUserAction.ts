import { signIn } from 'next-auth/react';

import { LoginFormRequest } from '../types/LoginFormRequest';

export async function signinUserAction(form: LoginFormRequest): Promise<void> {
  try {
    const { email, password } = form;
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  } catch (error) {
    console.error(error);
  }
}
