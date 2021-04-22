import React, { useState } from 'react';
import PropTypes from 'prop-types';

const url = 'http://localhost:8080';

async function logoutUser(credentials) {
    return await fetch(url + '/logout', {
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

export default function Logout({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const data = {
        "email": email,
        "password": password
    }
  
    const token = logoutUser(data);
    console.log(token);
    setEmail("");
    setPassword("");
    setToken(token);
    window.location.href='/';

    return (
      <></>
    )
}

Logout.propTypes = {
    setToken: PropTypes.func.isRequired
}