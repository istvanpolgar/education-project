import React from 'react';
import PropTypes from 'prop-types';

const url = 'http://localhost:8080';

async function tokenCheck(credentials) {
  return fetch(url + '/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credentials.token}` 
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

export default function Logout(props) {
  const handleFunc = async (props) =>
  {
    const data = {
      'token': props.token
    }
    
    const response = await tokenCheck(data);

    if(response.code){
      props.setToken('');
      window.location.href='/';
    }
  }

  handleFunc(props);

  return(
    <></>
  )
}

Logout.propTypes = {
    setToken: PropTypes.func.isRequired
}