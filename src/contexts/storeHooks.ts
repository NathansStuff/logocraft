import {
  useAppDispatch as usePackageDispatch,
  useAppSelector as usePackageSelector,
} from '@operation-firefly/redux-toolbox';
import type { RootState, AppDispatch } from './store';
import { TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = (): AppDispatch => usePackageDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = usePackageSelector<RootState>();
