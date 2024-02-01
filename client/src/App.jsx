
import React from 'react';
import LoginPageContainer from './Containers/LoginPageContainer.jsx';
import DashboardRefactor from './Components/DashboardComponents/dashRefactor.jsx';
import MainPageContainer from './Containers/MainPageContainer.jsx';
import SignupPageContainer from './Containers/SignupPageContainer.jsx';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageContainer />} />
          <Route path="/login" element={<LoginPageContainer />} />
          <Route path="/signup" element={<SignupPageContainer />} />
          <Route path="/dashboard" element={<DashboardRefactor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
