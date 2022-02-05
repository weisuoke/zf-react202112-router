import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from './components/Protected'
import Login from './components/Login'
import Post from './components/Post';

const activeStyle = { backgroundColor: 'red' }

ReactDOM.render(
  <BrowserRouter>
    <ul>
      <li>
        <NavLink
          to="/"
          style={({isActive}) => isActive ? activeStyle : {}}
          className={({isActive}) => isActive ? 'active' : ''}
        >
          首页
        </NavLink>
      </li>
      <li><NavLink to="/user">用户管理</NavLink></li>
      <li><NavLink to="/profile">个人中心</NavLink></li>
    </ul>
    <Routes>
      <Route path="/" element={<Home name="zhufeng" />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Protected component={Profile} path={'/profile'}/>}/>
      <Route path="/post/:id" element={<Post />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Navigate to="/" />}/>
    </Routes>
  </BrowserRouter>
  ,document.getElementById('root'));

// Switch => Routes
// component => element
// render => element