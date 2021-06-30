import { 
  React, 
  useState 
} from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Avatar,
  Button,
  Paper,
  CssBaseline,
  TextField,
  Link,
  Grid,
  FormControlLabel,
  Typography,
  Checkbox,
  Snackbar
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import { handleFetch }  from '../../functions/handleFetch';
import { useStyles } from '../../styles/loginregStyle';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Registration() {  
  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conf_password, setConfPassword] = useState();
  const [teacher, setTeacher] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState();

  const classes = useStyles();
  const history = useHistory();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

    const reg = await handleFetch(data, '/regist', 'POST', 'application/json');
    
    if(reg.code)
    {
      setMessage(reg.message);
      setOpen(true);
    }
    else
      history.push('/login');
  }

  return (
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
                <FormControlLabel
                  control={
                    <Checkbox 
                      color="default"          
                      onChange={e => setTeacher(e.target.checked)} 
                    />
                    }
                  label="I am a teacher"
                />
              </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error"> {message} </Alert>
            </Snackbar>
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
      </Grid>
    </Grid>
)}