'use client';

import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { sendContactForm } from '@/features/contactForm/api/sendContactForm';
import { ContactEmailRequest } from '@/features/contactForm/types/ContactEmailRequest';

function ContactForm(): React.JSX.Element {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const user = useAppSelector(selectUser);
  const form = useForm<z.infer<typeof ContactEmailRequest>>({
    resolver: zodResolver(ContactEmailRequest),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      subject: '',
      message: '',
      userId: user?._id || undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof ContactEmailRequest>): Promise<void> {
    const success = await sendContactForm(values);
    if (!success) return;

    setFormSubmitted(true);
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-between p-10'>
      <Card className='w-[500px] max-w-full'>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Send us a message and we will get back to you as soon as possible</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className='flex flex-col space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Name'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{form.formState.errors.name?.message}</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Email'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{form.formState.errors.email?.message}</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='subject'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Subject'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{form.formState.errors.subject?.message}</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Message'
                        {...field}
                        className='h-28'
                      />
                    </FormControl>
                    <FormDescription>{form.formState.errors.message?.message}</FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
            {formSubmitted ? (
              <CardFooter className='flex flex-col justify-between'>
                <h3 className='text-semibold pb-2 text-lg'>Message sent successfully</h3>
                <CardDescription>
                  Thanks for your message, we will send you a reply as soon as possible.
                </CardDescription>
              </CardFooter>
            ) : (
              <CardFooter className='flex justify-between'>
                <Button
                  className='w-full'
                  type='submit'
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </CardFooter>
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default ContactForm;
