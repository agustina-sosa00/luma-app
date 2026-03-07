import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import appReducer from './app/appSlice';
import { appServices } from '@/services/appServices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    [appServices.reducerPath]: appServices.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appServices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
