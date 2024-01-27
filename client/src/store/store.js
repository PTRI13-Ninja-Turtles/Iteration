import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../slices/userSlice'; 
import { financialSlice } from '../slices/financialSlice';

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    financialData: financialSlice.reducer
  }
});

export default store;