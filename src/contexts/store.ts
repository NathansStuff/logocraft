import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { env } from '@/constants';

import { displayReducer } from './displaySlice';
import { userReducer } from './userSlice';

// Create the root reducer independently to obtain the RootState type
export const rootReducer = combineReducers({
  display: displayReducer,
  user: userReducer,
});

// Define the persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function setupStore() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const middleware: any[] = [];
  if (env.NEXT_PUBLIC_ENVIRONMENT !== 'production' && env.NEXT_PUBLIC_ENVIRONMENT !== 'test') {
    middleware.push(logger);
  }

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middleware),
  });

  const persistor = persistStore(store);

  // Purge persisted state in development mode to avoid hydration issues
  if (env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
    persistor.purge();
  }

  return { store, persistor };
}

export const { store, persistor } = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
