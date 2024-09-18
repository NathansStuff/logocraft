import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
export interface DisplaySlice {
  isModalOpen: boolean;
}

const initialDisplayState: DisplaySlice = {
  isModalOpen: false,
};

const displaySlice = createSlice({
  name: 'display',
  initialState: initialDisplayState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setIsModalOpen } = displaySlice.actions;

export const selectIsModalOpen = (state: RootState): boolean => state.display.isModalOpen;

export const displayReducer = displaySlice.reducer;
