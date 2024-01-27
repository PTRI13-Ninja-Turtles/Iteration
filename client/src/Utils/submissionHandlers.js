import { updateEarnings, postEarning, updateDeductions, postDeduction } from '../slices/financialSlice';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();

export const handleEarningSubmit = (newEarning) => {
  const earningAmount = parseFloat(newEarning);
  
  const currentTime = new Date();
  const currentMonth = currentTime.toLocaleString('default', {month: 'short',});

  // Update Redux earningData in redux, need to access state with useSelector?
  dispatch(updateEarnings({
    ...earningData,
    amount: earningAmount
  }));
  // Dispatch the Redux action
  dispatch(postEarning(earningData));

  
};

export const handleDeductionSubmit = (newDeduction) => {

  const deductionAmount = parseFloat(newDeduction);
  
  const currentTime = new Date();
  const currentMonth = currentTime.toLocaleString('default', {month: 'short',});

  // Update Redux earningData in redux, need to access state with useSelector?
  dispatch(updateDeductions({
    ...deductionData,
    amount: deductionAmount
  }));

  const barChart = [
    { month: 'Aug', earnings: 0, deductions: 0 },
    { month: 'Sep', earnings: 0, deductions: 0 },
    { month: 'Oct', earnings: 0, deductions: 0 },
    { month: 'Nov', earnings: 0, deductions: 0 },
    { month: 'Dec', earnings: 0, deductions: 0 },
    { month: 'Jan', earnings: 0, deductions: 0 },
  ];

  const updatedBarChartData = barChart.map((monthObj) => {
    if (monthObj.month === currentMonth) {
      return {
        ...monthObj,
        deductions: monthObj.deductions - deductionAmount,
      };
    }
    return monthObj;
  });

};
