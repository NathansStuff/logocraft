import { NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

async function handler(): Promise<NextResponse> {
  // const data = await req.json();
  // const { email, password } = data;
  // try {
  //   // Check if account already exists
  //   const existingAccount = await getAccountByEmailService(email);
  //   if (existingAccount) {
  //     return NextResponse.json({ error: 'Account already exists' }, { status: ResponseCode.BAD_REQUEST });
  //   }
  //   const username = 'username'; // Generate username
  //   // Create user first
  //   const newUser = await createUserService(
  //     {
  //       email,
  //       name: username,
  //     },
  //     '1' // todo: ip
  //   );
  //   // Hash password and create account
  //   const hashedPassword = await hashPassword(password);
  //   await createAccountService(
  //     newUser._id,
  //     'credentials',
  //     newUser._id.toString(), // Link to user
  //     email,
  //     hashedPassword
  //   );
  //   return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: ResponseCode.CREATED });
  // } catch (error) {
  return NextResponse.json({ error: 'Something went wrong' }, { status: ResponseCode.INTERNAL_SERVER_ERROR });
}

export { handler as POST };
