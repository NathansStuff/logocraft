import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
export interface DisplaySlice {
  isLoaded: boolean;
}

const initialDisplayState: DisplaySlice = {
  isLoaded: true,
};

const displaySlice = createSlice({
  name: 'display',
  initialState: initialDisplayState,
  reducers: {
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setIsLoaded } = displaySlice.actions;

export const selectIsLoaded = (state: RootState): boolean => state.display.isLoaded;

export const displayReducer = displaySlice.reducer;
