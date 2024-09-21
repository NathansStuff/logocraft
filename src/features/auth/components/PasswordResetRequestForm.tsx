'use client';

import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { z } from 'zod';

import { LabeledInput } from '@/components/form/LabeledInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form';

import { resetPasswordRequestAction } from '../api/resetPasswordRequestAction';
import { ResetPasswordFormRequest } from '../types/ResetPasswordFormRequest';

function PasswordResetRequestForm(): React.JSX.Element {
  const formSchema = ResetPasswordFormRequest;
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setLoading(true);
    setShowError(false);
    const success = await resetPasswordRequestAction(values);
    setLoading(false);

    if (success) {
      router.push('/reset-password-success');
    } else {
      setShowError(true);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col space-y-4'
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
          {showError && (
            <p className='text-red-500'>
              There was an error resetting your password. Please try again or{' '}
              <Link
                href='/contact'
                className='text-primary underline'
              >
                Contact Support
              </Link>
            </p>
          )}
          {/* Display error message with support link */}
          <Button
            className='w-full'
            variant={form.formState.isValid ? 'default' : 'disabled'}
            disabled={loading}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </>
  );
}

export default PasswordResetRequestForm;
