import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { transactionOwed } from '../../../server/Controllers/CalcController';

// Copied initial state details from dashboard container.

const initialState = {
  userFinData: {},
  earningData: [],
  deductionData: [],
  transactions: [],
  status: 'pending',
  error: null
};


// Action types: 'deduction', 'earning'

// Async Thunk functions for fetch requests
// post request add earning data to database 
// post request add deduction data to database


// In the original dashboard the postEarning also updates the pieChart updates the transaction array and then sets the transactons.
// Original code also pulls out the state.tax from the userTransaction data. This is used in updating pieChart
export const postEarning = createAsyncThunk(
  'postEarning',
  async (earningData, {getState, rejectWithValue}) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(earningData),
      });
      // Check response.
      if(!response.ok) throw new Error('Network response was not ok');
      // Convert data to JSON.
      const data = await response.json();
      console.log('JSON response from post request within postEarning', data);
      return data;
    } catch (error) {
      console.log('error from post request within post earning', error);
      return rejectWithValue(error.message);
    }
  }
);

export const postDeduction = createAsyncThunk(
  'postDeduction',
  async (deductionData, {getState, rejectWithValue}) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(deductionData),
      });
      // Check response.
      if(!response.ok) throw new Error('Network response was not ok');
      // Convert data to JSON.
      const data = await response.json();
      console.log('JSON response from post request within postDeduction', data);
      return data;
    } catch (error) {
      console.log('error from post request within post deduction', error);
      return rejectWithValue(error.message);
    }
  }
);

//financialSlice function
const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    updateEarnings: (state, action) => {
      state.earningData = action.payload;
    },
    updateDeductions: (state, action) => {
      state.deductionData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEarning.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postEarning.fulfilled, (state, action) => {
        state.status = 'success';
        // Once earning is posted to database need to update transactions state from data returned.
        state.userFinData = action.payload;
        state.earningData = action.payload.incomes;
        // Accesses the payload object which has the data necessary to update the transaction state.
        // This is coped from the existing code that creates a newEarningTransaction with somee optimizations.
        const newTransactions = action.payload.userTransactionData.incomes.map((earning) => ({
          id: state.transactions.length + 1,
          description: `Earning | ${earning.source}`,
          amount: `+$${earning.amount.toFixed(2)}`,
          medicareTax: `Medicare Tax | ${earning.transMedicare.toFixed(2)}`,
          stateTax: `State Tax | ${earning.transState.toFixed(2)}`,
          ssiTax: `SSI Tax | ${earning.transSSI.toFixed(2)}`,
          federalTax: `Federal Tax | ${earning.transFed.toFixed(2)}`,
          // timestamp: new Date().toISOString(), // to generate timestamp on the frontend?
        }));
        // Use spread operator create new transaction array with newEarningTransaction sequentially at the end of the array.
        state.transactions = [...state.transactions, newTransactions];
      })
      .addCase(postEarning.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occured in financialSlice postEarningThunk: ${action.payload}`;
      })
      .addCase(postDeduction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postDeduction.fulfilled, (state, action) => {
        state.status = 'success';
        // 
        // Once deduction is posted to database need to update transactions state from data returned.
        state.userFinData = action.payload;
        state.deductionData = action.payload.expenses;
        // Accesses the payload object which has the data necessary to update the transaction state.
        // This is coped from the existing code that created newExpenseTransaction with somee optimizations.
        const newTransactions = action.payload.userTransactionData.expenses.map((deduction) => ({
          id: state.transactions.length + 1,
          description: `Deduction | ${deduction.source}`,
          amount: `+$${deduction.amount.toFixed(2)}`,
          // timestamp: new Date().toISOString(), // to generate timestamp on the frontend?
        }));
        // Use spread operator create new transaction array with newEarningTransaction sequentially at the end of the array.
        state.transactions = [...state.transactions, newTransactions];
      })
      .addCase(postDeduction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occured in financialSlice postDeductionThunk: ${action.payload}`;  
      });
  },
});

//export actions from financialSlice:
export const {updateEarnings, updateDeductions} = financialSlice.actions;

//export reducer:
export default financialSlice.reducer;