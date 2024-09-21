'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { z } from 'zod';

import { LabeledInput } from '@/components/form/LabeledInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form';

import { signinUserAction } from '../api/signinUserAction';
import { signupUserAction } from '../api/signupUserAction';
import { LoginFormRequest } from '../types/LoginFormRequest';
import { SignupFormRequest } from '../types/SignupFormRequest';

import GoogleButton from './GoogleButton';

interface AuthFormProps {
  formType: 'signup' | 'login';
}

export default function AuthForm({ formType }: AuthFormProps): React.JSX.Element {
  const isSignup = formType === 'signup';
  const router = useRouter();

  const formSchema = isSignup ? SignupFormRequest : LoginFormRequest;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    if (isSignup) {
      const success = await signupUserAction(values);
      if (success) {
        await getSession();
        router.push('/profile');
      }
    } else {
      await signinUserAction(values);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col space-y-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormControl>
                  <LabeledInput
                    label='Email'
                    id='email'
                    type='email'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>{form.formState.errors.email?.message}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormControl>
                  <LabeledInput
                    label='Password'
                    id='password'
                    type='password'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>{form.formState.errors.password?.message}</FormDescription>
              </FormItem>
            )}
          />
          <Button
            className='w-full'
            variant={form.formState.isValid ? 'default' : 'disabled'}
          >
            {isSignup ? 'Create Account' : 'Login'}
          </Button>
        </form>
      </Form>
      <p className='text-muted-foreground'>OR</p>
      <GoogleButton formType={formType} />
    </>
  );
}
