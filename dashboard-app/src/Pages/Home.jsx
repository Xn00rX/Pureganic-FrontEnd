import { Routes, Route, Link } from 'react-router-dom';

import { useState } from 'react'

import Login from './Login'
import Dumy from './Dumy'

const Home = () =>{
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignUpClick = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleSignUpClick}>Sign Up</button>

      {showLogin ? (
        <Login />
      ) : (
        <Dumy />
      )}
    </div>
  );
}
export default Home