import React from "react";
import LandingPageContainer from "./containers/LandingPageContainer.jsx";
import LoginPageContainer from "./containers/LoginPageContainer.jsx";
import SignupPageContainer from "./containers/SignupPageContainer.jsx";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageContainer />} />
          <Route path="/login" element={<LoginPageContainer />} />
          <Route path="/signup" element={<SignupPageContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
