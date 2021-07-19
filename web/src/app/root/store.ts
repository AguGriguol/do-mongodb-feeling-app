import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth from 'auth/ducks/auth.slice';
import feeling from 'feelings/ducks/feeling.slice';

export const store = configureStore({
  reducer: {
    auth,
    feeling
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
