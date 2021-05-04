import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
  Fab, 
  Grid, 
  Avatar,
  Typography
} from '@material-ui/core';

import {
  Add,
  FindInPage,
  Send
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';
import { fetchFunction }  from '../../functions/fetch';
import Exercises from '../Exercises/Exercises';

export default function Page(props) {
  const [ inputs, setInput ] = useState([]);
  const [ exercises, setExercise ] = useState([]);
  const [ exNrs, setExNr ] = useState([]);
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

    console.log(e.target);
  }

  const handleCallback = (data) => {
    if(!data.cancel)
    {
      setExercise(exercises => {
        exercises[data.value] = data.exercise;
        return exercises ;
      });
      setExNr(exNrs => {
        exNrs[data.value] = data.nr;
        return exNrs ;
      });
    } 
    else
    {
      setInput( (inputs) => {
        const i = inputs.filter(ex => ex !== data.value);
        return i;
      });
      setExercise( (exercises) => {
        const e = exercises.filter(ex => ex !== data.exercise);
        return e;
      });
      setExNr( (exNrs) => { 
        const n = exNrs.splice(data.value, 1); 
        return n;
      });
    }
    console.log('exercises: ',exercises);
    console.log('nr: ',exNrs);  
  }

  handleFunc(props);

  return (
    <div className={classes.root}>
      <Grid container component="main" >
        <Grid container spacing={2}>
          <Grid item xs={2} sm={1}>
            <Avatar className={classes.avatar}>
              <FindInPage fontSize="large" />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography 
              className={classes.title}
              component="h1" 
              variant="h4"
            >
              Choose the exercises for your test
            </Typography>
          </Grid>
        </Grid>
        <form 
          className={classes.formControl}
          noValidate>
            { inputs.map((nr) => 
                <Exercises 
                  token={props.token}
                  value={nr}
                  key={nr}
                  parentCallback = {handleCallback}
                />
            )}
        </form>
        <Grid container spacing={2}>
          <Grid item>
            <Fab
              component="button"
              className={classes.submit}
              onClick={ () => (
                setInput([ ...inputs, inputs.length ])
              )}
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
    </div>
  )
}

Page.propTypes = {
    setToken: PropTypes.func.isRequired
}