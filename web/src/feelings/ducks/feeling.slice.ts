import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { Feeling, FeelingState, FeelingStatus } from 'feelings/models/feeling';
import API from 'constants/api';

const feelingAdapter = createEntityAdapter<Feeling>({
  selectId: feeling => feeling._id
});

const initialState: FeelingState = {
  feelings: feelingAdapter.getInitialState<FeelingStatus>({
    status: 'idle'
  }),
  deleteStatus: 'idle'
};

export const fetchFeelings = createAsyncThunk<Feeling[]>('auth/fetchFeelings', async () => {
  const {
    data: { feelings }
  } = await axios(`${API.url}/feelings`);
  return feelings;
});

export const deleteFeeling = createAsyncThunk<string, { identifier: string }>('auth/deleteFeeling', async ({ identifier }) => {
  await axios({ url: `${API.url}/feelings/${identifier}`, method: 'DELETE'});
  return identifier;
});

const authSlice = createSlice({
  name: 'feeling',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFeelings.pending, state => {
      state.feelings.status = 'searching';
    });
    builder.addCase(fetchFeelings.fulfilled, (state, action) => {
      state.feelings.status = 'succeeded';
      feelingAdapter.setAll(state.feelings, action.payload);
    });
    builder.addCase(fetchFeelings.rejected, state => {
      state.feelings.status = 'failed';
    });
    builder.addCase(deleteFeeling.pending, (state, action) => {
      state.deleteStatus = 'deleting';
      feelingAdapter.updateOne(state.feelings, { id: action.meta.arg.identifier, changes: { deleteStatus: 'deleting' } });
    });
    builder.addCase(deleteFeeling.fulfilled, (state, action) => {
      state.deleteStatus = 'succeeded';
      feelingAdapter.removeOne(state.feelings, action.payload);
    });
    builder.addCase(deleteFeeling.rejected, state => {
      state.deleteStatus = 'failed';
    });
  }
});

export default authSlice.reducer;
