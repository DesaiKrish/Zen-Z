//import logo from './logo.svg';
import './App.css';
import SignupForm from './components/SignupPage.tsx';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import LoginForm from './components/Login.tsx';
import Profile from './components/Profile.tsx';
import Homepage from './components/Homepage.tsx';
import Missions from './components/Missions.tsx';
import Sidebar from './components/ui/Sidebar.tsx';
import Dashboard from './components/dashboard.tsx';
import JournalPage from './components/Journals.tsx';



const App = () => {
  return (
    <div className="App">
      <MotionConfig>
      <Router>
        <Routes>
          {/* home page */}
          <Route path="/home" element={<Homepage  
            username="Krish Desai"
            email="kd@gmail.com"
            profilePhoto="/krishavatar2.jpeg"/>} />

          {/* signUp     */}
          <Route path="/signup" element={<SignupForm />} />

          {/* login */}
          <Route path="/login" element={<LoginForm />} />

          {/* profile */}
          <Route path="/profile" element={<Profile/>}/>
          
          <Route path="/missions" element={<Missions 
            username="Krish Desai"
            email="kd@gmail.com"
            profilePhoto="./krishavatar2.jpeg"
            />
          }/>

          <Route path="/side" element={<Sidebar
          username="Krish Desai"
          profilephoto="./krishavatar2.jpeg"
          />} />

            <Route path="/j" element={<JournalPage />} />

          <Route path='/' element={<Dashboard/>}
          />

        </Routes>
      </Router>
      </MotionConfig>
        </div>
  );
}

export default App;
