import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  amount: 0,
  source: '',
  timestamp: '',
  medicareTax: 0,
  stateTax: 0,
  ssiTax: 0,
  federalTax: 0,

  status: 'pending',
  error: null
};

// Sections: Pie Chart, Bar/Line Chart?, Transactions display

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    updatePie: (state, action) => {

    },
    updateBar: (state, action) => {

    },
    updateTransaction: (state, action) => {

    }
  }
});

export default chartSlice.reducers;
