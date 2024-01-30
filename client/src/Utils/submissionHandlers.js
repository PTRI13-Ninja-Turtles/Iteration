import { updateEarnings, postEarning, updateDeductions, postDeduction } from '../slices/financialSlice';
import { useDispatch, useSelector } from 'react-redux';

const dispatch = useDispatch();

export const handleEarningSubmit = (newEarning) => {
  const earningAmount = parseFloat(newEarning.amount);

  // Update Redux earningData in redux, access state with useSelector
  
  // Update barChart earnings in correct month
  const barChart = [
    { month: 'Aug', earnings: 0, deductions: 0 },
    { month: 'Sep', earnings: 0, deductions: 0 },
    { month: 'Oct', earnings: 0, deductions: 0 },
    { month: 'Nov', earnings: 0, deductions: 0 },
    { month: 'Dec', earnings: 0, deductions: 0 },
    { month: 'Jan', earnings: 0, deductions: 0 },
  ];

  // const updatedBarChartData = barChart.map((monthObj) => {
  //   if (monthObj.month === currentMonth) {
  //     return {
  //       ...monthObj,
  //       earnings: monthObj.earnings + earningAmount,
  //     };
  //   }
  //   return monthObj;
  // });
  
  // // Update pieChart earnings slice with new earning amount added
  // const updatedPieChartData = pieChartData.map((slice) => {
  //   if (slice.id === 'Earnings') {
  //     return {
  //       ...slice,
  //       value: slice.value + earningAmount,
  //     };
  //   }
  //   return slice;
  // });


  // Dispatch the Redux action
  dispatch(postEarning(newEarning));

  
};

export const handleDeductionSubmit = (newDeduction) => {

  const deductionAmount = parseFloat(newDeduction);
  
  const currentTime = new Date();
  const currentMonth = currentTime.toLocaleString('default', {month: 'short',});

  // Update Redux earningData in redux, access state with useSelector
  const deductionData = useSelector(state => state.deductionData);

  dispatch(updateDeductions({
    ...deductionData,
    amount: deductionAmount
  }));
  
  // Update barChart earnings in correct month
  const barChart = [
    { month: 'Aug', earnings: 0, deductions: 0 },
    { month: 'Sep', earnings: 0, deductions: 0 },
    { month: 'Oct', earnings: 0, deductions: 0 },
    { month: 'Nov', earnings: 0, deductions: 0 },
    { month: 'Dec', earnings: 0, deductions: 0 },
    { month: 'Jan', earnings: 0, deductions: 0 },
  ];

  const updatedBarChart = barChart.map((monthObj) => {
    if (monthObj.month === currentMonth) {
      return {
        ...monthObj,
        deductions: monthObj.deductions - deductionAmount,
      };
    }
    return monthObj;
  });

  // Update pieChart earnings slice with new earning amount added


  dispatch(postDeduction(deductionData));
};
