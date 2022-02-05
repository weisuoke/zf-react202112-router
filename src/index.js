import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, BrowserRouter, Routes, Route} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home name="zhufeng" />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  </BrowserRouter>
  ,document.getElementById('root'));

// Switch => Routes
// component => element
// render => element