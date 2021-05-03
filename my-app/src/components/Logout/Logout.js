import React from 'react';
import PropTypes from 'prop-types';

import { fetchFunction }  from '../../functions/fetch';

export default function Logout(props) {
  const handleFunc = async (props) =>
  {
    const data = {
      'token': props.token
    }
    
    const response = await fetchFunction(data, '/logout');

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