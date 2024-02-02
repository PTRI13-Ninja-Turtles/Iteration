import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  List,
  ListItem,
  Divider,
  Slider,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { RobotoFontFace } from '@fontsource/roboto';
import { useDispatch, useSelector} from 'react-redux';
import { fetchUserData, } from '../../slices/userSlice';
import { postEarning, postDeduction, openDeductionForm, closeDeductionForm, closeEarningForm, openEarningForm } from '../../slices/financialSlice';
import { createSelector } from '@reduxjs/toolkit';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';

// import store from '../../store/store';

//STATE STATE STATE STATE
const DashboardRefactor = () => {

  const dispatch = useDispatch();
  // Local state to ensure components aren't render prior to data being retrieved.
  const [isLoading, setIsLoading] = useState(true);

  // useEffect will fetch inital user data via thunk being dispatched.
  useEffect(() => {
    dispatch(fetchUserData())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching initial user data with useEffect', error);
      });
  },[]);

  // UI section state objects
  const pieChart = useSelector(state => state.financialData.pieChart);
  const barChart = useSelector(state => state.financialData.barChart);
  const transactions = useSelector(state => state.financialData.transactions);
  const earningForm = useSelector(state => state.financialData.earningForm);
  const deductionForm = useSelector(state => state.financialData.deductionForm);

  console.log('pie chart', pieChart);
  console.log('bar chart', barChart);
  console.log('transactions', transactions);

  const username = useSelector(state => state.userData.username);
  
  // if(!pieChart || !barChart) {
  //   return <div>Loading...</div>
  // }

  const pieChartData = [];
  const barChartData = [];
  const transactionsData = [];

  // console.log('pieChart after useEffect, dashRefactor line 52: ', pieChart);

  //useEffect renders pieChart array to pie chart section of UI. Return statement line: 
  // useEffect(() => {
  //   pieChartData = pieChart;
  //   barChartData = barChart;
  // }, [pieChart, barChart]);


  //useEffect renders transactions array to transaction section of UI. Return statement line: 
  // useEffect(() => {
  //   transactionsData = transactions;
  // }, [transactions]);


 
  const [lineChartData, setLineChartData] = useState([
    {
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
    },
  ]);



  const [sliderValues, setSliderValues] = useState({ 1: 0, 2: 0 });
  const [grossEarnings, setGrossEarnings] = useState(0);
  const [isBarChart, setIsBarChart] = useState(true);
  const [isEarningFormOpen, setIsEarningFormOpen] = useState(false);
  const [isDeductionFormOpen, setIsDeductionFormOpen] = useState(false);


  //HELPER FUNCTIONS FOR CHARTS / FORMS - TRUE / FALSE
  // const isEarningFormOpen = useSelector((state) => state.financialData.earningForm)
  // const isDeductionFormOpen = useSelector((state) => state.financialData.earningForm)

  const toggleChartType = () => {
    setIsBarChart(!isBarChart);
  };

  // const openEarningForm = () => {
  //   setIsEarningFormOpen(true);
  // };

  // const openDeductionForm = () => {
  //   setIsDeductionFormOpen(true);
  // };

  // const closeEarningForm = () => {
  //   setIsEarningFormOpen(false);
  // };

  // const closeDeductionForm = () => {
  //   setIsDeductionFormOpen(false);
  // };



  // RUN ONCE / TRY REDUCE TO ADD ALL PIE SLICES
  useEffect(() => {
    console.log('reduce line 118: ', pieChartData);
    const initialGrossEarnings = pieChartData.reduce(
      (total, slice) => total + slice.value,
      0
    );
    setGrossEarnings(initialGrossEarnings);
  }, []);


  //SLIDER STUFF

  const handleSliderChange = (id, newValue) => {
    setSliderValues({ ...sliderValues, [id]: newValue });
  };

  const renderSlider = (id) => (
    <div key={id} style={styles.projection}>
      <Typography gutterBottom>
        {id === '1' ? 'Earning Projection' : 'Deduction Projection'}
      </Typography>
      <Slider
        style={styles.slider}
        value={sliderValues[id]}
        onChange={(event, newValue) => handleSliderChange(id, newValue)}
        aria-labelledby={`slider-${id}`}
        min={0}
        max={100000}
        step={100}
      />
      <Typography variant="body2">{`$${sliderValues[id]}`}</Typography>
    </div>
  );

  //STYLING FOR COMPONENTS

  const styles = {
    dashboard: {
      padding: '20px',
      margin: '60px',
      backgroundColor: '#EDE7F6',
    },
    header: {
      fontFamily: 'Poppins, sans-serif',
      color: '#673AB7',
      marginBottom: '20px',
    },
    username: {
      position: 'absolute',
      fontFamily: 'Poppins, sans-serif',
      color: '#673AB7',
      top: '80px',
      right: '95px',
      fontSize: '16px',
    },
    chartContainer: {
      height: '400px',
      backgroundColor: '#E8EAF6',
      margin: '20px 0',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0',
    },
    button: {
      margin: '5px',
    },
    formContainer: {
      position: 'fixed',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '30px',
      zIndex: 2,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      width: '400px',
      textAlign: 'center',
      color: '#333',
    },
    closeButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      cursor: 'pointer',
    },
    listContainer: {
      width: '100%',
      backgroundColor: '#D1C4E9',
      padding: '8px',
      right: '10px',
      bottom: '0px',
      maxHeight: '247.5px',
      overflow: 'auto',
    },
    listTitle: {
      padding: '10px',
      backgroundColor: 'white',
      position: 'sticky',
      top: '1px',
      zIndex: 1,
    },
    listContent: {
      maxHeight: 'calc(100% - 58px)',
      overflowY: 'auto',
      marginTop: '7px',
    },
    projectionsContainer: {
      backgroundColor: '#D1C4E9',
      padding: '20px',
      margin: '60px',
      marginTop: '20px',
    },
    projection: {
      fontFamily: 'Poppins, sans-serif',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      backgroundColor: 'white',
    },
    slider: {
      marginTop: '10px',
      color: '#673AB7',
    },
  };

  // state needed to be imported:
  // username
  // lineChartData?

  // :)

  // Helper funcion to handle submission of earning.
  const handleEarningSubmit = (e) => {
    e.preventDefault();

    console.log('inside handEarningSubmit, newEarning: ', e);

    const date = new Date();
    const dateStr = date.toDateString();

    const newEarning = {
      amount: e.target[0].value,
      source: e.target[1].value,
      timestamp: dateStr,
      type: 'earning',
      medicareTax: 0,
      stateTax: 0,
      ssiTax: 0,
      federalTax: 0,
    };

    dispatch(postEarning(newEarning));
    dispatch(closeEarningForm());
  };

  // Helper function to handle submission of deduction. 
  const handleDeductionSubmit = (e) => {
    e.preventDefault();

    console.log('inside handleDeductionSubmit, newDeduction: ', e);

    const date = new Date();
    const dateStr = date.toDateString();

    const newDeduction = {
      amount: e.target[0].value,
      source: e.target[1].value,
      timestamp: dateStr,
      type: 'deduction'
    };

    dispatch(postDeduction(newDeduction));
    dispatch(closeDeductionForm());
  };


  return (
    <div>
      <Paper style={styles.dashboard}>
        <h1 style={styles.header}>Prosper Dashboard</h1>
        <div>
          <div style={styles.username}>Welcome, {username}</div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div style={styles.chartContainer}>
              {isBarChart ? (
                <ResponsiveBar
                  data={barChart}
                  keys={['earnings', 'deductions']}
                  indexBy="month"
                  margin={{ top: 50, right: 40, bottom: 100, left: 40 }}
                  padding={0.3}
                />
              ) : (
                <ResponsiveLine
                  data={lineChartData}
                  margin={{ top: 50, right: 40, bottom: 100, left: 40 }}
                />
              )}
            </div>
            <div style={styles.buttonContainer}>
              <IconButton
                onClick={toggleChartType}
                style={styles.buttonIcon}
                color="white"
              >
                <SwapHorizIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={styles.chartContainer}>
              <ResponsivePie
                data={pieChart}
                margin={{ top: 40, right: 0, bottom: 100, left: 40 }}
                innerRadius={0.5}
                padAngle={2}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'set3' }}
              />
              <Typography
                variant="h6"
                style={{
                  marginTop: '18px',
                  marginLeft: '225px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                YTD Gross Earnings = ${grossEarnings}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <div style={styles.buttonContainer}>
          <Button
            variant="contained"
            style={{
              ...styles.button,
              backgroundColor: 'white',
              color: 'black',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            onClick={() => dispatch(openEarningForm())}
          >
            Record Earning
          </Button>
          <Button
            variant="contained"
            style={{
              ...styles.button,
              backgroundColor: 'white',
              color: 'black',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            onClick={() => dispatch(openDeductionForm())}
          >
            Record Deduction
          </Button>
        </div>
        <List style={styles.listContainer}>
          <div style={styles.listTitle}>
            <Typography variant="h7">Previous Transactions</Typography>
          </div>
          <div style={styles.listContent}>
            {transactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <ListItem style={styles.listItem}>
                  <div style={{ width: '70%', gap: '2rem' }}>
                    {transaction.description} {transaction.amount} {transaction.medicareTax} {transaction.stateTax} {transaction.federalTax} {transaction.ssiTax}
                  </div>
                  <div
                    style={{
                      width: '85%',
                      display: 'inline-block',
                      textAlign: 'right',
                    }}
                  >
                    Timestamp: {transaction.timestamp}
                  </div>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        </List>
      </Paper>
      {earningForm && (
        <div style={styles.formContainer}>
          <IconButton
            style={{ ...styles.closeButton, fontSize: '16px' }}
            color="black"
          >
            X
          </IconButton>
          <h3>Record Earning</h3>
          <form onSubmit={(e) => {console.log('Earning submitted'); handleEarningSubmit(e);}}>
            <div>
              <label htmlFor="amount">Amount: $</label>
              <input
                type="number"
                id="amount"
                // value={e.target.value}
                // onChange={(e) =>
                //   setEarningData({ ...earningData, amount: e.target.value })
                // }
                required
              />
            </div>
            <div>
              <label htmlFor="source">Source (descr.): </label>
              <input
                type="text"
                id="source"
                // value={earningData.source}
                // onChange={(e) =>
                //   setEarningData({ ...earningData, source: e.target.value })
                // }
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {deductionForm && (
        <div style={styles.formContainer}>
          <IconButton
            onClick={() => dispatch(closeDeductionForm())}
            style={{ ...styles.closeButton, fontSize: '16px' }}
            color="black"
          >
            X
          </IconButton>
          <h3>Record Deduction</h3>
          <form onSubmit={(e) => { console.log('Deduction submitted'), handleDeductionSubmit(e);}}>
            <div>
              <label htmlFor="deductionAmount">Amount: $</label>
              <input
                type="number"
                id="deductionAmount"
                // value={deductionData.amount}
                // onChange={(e) =>
                //   setDeductionData({ ...deductionData, amount: e.target.value })
                // }
                required
              />
            </div>
            <div>
              <label htmlFor="deductionSource">Source (descr.): </label>
              <input
                type="text"
                id="deductionSource"
                // value={deductionData.source}
                // onChange={(e) =>
                //   setDeductionData({ ...deductionData, source: e.target.value })
                // }
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <Paper style={styles.projectionsContainer}>
        <h2 style={styles.header}>Projections</h2>
        {Object.keys(sliderValues).map((id) => renderSlider(id))}
      </Paper>
    </div>
  );
};

export default DashboardRefactor;