import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Function is repsonsible for performing aync requests to DB.
export const fetchUserData = createAsyncThunk(
  'fetchUserData',
  async () => {
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
      return data;
    } catch (error) {
      console.log('error from get request within fetchUserData', error);
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: 'userdata',
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
        state.userData = action.payload;
        // If the fetch is successful the payload will be assigned to the userFound const.
        // Looking at the routes res.locals if being sent in the response in dashboard router even though the data is on res.locals.userFound.
        const userFound = action.payload.userFound;
        // This might be redundant but if userFound exists
        if (userFound) {
        // If user exists state.userName will be assigned to the userFound.email and grossEarnings to estimatedIncome.
          state.userName = userFound.email;
          state.grossEarnings = userFound.estimatedIncome;   
        }
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});