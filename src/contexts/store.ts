import { createReduxStore } from '@operation-firefly/redux-toolbox'; // Use your package
import { userReducer } from './userSlice';
import { displayReducer } from './displaySlice';
import { combineReducers } from '@reduxjs/toolkit'; // Application should handle combining reducers

// Step 1: Combine reducers in the application, where types are known
export const rootReducer = combineReducers({
  user: userReducer,
  display: displayReducer,
});

// Step 2: Use the redux-toolbox package to create the store
const { store, persistor } = createReduxStore(
  rootReducer, // Pass combined reducers from the app
  [], // Optionally pass custom middleware
  process.env.NODE_ENV === 'development' // Flag for dev mode
);

// Step 3: Correctly type RootState based on rootReducer
export type RootState = ReturnType<typeof rootReducer>; // Use rootReducer to infer RootState
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
