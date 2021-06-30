import React from 'react';
import { useHistory } from 'react-router-dom';

import { handleFetch }  from '../../functions/handleFetch';

export default function Logout(props) {
  const history = useHistory();
  const handleFunc = async (props) =>
  {
    const data = {
      'token': props.token
    }
    
    const response = await handleFetch(data, '/logout', 'POST', 'application/json');

    if(response.code){
      props.setToken('');
      history.push('/');
    }
  }

  handleFunc(props);

  return( <></> )
}