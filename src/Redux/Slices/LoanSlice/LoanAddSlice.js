import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURLLocal} from '../../../components/Utils/Api';

export const addLoan = createAsyncThunk('loan/addloan', async credentials => {
  try {
    const response = await axios.post(
      `${baseURLLocal}/api/loan/add-loan`,
      credentials,
    );
    console.log('====>', credentials);
    console.log('Data===>', response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response ? error.response.data : error.message,
    );
  }
});

export const fetchLoans = createAsyncThunk(
  'loan/fetchLoans',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURLLocal}/api/loan/get-loan`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchLoanDetail = createAsyncThunk(
  'loanDetail/fetchLoanDetail',
  async (loanId, thunkAPI) => {
    console.log('data from slice', loanId);
    try {
      const response = await axios.get(
        `${baseURLLocal}/api/loan/get-loan/${loanId}`,
      );
      console.log('data Response', response.data.data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const deleteLoan = createAsyncThunk('loans/deleteLoan', async id => {
  try {
    const response = await axios.delete(`${baseURLLocal}/api/loan/${loanId}`);
    console.log('data Response delete', response.data.Data);
    return response.data.Data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response ? error.response.data : error.message,
    );
  }
});

const LoanAddSlice = createSlice({
  name: 'loan',
  initialState: {
    loans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addLoan.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.push(action.payload);
      })
      .addCase(addLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLoans.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLoanDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.loan = action.payload;
      })
      .addCase(fetchLoanDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.loans = state.loans.filter(loan => loan._id !== action.payload);
      });
  },
});

export default LoanAddSlice.reducer;
