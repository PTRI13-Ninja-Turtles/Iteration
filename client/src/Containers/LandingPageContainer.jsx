import React from 'react';
import { NavigationInnerBar } from '../Components/MainPageComponents/NavigationInnerBar.jsx';
import { HeroSection } from '../Components/MainPageComponents/HeroSectionComponent.jsx';
import { MainSectionComponent } from '../Components/MainPageComponents/MainSectionComponent.jsx';
import { Box } from '@mui/material';

const LandingPageContainer = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin-left="75px"
      margin-right="75px"
      width="100%"
      className='LandingPageContainer'
      
    >
      <NavigationInnerBar />
      <HeroSection />
      <MainSectionComponent />
    </Box>
  );
};

export default LandingPageContainer;