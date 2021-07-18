import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { Feeling, FeelingState, FeelingStatus, FeelingType } from 'feelings/models/feeling';
import API from 'constants/api';
import { RootState } from 'app/root/store';

type RestFeeling = {
  _id?: string;
  title: string;
  type: string;
  shortDescription: string;
  feelingDescription: string;
  feelingPicture?: {
    fileName: string;
  };
  deletePicture?: boolean
};

const feelingAdapter = createEntityAdapter<Feeling>({
  selectId: feeling => feeling._id
});

const feelingTypeAdapter = createEntityAdapter<FeelingType>({
  selectId: feeling => feeling.code
});

const initialState: FeelingState = {
  feelings: feelingAdapter.getInitialState<FeelingStatus>({
    status: 'idle'
  }),
  deleteStatus: 'idle',
  feelingTypes: feelingTypeAdapter.getInitialState(),
  feelingUpsertStatus: 'idle',
  feelingFecthStatus: 'idle',
  selectedFeeling: null
};

export const fetchFeelings = createAsyncThunk<Feeling[]>('feeling/fetchFeelings', async () => {
  const {
    data: { feelings }
  } = await axios(`${API.url}/feelings`);
  return feelings;
});

export const fetchFeelingTypes = createAsyncThunk<FeelingType[]>('feeling/fetchFeelingTypes', async () => {
  const {
    data: { feelingTypes }
  } = await axios(`${API.url}/feeling_types`);
  return feelingTypes;
});

export const deleteFeeling = createAsyncThunk<string, { identifier: string }>('feeling/deleteFeeling', async ({ identifier }) => {
  await axios({ url: `${API.url}/feelings/${identifier}`, method: 'DELETE' });
  return identifier;
});

export const fetchFeeling = createAsyncThunk<Feeling, { identifier: string }>('feeling/fetchFeeling', async ({ identifier }) => {
  const { data: { feeling } } = await axios({ url: `${API.url}/feelings/${identifier}`, method: 'GET' });
  const castedFeeling = feeling as Feeling;
  if (castedFeeling.feelingPicture) {
    const { data: { url } } = await axios({ url: `${API.url}/files/${castedFeeling.feelingPicture.fileName}`, method: 'GET' });
    castedFeeling.feelingPicture.fileName = url;
  }
  return castedFeeling;
});

export const createOrUpdateFeeling = createAsyncThunk<boolean, { feeling: RestFeeling; picture: any }, { state: RootState }>(
  'feeling/createOrUpdateFeeling',
  async ({ feeling, picture }, { getState }) => {
    const feelingTypes = getState().feeling.feelingTypes.entities;
    let url = `${API.url}/feelings`;
    const method = feeling._id === 'new' ? 'POST' : 'PUT';
    if (feeling._id !== 'new') url += `/${feeling._id}`;
    delete feeling._id;

    if (picture && typeof picture !== 'string') {
      const dataImg = new FormData();
      dataImg.append('file', picture);
      const {
        data: { fileName }
      } = await axios({
        method: 'POST',
        url: `${API.url}/files`,
        data: dataImg,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      feeling.feelingPicture = {
        fileName
      };
    }

    feeling.type = feelingTypes[feeling.type]?._id ?? '';
    await axios({
      url,
      method,
      data: feeling
    });
    return true;
  }
);

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
    builder.addCase(fetchFeelingTypes.fulfilled, (state, action) => {
      feelingTypeAdapter.setAll(state.feelingTypes, action.payload);
    });
    builder.addCase(fetchFeelingTypes.rejected, state => {
      feelingTypeAdapter.setAll(state.feelingTypes, []);
    });
    builder.addCase(createOrUpdateFeeling.rejected, state => {
      state.feelingUpsertStatus = 'failed';
    });
    builder.addCase(createOrUpdateFeeling.fulfilled, state => {
      state.feelingUpsertStatus = 'succeeded';
    });
    builder.addCase(createOrUpdateFeeling.pending, state => {
      state.feelingUpsertStatus = 'saving';
    });
    builder.addCase(fetchFeeling.rejected, state => {
      state.feelingFecthStatus = 'failed';
    });
    builder.addCase(fetchFeeling.fulfilled, (state, action) => {
      state.feelingFecthStatus = 'succeeded';
      state.selectedFeeling = action.payload;
    });
    builder.addCase(fetchFeeling.pending, state => {
      state.feelingFecthStatus = 'searching';
    });
  }
});

export default authSlice.reducer;
