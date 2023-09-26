import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { colorGenerator } from '../../utils/colorGenerator';
import { BitcoinState, Data, Payload } from './types';

export const fetchBitcoinData = createAsyncThunk<
  Payload,
  undefined,
  { rejectValue: string }
>('bitcoin/getData', async function (_, { rejectWithValue }) {
  try {
    const response = await axios(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );
    console.log('fetch');

    const data = response.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const err = error?.message;
      return rejectWithValue(err);
    }
  }
});

const initialState: BitcoinState = {
  data: {
    bpi: {},
    chartName: '',
    disclaimer: '',
    time: [],
  } as Data,
  isLoading: false,
  error: {
    message: '',
  },
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBitcoinData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBitcoinData.fulfilled, (state, action) => {
      state.isLoading = false;

      for (const [key, value] of Object.entries(action.payload.bpi)) {
        if (state.data.bpi[key]) {
          if (state.data.bpi[key].data.length > 5) {
            state.data.bpi[key].data.shift();
          }
          state.data.bpi[key].data.push(value.rate_float);
        } else {
          state.data.bpi[key] = {
            label: key,
            data: [value.rate_float],
            borderColor: colorGenerator(),
            backgroundColor: colorGenerator(),
          };
        }
      }

      if (state.data.time.length > 5) {
        state.data.time.shift();
      }
      state.data.time.push(action.payload.time.updated);
    });
    builder.addCase(fetchBitcoinData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default counterSlice.reducer;
