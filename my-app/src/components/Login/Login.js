import { 
  React, 
  useState 
} from 'react';
import {
  Avatar,
  Paper,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Snackbar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from '../../styles/loginregStyle';
import { useHistory } from 'react-router-dom';
import { handleFetch } from '../../functions/handleFetch';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState();

  const classes = useStyles();
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      "email": email,
      "password": password
    }

    const res = await handleFetch(data, '/login', 'POST', 'application/json');
    
    if(res.code)
    {
      setMessage(res.message);
      setOpen(true);
    }
    else
      if(res.token)
      {
        setToken(res);
        if(res.token == "administration")
          history.push('/admin');
        else
          history.push('/page');
      }
  }

  return(
    <Grid 
      container 
      component="main" 
      className={classes.root}>
      <CssBaseline />
        <Grid 
          item 
          xs={false} 
          sm={4} 
          md={7} 
          className={classes.image} />
        <Grid 
          item 
          xs={12} 
          sm={8} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square>
          <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography 
            component="h1" 
            variant="h5"
          >
            Sign In
          </Typography>
          <form 
            onSubmit={handleSubmit} 
            className={classes.form} 
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={e => setPassword(e.target.value)} 
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error"> {message} </Alert>
            </Snackbar>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link 
                  href="/signup" 
                  variant="h6"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Link 
                  href="/forgotten_pass" 
                  variant="body2"
                  color="primary"
                >
                  {"* I forgot my password"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
)}