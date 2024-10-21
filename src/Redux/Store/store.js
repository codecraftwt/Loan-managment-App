import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Slices/AuthSlice/authSlice';
import loanReducer from '../Slices/LoanSlice/LoanAddSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    Loan: loanReducer,
  },
});

export default store;
