import React from 'react';

// State used: UserData, UserName, GrossEarnings, PieChartData

const UserData = () => {
    
  //Auth token retrieval
  const token = localStorage.getItem('token');
  console.log ('token data retrieved using localstorage.getItem', token);

  // GET REQUEST TO RETRIEVE USER DATA
  fetch ('http://localhost:3000/dashboard', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    //credentials: 'include',
  })
    .then(response => response.json())
    .then(data => {
      setUserData(data);
      console.log('response from GET request to /dashboard in dashboard', data);

      const username = data.userFound.email;
      const stateTax = (Math.abs(data.userFound.stateTax));
      setUsername(username);

  
      const updatedPieChartData = [
        { id: 'State Tax', label: 'State Tax', value: stateTax },
        { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.userFound.fedTax)) },
        { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.userFound.ssiTax)) },
        { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.userFound.medicareTax)) },
        { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.userFound.businessExpenses))},
        { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.userFound.estimatedIncome))},
      ];
        
      setPieChartData(updatedPieChartData);
  
  
      if (data.userFound) {
        setGrossEarnings(data.userFound.estimatedIncome);
      }
    })
    .catch(err => console.log(err));
};

export default UserData;