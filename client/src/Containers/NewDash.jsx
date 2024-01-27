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
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../slices/userSlice';
import { userSlice } from '../slices/userSlice';



const DashboardPage = () => {
  // Defined dispatch as variable equal to useDispatch().
  const dispatch = useDispatch();


  
  // The userData in userSlice is the entire payload called userFound in original code.
  // The slice titled 'user' is referenced with userData selected to access all userData for initial renders.
  const initialUserData = useSelector((state) => state.user.userData);
    
  // This useEffect calls the fetchUserData on only the initial render. 

  // Need to update PieChart On initial render
  useEffect(() => {
    // This will run fetchUserData 
    dispatch(fetchUserData());

    const PieChartData = [
      { id: 'State Tax', label: 'State Tax', value: initialUserData.stateTax },
      { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(initialUserData.fedTax)) },
      { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(initialUserData.ssiTax)) },
      { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(initialUserData.medicareTax)) },
      { id: 'Deductions', label: 'Deductions', value: (Math.abs(initialUserData.businessExpenses))},
      { id: 'Earnings', label: 'Earnings', value: (Math.abs(initialUserData.estimatedIncome))},
    ];

  }, []);







};