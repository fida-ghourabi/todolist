import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/Auth/SignUp';

import EditTask from './components/EditTask/EditTask';

import SignIn from './components/Auth/SignIn';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  
  return (
    <Router>
      <div className="app">

        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/dashboard/*" element={<Dashboard />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;