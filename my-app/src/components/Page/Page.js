import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

import { useStyles } from '../../styles/pageStyle';
import { fetchFunction }  from '../../functions/fetch';
import Exercises from '../Exercises/Exercises';

export default function Page(props) {
  const [ exercises, setExercises ] = useState([0]);
  const classes = useStyles();

  const handleFunc = async () =>
  {
    const data = {
      'token': props.token
    }

    const token = await fetchFunction(data, '/page');

    if(token.token)
      props.setToken(token);
    else{
      props.setToken('');
      window.location.href='/';
    }
  }

  handleFunc(props);

  console.log('ex: ', exercises);

  return (
    <div className={classes.root}>
      <Container>
        <Grid container component="main" >
        { exercises.map((exercise) => 
            <Exercises 
              token={props.token}
              value={exercise}
              key={exercise}
            />
        )}
        </Grid>
        <Fab
          component="button"
          className={classes.submit}
          onClick={ () => (
            setExercises([ ...exercises, exercises.length ])
          )}
        >
          <AddIcon /> 
        </Fab>
      </Container>
    </div>
  )
}

Page.propTypes = {
    setToken: PropTypes.func.isRequired
}