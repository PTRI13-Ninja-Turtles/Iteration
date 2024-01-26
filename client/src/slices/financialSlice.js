import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  transactions: [],
  status: 'idle',
  error: null
};


// Action types: 'deduction', 'earning'

// Async Thunk functions for fetch requests
  // post request add earning data to database 
  // post request add deduction data to database

  // data shape for earningData:
    // amount: 0,
    // source: '',
    // timestamp: '',
    // type: 'earning',
    // medicareTax: 0,
    // stateTax: 0,
    // ssiTax: 0,
    // federalTax: 0,

export const postEarning = createAsyncThunk(
  'postEarning',
   async () => {
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
      const data = await response.json();
      console.log('Response postEarning thunk, financialSlice: ', data);
      // data architecture for promise response (data)
          // userTransactionData: 
          // estimatedIncome,
          // businessExpenses,
          // medicareTax: medicare,
          // ssiTax: ssi,
          // fedTax: fed,
          // stateTax,
          // $push: incomes: 
                          // amount: 0,
                          // source: '',
                          // timestamp: '',
                          // type: 'earning',
                          // medicareTax: 0,
                          // stateTax: 0,
                          // ssiTax: 0,
                          // federalTax: 0,
                          // transMedicare,
                          // transSSI,
                          // transFed, 
                          // transState,

      return data;

    } catch (error) {
      console.log('Error postEarning thunk, financialSlice: ', error);
      return error.message;
    }
  }
);

export const postDeduction = createAsyncThunk(
  'postDeduction',
   async () => {
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
      const data = await response.json();
      console.log('Response postEarning thunk, financialSlice: ', data);
        // data architecture: Same as above except:  // $push: expenses: 
      return data;
    } catch (error) {
      console.log('Error postEarning thunk, financialSlice: ', error);
      return error.message;
    }
  }
);

//financialSlice function
const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    updateTransactions: (state, action) => {
      // transactions object architecture:
      // const newTransaction = {
      //   id: ,
      //   description: ,
      //   amount: ,
      //   medicareTax: ,
      //   stateTax: ,
      //   ssiTax: ,
      //   federalTax:
      // }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEarning.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postEarning.fulfilled, (state, action) => {
        state.status = 'success'
        // Allocate state accordingly
        state.earningData = action.payload;
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
        state.deductionData = action.payload;
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

const postDeduction = () => {
  const token = localStorage.getItem('token');

  setTimeout (() => {

    fetch('http://localhost:3000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(deductionData),
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

        data.userTransactionData.expenses.forEach((deduction) => {
          //SETTING TRANSACTION DATA

          const newExpenseTransaction = {
            id: transactions.length + 1,
            description: `Deduction | ${deduction.source}`,
            amount: `+$${deduction.amount.toFixed(2)}`,
            // timestamp: currentTime.toISOString(),
          };
    
          setTransactions([...transactions, newExpenseTransaction]);


        });
      
      })
      .catch((error) => {
        console.error('Error while fetching transaction data', error);
      });

  }, 0);

};

// ANOTHER HANDLE EVERYTHING SUBMIT - DEDUCTIONS
const handleDeductionSubmit = () => {

  //POST REQUEST HERE 
  const currentTime = new Date();
  const currentMonth = currentTime.toLocaleString('default', {
    month: 'short',
  });
  const deductionAmount = parseFloat(deductionData.amount);

  setDeductionData({
    ...deductionData,
    // timestamp: currentTime.toISOString(),
    amount: deductionAmount
  });

  // TURN STRING TO NUM
 

  // UPDATE GROSS
  setGrossEarnings(
    (prevGrossEarnings) => prevGrossEarnings - deductionAmount
  );

  // CREATE & ADD NEW TRANSACTION
  const newDeductionTransaction = {
    id: transactions.length + 1,
    description: `Deduction | ${deductionData.source}`,
    amount: `-$${deductionAmount.toFixed(2)}`,
    // timestamp: currentTime.toISOString(),
  };

  setTransactions([...transactions, newDeductionTransaction]);

  // UPDATE PIE
  const updatedPieChartData = pieChartData.map((slice) => {
    if (slice.id === 'Deductions') {
      return {
        ...slice,
        value: slice.value + deductionAmount,
      };
    }
    return slice;
  });

  setPieChartData(updatedPieChartData);

  // UPDATE BAR
  const updatedBarChartData = barChartData.map((monthData) => {
    if (monthData.month === currentMonth) {
      return {
        ...monthData,
        deductions: monthData.deductions - deductionAmount,
      };
    }
    return monthData;
  });

  setBarChartData(updatedBarChartData);

  // UPDATE LINE
  const updatedLineChartData = lineChartData.map((lineData) => {
    if (lineData.id === 'Deductions') {
      return {
        ...lineData,
        data: [
          ...lineData.data,
          {
            x: currentMonth,
            y: lineData.data[lineData.data.length - 1].y + deductionAmount,
          },
        ],
      };
    }
    return lineData;
  });

  setLineChartData(updatedLineChartData);

  // RESET FORM
  setDeductionData({
    amount: 0,
    source: '',
    timestamp: '',
    type: 'deduction',
  });
  closeDeductionForm();
};