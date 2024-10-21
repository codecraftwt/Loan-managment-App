import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURLLocal} from '../../../components/Utils/Api';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk('auth/signIn', async credentials => {
  const response = await axios.post(
    `${baseURLLocal}/api/auth/signin`,
    credentials,
  );
  console.log('====>', credentials);
  console.log('Data===>', response.data);
  return response.data;
});

export const signUp = createAsyncThunk('auth/signUp', async credentials => {
  const response = await axios.post(
    `${baseURLLocal}/api/auth/signup`,
    credentials,
  );
  console.log('Signup Data===>', response.data);
  return response.data;
});
// Create a slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
