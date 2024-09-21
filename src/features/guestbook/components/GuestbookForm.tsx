'use client';

import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUserId } from '@/contexts/userSlice';

import { Textarea } from '@/components/ui/textarea';
import { useCreateGuestbookMessage } from '../api/useCreateGuestbookMessage';
import { GuestbookMessageRequest } from '../types/GuestbookMessageRequest';

// Define your schema using Zod
const formSchema = z.object({
  message: z.string().min(1, 'Message is required').max(500, 'Message is too long'),
});

function GuestbookForm(): ReactNode {
  const userId = useAppSelector(selectUserId);
  const mutation = useCreateGuestbookMessage();

  // Use react-hook-form with zodResolver
  const form = useForm<GuestbookMessageRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  // Define submit handler
  async function handleSubmit(data: GuestbookMessageRequest): Promise<void> {
    mutation.mutate(
      {
        userId,
        message: data.message,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex w-full pt-5 flex-col items-center justify-center space-y-8'
      >
        <div className='w-full'>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    id='message'
                    className='h-20'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={mutation.isPending}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}

export default GuestbookForm;
