import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/constants';
import { getAccountByEmailService } from '@/features/account/server/accountService';
import { LoginRequest } from '@/features/auth/types/LoginRequest';
import { verifyPassword } from '@/features/auth/utils/auth';
import { getUserByEmailService, updateUserByIdService } from '@/features/user/server/userService';

import { createStripeCustomer } from './serverStripe';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accountActive?: boolean;
      accountTier?: string;
    };
  }

  interface User {
    id: string;
  }
}

interface Account {
  provider: string;
  id?: string;
  userId?: string;
  sub?: string;
  providerAccountId?: string;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid credentials');
        }

        const account = await getAccountByEmailService(credentials.email);
        if (!account) {
          throw new Error('No account found with the entered email');
        }

        if (!account.passwordHash) {
          throw new Error('Account is not a credentials account');
        }

        const isValid = await verifyPassword(credentials.password, account.passwordHash);
        if (!isValid) {
          throw new Error('Password is incorrect');
        }

        const user = await getUserByEmailService(account.email);
        if (!user) {
          throw new Error('User not found');
        }

        return {
          id: account.userId.toString(),
          name: user.name,
          email: account.email,
        };
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user, account }: { user: any; account: Account | null }): Promise<boolean> {
      console.log('signIn callback initiated');

      if (!account || !user.name || !user.email || !account.provider) {
        console.error('Missing required fields', { account, user });
        return false;
      }

      // Determine the provider ID
      const providerId = account.id || account.userId || account.sub || account.providerAccountId;
      if (!providerId) {
        console.error('Provider ID is missing', { account });
        return false;
      }

      console.log('SignIn details', { user, account });

      const body: LoginRequest = {
        name: user.name,
        email: user.email,
        provider: account.provider,
        providerId: providerId, // Correctly using the appropriate field
        imageUrl: user.image || null,
      };

      try {
        console.log('Calling login API', body);
        const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/account/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          console.error('Login API responded with an error', response.status, response.statusText);
          return false;
        }

        const userData = await response.json();
        user.id = userData._id;

        console.log('Login successful', userData);

        // Create Stripe customer if not exists
        if (!userData.stripeCustomerId) {
          const stripeCustomer = await createStripeCustomer(user.email, user.name);
          if (!stripeCustomer) {
            throw new Error('Stripe customer creation failed');
          }
          await updateUserByIdService(user.id, {
            stripeCustomerId: stripeCustomer.id,
          });
        }

        return true;
      } catch (error) {
        console.error('Error during login API call', error);
        return false;
      }
    },
    // async redirect({ url, baseUrl }: { url: string; baseUrl: string }): Promise<string> {
    //   console.log('Redirecting to', url);
    //   // If the URL contains the plan parameters, use it

    //   // Extract query string
    //   console.log('url:', url);
    //   const queryString = url.split('?')[1] ?? '';
    //   const redirectUrl = `${baseUrl}/?${queryString}`;
    //   console.log('Redirecting to', redirectUrl);
    //   return redirectUrl;
    // },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      console.log('Session callback initiated');
      if (session.user) {
        session.user.id = token.id as string;
        session.user.accountActive = token.accountActive as boolean;
        session.user.accountTier = token.accountTier as string;
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: JWT; user: any }): Promise<JWT> {
      console.log('JWT callback initiated');
      if (user) {
        token.id = user.id;
        token.accountActive = user.accountActive;
        token.accountTier = user.accountTier;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
