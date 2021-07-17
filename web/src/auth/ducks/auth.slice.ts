import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'constants/api';
import { AuthStateSchema } from 'auth/models/login';
import { setAuthToken } from 'app/root/rest';

const initialState: AuthStateSchema = {
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
  username: null
};

export const login = createAsyncThunk<{ accessToken: string; refreshToken: string; username: string }, { username: string }>(
  'auth/login',
  async ({ username }) => {
    const {
      data: { refreshToken, accessToken }
    } = await axios(`${API.url}/access`, {
      method: 'POST',
      data: {
        identifier: username.trim()
      }
    });
    setAuthToken(accessToken);
    return {
      refreshToken,
      accessToken,
      username
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = 'logging';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
    });
    builder.addCase(login.rejected, state => {
      state.status = 'failed';
    });
  }
});

export default authSlice.reducer;
