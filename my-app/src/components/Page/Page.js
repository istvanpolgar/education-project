import React from 'react';
import PropTypes from 'prop-types';

const url = 'http://localhost:8080';

async function tokenCheck(credentials) {
  return fetch(url + '/page', {
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

export default function Page(props) {
  const handleFunc = async (props) =>
  {

    const data = {
      'token': props.token
    }

    const token = await tokenCheck(data);

    console.log('Page token: ', token);

    if(token.token)
      props.setToken(token);
    else{
      props.setToken('');
      window.location.href='/';
    }
  }

  handleFunc(props);

  return(
    <div>
      <h1>Almaaaaaaaaaaaaaaaaaa</h1>
    </div>
  )
}

Page.propTypes = {
    setToken: PropTypes.func.isRequired
}