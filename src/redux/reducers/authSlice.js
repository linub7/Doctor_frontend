import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    auth: Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAuth, logout, setError } = authSlice.actions;
