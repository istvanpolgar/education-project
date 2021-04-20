import React, { useState } from 'react';
import Header from '../Header/Header';
import PropTypes from 'prop-types';

import '../../App.css';

const url = 'http://localhost:8080';

async function loginUser(credentials) {
  return fetch(url + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      "user_name": username,
      "password": password
    }

    const token = await loginUser(data);

    setToken(token);
  }

  return(
    <div className="Login">
      <Header />
      <h1>Log In</h1>
      <form id="loginForm" neme="loginForm">
        <label>
          <p>Username</p>
          <input type="text" id="user_name" name="user_name" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <br /><br />
        <div>
          <button type="submit" onClick={handleSubmit}>LOG IN</button>
        </div>
        <br />
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}