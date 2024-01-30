import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setFinancialData, setPieChart } from './financialSlice';


// Function is repsonsible for performing aync requests to DB.
export const fetchUserData = createAsyncThunk(
  'fetchUserData',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch ('http://localhost:3000/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('JSON response from get request within fetchUserData', data);
      // This destructures some of the financial data and assigns it to financialSlice state.
      const { userFound } = data;
      const { expenses, incomes, stateTax, fedTax, ssiTax, medicareTax, businessExpenses, estimatedIncome } = userFound;
      // This dispatch will setFinancialData in the financialSlice wehn fetchUserData runs.

      // NEED TO ADD UPDATE TO INITIAL CHARTS
      dispatch(setFinancialData({expenses, incomes}));
      dispatch(setPieChart({stateTax, fedTax, ssiTax, medicareTax, businessExpenses, estimatedIncome}));
      return userFound;
    } catch (error) {
      console.log('error from get request within fetchUserData', error);
      return error.message;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    userName: '',
    grossEarnings: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  // This a property of the createSlice config object that allows you to define additional resources outside of the main reducers object.
  // ExtraReducers can respond to actions that are not specifically associated with the slice.
  extraReducers: (builder) => {
    builder
    // The cases below define how state should be updated in response to actions.
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeded';
        // If the fetch is successful the payload will be assigned to the userFound const.
        state.userData = action.payload;
        // Looking at the routes res.locals if being sent in the response in dashboard router even though the data is on res.locals.userFound.
        state.userName = action.payload.email;
        state.grossEarnings = action.payload.estimatedIncome;   
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;