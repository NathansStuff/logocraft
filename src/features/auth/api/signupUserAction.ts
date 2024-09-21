import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { SignupFormRequest } from '../types/SignupFormRequest';

import { postUserSignupForm } from './postUserSignupForm';

export async function signupUserAction(form: SignupFormRequest): Promise<boolean> {
  const loading = toast.loading('Creating account...');
  const user = await postUserSignupForm(form);
  if (user) {
    await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    toast.dismiss(loading);
    toast.success('Account created!');
    return true;
  }

  toast.dismiss(loading);
  toast.error('Error creating account, please try again');
  return false;
}
