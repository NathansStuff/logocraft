import { hashPassword } from '@/utils/auth';
import { createAccountService, getAccountByEmailService } from '@/backend/features/account/accountService';
import { createUserService } from '@/backend/features/user/userService';
import { NextRequest, NextResponse } from 'next/server';
import { ResponseCode } from '@/types/ResponseCode';

async function handler(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { email, password } = data;

  try {
    // Check if account already exists
    const existingAccount = await getAccountByEmailService(email);
    if (existingAccount) {
      return NextResponse.json({ error: 'Account already exists' }, { status: ResponseCode.BAD_REQUEST });
    }

    const username = 'username'; // Generate username

    // Create user first
    const newUser = await createUserService({
      email,
      name: username,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Hash password and create account
    const hashedPassword = await hashPassword(password);
    console.log('Hash password', hashedPassword);
    await createAccountService(
      newUser._id,
      'credentials',
      newUser._id.toString(), // Link to user
      email,
      hashedPassword
    );
    console.log('success');
    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: ResponseCode.CREATED });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: ResponseCode.INTERNAL_SERVER_ERROR });
  }
}

export { handler as POST };
