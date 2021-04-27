import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';

const url = 'http://localhost:8080';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.grey,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'grey',
  },
}));

async function signUpUser(credentials) {
  return fetch(url + '/regist', {
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

export default function Registration() {  
  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conf_password, setConfPassword] = useState();
  const [teacher, setTeacher] = useState();
  const [message, setMessage] = useState();

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();

    setTeacher(false);

    const data = {
      "fname": fname,
      "lname": lname,
      "email": email,
      "password": password,
      "conf_password": conf_password,
      "teacher": teacher
    }

    const reg = await signUpUser(data);
    if(reg.code)
      setMessage(reg.message);
    else
      window.location.href='/login';
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form 
          onSubmit={handleSubmit}
          className={classes.form} 
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                onChange={e => setFName(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={e => setLName(e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                onChange={e => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="conf_password"
                onChange={e => setConfPassword(e.target.value)}
                label="Confirm password"
                type="password"
                id="conf_password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
            <Typography component="div">
              <Grid 
                component="label" 
                container 
                alignItems="center" 
                spacing={1}>
                <Grid item>Student</Grid>
                <Grid item>
                  <Switch 
                    onChange={e => setTeacher(true)} 
                    />
                </Grid>
                <Grid item>Teacher</Grid>
              </Grid>
            </Typography>
            </Grid>
          </Grid>
          <Typography 
            variant="caption" 
            display="block"
            color="error"
          >
            {message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link 
                href="/login" 
                variant="h6"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}