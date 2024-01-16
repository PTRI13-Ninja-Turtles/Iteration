import React from 'react';
import { NavigationInnerBar } from '../Components/MainPageComponents/NavigationInnerBar.jsx';
import { HeroSection } from '../Components/MainPageComponents/HeroSectionComponent.jsx';
import { MainSectionComponent } from '../Components/MainPageComponents/MainSectionComponent.jsx';
import { Box } from '@mui/material';
import { StayInformedComponent } from '../Components/MainPageComponents/StayInformedComponent.jsx';

const LandingPageContainer = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      className='LandingPageContainer'
      
    >
      <NavigationInnerBar />
      <HeroSection />
      <MainSectionComponent />
      <StayInformedComponent />
    </Box>
  );
};

export default LandingPageContainer;