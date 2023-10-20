import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/signin">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

export default Home