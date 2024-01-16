import React from 'react';
import { NavigationInnerBar } from '../Components/NavigationInnerBar.jsx'
import { HeroSection } from '../Components/HeroSectionComponent.jsx';

const LandingPageContainer = () => {
  return ( <div className='LandingPageContainer'>
    <NavigationInnerBar />
    <HeroSection />
  </div>
  );


};

export default LandingPageContainer;