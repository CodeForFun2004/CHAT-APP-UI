// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import channelReducer from './slices/channelSlice'; // ✅

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer, // ✅
  },
});
