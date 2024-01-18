
import React from 'react';
import MainPageContainer from './Containers/MainPageContainer.jsx';
import LoginPageContainer from './Containers/LoginPageContainer.jsx';
import SignupPageContainer from './Containers/SignupPageContainer.jsx';
import UserDashboardContainer from './Containers/UserDashboardContainer.jsx';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageContainer />} />
          <Route path="/login" element={<LoginPageContainer />} />
          <Route path="/signup" element={<SignupPageContainer />} />
          <Route path="/dashboard" element={<UserDashboardContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
