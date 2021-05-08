import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
  Fab, 
  Grid, 
  Typography
} from '@material-ui/core';

import {
  Add,
  Send
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';
import { fetchFunction }  from '../../functions/fetch';
import Exercise from '../Exercise/Exercise';
import FormElement from '../FormElement/FormElement';

export default function Page( props ) {
  const [ exercises, setExercises ] = useState([{input: 0, title: -1, nr: 0}]);
  const [ params, setParams ] = useState({
    title: '', 
    class: '', 
    description: '',
    date: '',
    begin:'',
    end: ''
  });
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      'token': props.token,
      'exercises': exercises,
      'params': params
    }

    const res = await fetchFunction(data, '/generate');

    if(res)
      console.log('OK');
    else{
      console.log('NOT OK');
    }
  }

  const handleDelete = (input) => {
    const exs = exercises.filter( ex => ex.input !== input );
    setExercises(exs);
  }

  const handleCallback2 = (data) => {
    setParams( prevParams => (
      { ...params, [data.name]: data.value 
    }));
  }

  const handleCallback = (data) => {
    let new_exercises = [];
    exercises.forEach( ex => { 
      if( ex.input === data.input ) {
        new_exercises.push({ ...ex , title: data.title, nr: data.nr });
      } else
        new_exercises.push(ex);
    })
    setExercises(new_exercises);
  }

  handleFunc(props);

  return (
    <div className={classes.container}>
      <Typography 
        component="h1" 
        variant="h4"
      >
        Please complete the test properties
      </Typography>
      <Grid container component="main" >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormElement 
              title='Test title: ' label='Title' id='title'
              parentCallback={handleCallback2}
            />
            <FormElement 
              title='Class: ' label='Class' id='class'
              parentCallback={handleCallback2}
            />
            <FormElement 
              title='Description: ' label='Description' id='description'
              parentCallback={handleCallback2}
            />
            <FormElement 
              title='Date: ' label='Date' id='date' type='date'
              parentCallback={handleCallback2}
            />
            <FormElement 
              title='Begining: ' label='Begin' id='begin' type='time'
              parentCallback={handleCallback2}
            />
            <FormElement 
              title='Ending: ' label='End' id='end' type='time'
              parentCallback={handleCallback2}
            />
          </Grid>
          <Grid item  xs={12} sm={6}>
            <Grid container>
              <Grid item>
                <Typography 
                  component="h1" 
                  variant="h5"
                >
                  Choose the exercises for your test
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              { exercises.map((ex) => 
                  <Exercise 
                    token={props.token}
                    value={ex.input}
                    key={ex.input}
                    parentCallback={handleCallback}
                    handleDelete={handleDelete}
                  />
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Fab
                  component="button"
                  className={classes.submit}
                  onClick={ () => { setExercises( prevEx => 
                    [...prevEx, {
                      input: prevEx.length,
                      title: -1,
                      nr: 0
                    }])
                  }}
                >
                  <Add /> 
                </Fab>
              </Grid>
              <Grid item>
                <Fab
                  component="button"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  <Send /> 
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

Page.propTypes = {
    setToken: PropTypes.func.isRequired
}