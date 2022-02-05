import React from 'react';
import { useNavigate, useLocation } from "../react-router-dom";

function Login(props) {
  let navigate = useNavigate()
  let location = useLocation()
  function login() {
    localStorage.setItem('login', true);
    let to = '/'
    if (location.state) {
      to = location.state.from || '/'
    }
    navigate(to)
  }
  return (
    <button onClick={login}>登录</button>
  )
}

export default Login