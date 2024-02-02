import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Copied initial state details from dashboard container.

const initialState = {
  earningData: {
    amount: 0,
    source: '',
    timestamp: '',
    type: 'earning',
    medicareTax: 0,
    stateTax: 0,
    ssiTax: 0,
    federalTax: 0,
  },
  deductionData: {
    amount: 0,
    source: '',
    timestamp: '',
    type: 'deduction',
  },
  expenses: [],
  incomes: [],
  transactions: [],
  pieChart: [],
  barChart: [
    { month: 'Aug', earnings: 1000, deductions: -500 },
    { month: 'Sep', earnings: 1200, deductions: -600 },
    { month: 'Oct', earnings: 800, deductions: -400 },
    { month: 'Nov', earnings: 1100, deductions: -550 },
    { month: 'Dec', earnings: 900, deductions: -450 },
    { month: 'Jan', earnings: 1300, deductions: -650 },
  ],
  lineChart: [    {
    id: 'Earnings',
    data: [
      { x: 'Aug', y: 1000 },
      { x: 'Sep', y: 1200 },
      { x: 'Oct', y: 800 },
      { x: 'Nov', y: 1100 },
      { x: 'Dec', y: 900 },
      { x: 'Jan', y: 1300 },
    ],
  },
  {
    id: 'Deductions',
    data: [
      { x: 'Aug', y: 500 },
      { x: 'Sep', y: 600 },
      { x: 'Oct', y: 400 },
      { x: 'Nov', y: 550 },
      { x: 'Dec', y: 450 },
      { x: 'Jan', y: 650 },
    ],
  },],
  earningForm: false,
  deductionForm: false,
  status: 'idle',
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
    console.log('postEarning Thunk, finanSlice, e object: ', earningData);
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
export const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    setFinancialData: (state, action) => {
      state.expenses = action.payload.expenses;
      state.incomes = action.payload.incomes;
      // MAYBE SET INITIAL TRANSACTION ARRAY
      state.transactions = [...action.payload.expenses, ...action.payload.incomes].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
    },
    setPieChart: (state, action) => {
      // INITIAL PIE CHART STATER BASED ON USER DATA FROM DB
      state.pieChart = [
        { id: 'State Tax', label: 'State Tax', value: Math.round(action.payload.stateTax) },
        { id: 'Federal Tax', label: 'Federal Tax', value: (Math.round(action.payload.fedTax)) },
        { id: 'SSI Tax', label: 'SSI Tax', value: (Math.round(action.payload.ssiTax)) },
        { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.round(action.payload.medicareTax)) },
        { id: 'Deductions', label: 'Deductions', value: (Math.round(action.payload.businessExpenses))},
        { id: 'Earnings', label: 'Earnings', value: (Math.round(action.payload.estimatedIncome))},
      ];
    },
    updateEarnings: (state, action) => {
      state.earningData = state.earningData.push(action.payload);
    },
    updateDeductions: (state, action) => {
      state.deductionData = state.deductionData.push(action.payload);
    },
    updateEarningForm: (state) => {
      if (state.earningForm === false) {
        state.earnignForm = true;
      }
      if (state.earningForm === true) {
        state.earnignForm = false;
      }
    },
    updateDeductionForm: (state) => {
      if (state.deductionForm === false) {
        state.deductionForm = true;
      }
      if (state.deductionForm === true) {
        state.deductionForm = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEarning.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postEarning.fulfilled, (state, action) => {
        state.status = 'success';
        console.log('after postEarning thunk, action.payload: ', action.payload);
        const userData = action.payload.userTransactionData;
        
        // update barChart with userData- iterate through action.payload.incomes and add incomes[0].amount to the Jan month of barChart[5]
        action.payload.userData.incomes.forEach(earning => {
          state.barChart[5].amount += earning;
        });
        console.log('setPieChart reducer finSlice: ', typeof medicareTax)
        // update pieChart with userData
        const pieChartData = [
          { id: 'State Tax', label: 'State Tax', value: Math.round(userData.stateTax) },
          { id: 'Federal Tax', label: 'Federal Tax', value: (Math.round(userData.fedTax)) },
          { id: 'SSI Tax', label: 'SSI Tax', value: (Math.round(userData.ssiTax)) },
          { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.round(userData.medicareTax)) },
          { id: 'Deductions', label: 'Deductions', value: (Math.round(userData.businessExpenses))},
          { id: 'Earnings', label: 'Earnings', value: (Math.round(userData.estimatedIncome))},
        ];
        state.pieChart = pieChartData;

        // Accesses the payload object which has the data necessary to update the transaction state.
        // This is coped from the existing code that creates a newEarningTransaction with some optimizations.
        const newTransactions = action.payload.userData.incomes.map((earning) => ({
          id: state.transactions.length + 1,
          description: `Earning | ${earning.source}`,
          amount: `+$${earning.amount.toFixed(2)}`,
          medicareTax: `Medicare Tax | ${earning.transMedicare.toFixed(2)}`,
          stateTax: `State Tax | ${earning.transState.toFixed(2)}`,
          ssiTax: `SSI Tax | ${earning.transSSI.toFixed(2)}`,
          federalTax: `Federal Tax | ${earning.transFed.toFixed(2)}`,
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

        // Populate barChart- iterate through action.payload.expenses and add expenses[0].amount to the Jan month of barChart[5]
        action.payload.expenses.forEach(deduction => {
          state.barChart[5].deductions += deduction;
        });

        // update pieChart with userData
        const userData = action.payload;
        const pieChartData = [
          { id: 'State Tax', label: 'State Tax', value: userData.stateTax },
          { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(userData.fedTax.toFixed(2))) },
          { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(userData.ssiTax.toFixed(2))) },
          { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(userData.medicareTax.toFixed(2))) },
          { id: 'Deductions', label: 'Deductions', value: (Math.abs(userData.businessExpenses.toFixed(2)))},
          { id: 'Earnings', label: 'Earnings', value: (Math.abs(userData.estimatedIncome.toFixed(2)))},
        ];
        state.pieChart = pieChartData;
        
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

// Exporting setFinancial data reducer for use in useSlice.
export const { setFinancialData, setPieChart } = financialSlice.actions;

//export reducer:
export default financialSlice.reducer;