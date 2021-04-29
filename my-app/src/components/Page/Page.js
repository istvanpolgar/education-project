import React from 'react';
import PropTypes from 'prop-types';

import { fechFunction }  from '../../functions/fetch';

export default function Page(props) {
  const handleFunc = async (props) =>
  {

    const data = {
      'token': props.token
    }

    const token = await fechFunction(data, '/page');

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