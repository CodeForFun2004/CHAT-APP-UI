// src/redux/slices/channelSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchUserChannels = createAsyncThunk(
  'channel/fetchUserChannels',
  async (userId) => {
    const res = await axios.get(`/channels/${userId}`);
    return res.data;
  }
);

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channels: [],
    currentChannel: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChannels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchUserChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;
