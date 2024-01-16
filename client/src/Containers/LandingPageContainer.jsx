import React from 'react';
import { NavigationInnerBar } from '../Components/MainPageComponents/NavigationInnerBar.jsx'
import { HeroSection } from '../Components/MainPageComponents/HeroSectionComponent.jsx';
import { MainSectionComponent } from '../Components/MainPageComponents/MainSectionComponent.jsx';

const LandingPageContainer = () => {
  return ( <div className='LandingPageContainer'>
    <NavigationInnerBar />
    <HeroSection />
    <MainSectionComponent />
  </div>
  );


};

export default LandingPageContainer;