import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  session: boolean | null;
  authUser: any | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  session: null,
  authUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setUser, logout, setSession, setAuthUser } = authSlice.actions;

export default authSlice.reducer;
