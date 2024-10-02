//import logo from './logo.svg';
import './App.css';
import SignupForm from './components/SignupPage.tsx';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
// import HamburgerMenu from './components/HamburgerMenu.tsx';
import Dashboard from './components/dashboard.tsx';
import LoginForm from './components/Login.tsx';

const App = () => {
  return (
    <div className="App">
      <MotionConfig>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />

          <Route path="/login" element={<LoginForm />} />
          
          <Route path="/" element={
            <Dashboard
            username="Krish Desai"
            email="kd@hotmail.com"
            profilePhoto="/krishavatar2.jpeg"
            />
            }/>
            


          {/* <Route path="/hamburger" element={
            <HamburgerMenu 
            userName="Krish Desai" 
            userEmail="kd@hotmail.com" 
            profilePhotoUrl="/krishavatar2.jpeg" 
            />
          }/> */}
        </Routes>
      </Router>
      </MotionConfig>
        </div>
  );
}

export default App;
