import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ETier } from '@/features/user/types/ETiers';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';

import { RootState } from './store';

export interface IUser {
  primaryId: string; // email or phone
  name?: string;
  profilePicture?: string;
  email?: string;
  phone?: string | null | undefined;
  isEmailVerified: boolean;
  isPhoneVerified?: boolean;
  activeSubscription: boolean;
  accountTier?: ETier;
  stripeCustomerId?: string;
  subscriptionCancelDate?: string | null;
  stripeSubscriptionId?: string | null;
  oneTimePurchases?: string[];
  credits: {
    sparks: number;
  };
  sparksUsed: number;
  sid?: string;
  _id: string;
  currentPlan: SubscriptionPlan | null;
  pendingPlan: SubscriptionPlan | null;
}

export interface IUserSlice extends IUser {
  isAuthenticated: boolean;
}

export const initialUserState: IUserSlice = {
  primaryId: '',
  isAuthenticated: false,
  name: '',
  isEmailVerified: true,
  profilePicture: '',
  email: '',
  phone: '',
  isPhoneVerified: false,
  activeSubscription: false,
  sid: '',
  _id: '',
  currentPlan: null,
  credits: {
    sparks: 0,
  },
  sparksUsed: 0,
  pendingPlan: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSlice>) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialUserState,
    setSubscriptionCancelDate: (state, action: PayloadAction<string | null>) => {
      state.subscriptionCancelDate = action.payload;
    },
    setSubscriptionId(state, action: PayloadAction<string | null>) {
      state.stripeSubscriptionId = action.payload;
    },
    setOneTimePurchases(state, action: PayloadAction<string[]>) {
      state.oneTimePurchases = action.payload;
    },
    setSparkCredit(state, action: PayloadAction<number>) {
      state.credits.sparks += action.payload;
    },
    setNewTokens(state, action: PayloadAction<number>) {
      state.credits.sparks += action.payload;
    },
  },
});

export const {
  setUser,
  logout,
  setSubscriptionCancelDate,
  setSparkCredit,
  setSubscriptionId,
  setOneTimePurchases,
  setNewTokens,
} = userSlice.actions;

export const selectUser = (state: RootState): IUserSlice => state.user;
export const selectIsAuthenticated = (state: RootState): boolean => state.user.isAuthenticated;
export const selectName = (state: RootState): string | undefined => state.user.name;
export const selectProfilePicture = (state: RootState): string => state.user.profilePicture ?? '';
export const selectEmail = (state: RootState): string => state.user.email ?? '';
export const selectPhone = (state: RootState): string | null | undefined => state.user.phone;
export const selectIsEmailVerified = (state: RootState): boolean => state.user.isEmailVerified ?? false;
export const selectIsPhoneVerified = (state: RootState): boolean => state.user.isPhoneVerified ?? false;
export const selectSid = (state: RootState): string => state.user.sid ?? '';
export const selectUserId = (state: RootState): string => state.user._id;

export const userReducer = userSlice.reducer;
