import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 

const initialState = {
// ORIGINAL STATE PROPERTIES:
//   amount: 0,
//   source: '',
//   timestamp: '',
//   medicareTax: 0,
//   stateTax: 0,
//   ssiTax: 0,
//   federalTax: 0,
  earningData: {},
  deductionData: {},
  status: 'pending',
  error: null
};


// Action types: 'deduction', 'earning'

// Async Thunk functions for fetch requests
  // post request add earning data to database 
  // post request add deduction data to database

export const postEarning = createAsyncThunk({

});

export const postDeduction = createAsyncThunk({

});

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
        state.status = 'loading'
      })
      .addCase(postEarning.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(postEarning.rejected, (state, action) => {
        state.status = 'failed'
        state.error = `Error occured in financialSlice postEarningThunk: ${action.payload}`
      })
      .addCase(postDeduction.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postDeduction.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(postDeduction.rejected, (state, action) => {
        state.status = 'failed'
        state.error = `Error occured in financialSlice postDeductionThunk: ${action.payload}`  
      })
  }
});

//export actions from financialSlice:
export const {updateEarnings, updateDeductions} = financialSlice.actions;

//export reducer:
export default financialSlice.reducer;




// ORIGINAL CODE:

// const [earningData, setEarningData] = useState({
//     amount: 0,
//     source: '',
//     timestamp: '',
//     type: 'earning',
//     medicareTax: 0,
//     stateTax: 0,
//     ssiTax: 0,
//     federalTax: 0,

//   });
//   const [deductionData, setDeductionData] = useState({
//     amount: 0,
//     source: '',
//     timestamp: '',
//     type: 'deduction',
//   });

const postEarning = () => {
  const token = localStorage.getItem('token');

  setTimeout(()=> {

    fetch('http://localhost:3000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(earningData),
    })
      .then (response => response.json())
      .then (data => {
        const stateTax = (Math.abs(data.userTransactionData.stateTax));
        //DO SOMETHING WITH DATA FROM THE TRANSACTION
        //UPDATE STATE OF THE CHART 

        const updatedPieChartData = [
          { id: 'State Tax', label: 'State Tax', value: stateTax },
          { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.userTransactionData.fedTax)).toFixed(2) },
          { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.userTransactionData.ssiTax)).toFixed(2) },
          { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.userTransactionData.medicareTax)).toFixed(2) },
          { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.userTransactionData.businessExpenses)).toFixed(2) },
          { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.userTransactionData.estimatedIncome)).toFixed(2) },
        ];
          
        setPieChartData(updatedPieChartData);
        console.log ('Result of transaction coming from Dashboard Container', data);

        //ITERATE THROUGH THE TRANSACTION ARRAY AND UPDATE THE STATE.
        data.userTransactionData.incomes.forEach((earning) => {
          //SETTING TRANSACTION DATA

          const newEarningTransaction = {
            id: transactions.length + 1,
            description: `Earning | ${earning.source}`,
            amount: `+$${earning.amount.toFixed(2)}`,
            medicareTax: `Medicare Tax | ${earning.transMedicare.toFixed(2)}`,
            stateTax: `State Tax | ${earning.transState.toFixed(2)}`,
            ssiTax:  `SSI Tax | ${earning.transSSI.toFixed(2)}`,
            federalTax: `Federal Tax | ${earning.transFed.toFixed(2)}`,
          
            // timestamp: currentTime.toISOString(),
          };
      
          setTransactions([...transactions, newEarningTransaction]);


        });


      })
      .catch((error) => {
        console.error('Error while fetching transaction data', error);
      });

  }, 0);

};

//CHECKING DATA TYPE OF EARNING DATA
console.log ('CHECKING DATA TYPE OF EARNING DATA', typeof earningData.amount);
console.log ('CHECKING DATA TYPE OF ded DATA', typeof deductionData.amount);


// REALLY HANDLE EVERYTHING SUBMIT - EARNINGS

const handleEarningSubmit = () => {

  //POST REQUEST HERE 
  const currentTime = new Date();
  const currentMonth = currentTime.toLocaleString('default', {
    month: 'short',
  });

  // TURN STRING TO NUM
  const earningAmount = parseFloat(earningData.amount);


  setEarningData({
    ...earningData,
    // timestamp: currentTime.toISOString(),
    amount: earningAmount
  });

  console.log ('Value of earning data from DashBoard Container', earningData);

    
  // UPDATE GROSS
  setGrossEarnings((prevGrossEarnings) => prevGrossEarnings + earningAmount);

  // CREATE & ADD NEW TRANSACTION
  const newEarningTransaction = {
    id: transactions.length + 1,
    description: `Earning | ${earningData.source}`,
    amount: `+$${earningAmount.toFixed(2)}`,
    // timestamp: currentTime.toISOString(),
  };

  setTransactions([...transactions, newEarningTransaction]);



  // UPDATE PIE
  const updatedPieChartData = pieChartData.map((slice) => {
    if (slice.id === 'Earnings') {
      return {
        ...slice,
        value: slice.value + earningAmount,
      };
    }
    return slice;
  });

  setPieChartData(updatedPieChartData);

  // UPDATE BAR BUT MAKE SURE ITS THE CURRENT MONTH
  const updatedBarChartData = barChartData.map((monthData) => {
    if (monthData.month === currentMonth) {
      return {
        ...monthData,
        earnings: monthData.earnings + earningAmount,
      };
    }
    return monthData;
  });

  setBarChartData(updatedBarChartData);

  // SAME FOR LINE
  const updatedLineChartData = lineChartData.map((lineData) => {
    if (lineData.id === 'Earnings') {
      return {
        ...lineData,
        data: [
          ...lineData.data,
          {
            x: currentMonth,
            y: lineData.data[lineData.data.length - 1].y + earningAmount,
          },
        ],
      };
    }
    return lineData;
  });

  setLineChartData(updatedLineChartData);

  // RESET FORM
  setEarningData({
    amount: 0,
    source: '',
    timestamp: '',
    type:'earning',
  });
  closeEarningForm();
};