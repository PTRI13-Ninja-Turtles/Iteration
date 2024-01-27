import { updateEarnings, postEarning, updateDeductions, postDeduction } from '../slices/financialSlice';


export const handleEarningSubmit = (earningData, dispatch, postEarning) => {
  const earningAmount = parseFloat(earningData.amount);
  
  const currentTime = new Date();
  const currentMonth = currentTime.toLocaleString('default', {month: 'short',});

  // Update Redux earningData in redux
  dispatch(updateEarnings({
    ...earningData,
    amount: earningAmount
  }));
  // Dispatch the Redux action
  dispatch(postEarning(earningData));

  
};

export const handleDeductionSubmit = (deductionData, dispatch, postDeduction) => {
  const deductionAmount = parseFloat(deductionData.amount);
  
  const currentTime = new Date();
  const currentMonth = currentTime.toLocaleString('default', {month: 'short',});

  dispatch(updateDeductions({
    ...deductionData,
    amount: deductionAmount
  }));
};
