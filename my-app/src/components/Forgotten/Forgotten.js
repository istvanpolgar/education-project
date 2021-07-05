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
    Grid,
    Typography,
    Snackbar,
  } from '@material-ui/core';
  import MuiAlert from '@material-ui/lab/Alert';
  import { useStyles } from '../../styles/loginregStyle';
  import { useHistory } from 'react-router-dom';
  import { handleFetch } from '../../functions/handleFetch';
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  export default function Forgotten() {
    const [email, setEmail] = useState();
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
      }
  
      const res = await handleFetch(data, '/forgotten_pass', 'POST', 'application/json');
      
      if(res.code)
      {
        setMessage(res.message);
        setOpen(true);
      }
      else
          history.push('/login');
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
            <Typography 
              component="h1" 
              variant="h5"
            >
              Password reset
            </Typography>
            <Typography 
              component="p" 
              color="primary"
              className={classes.text}
            >
              Forgot your password? Please enter your login email address to create a new password 
              for your user. By clicking on the "Reset Password" button, an e-mail will be sent to your 
              e-mail address, where you can change your password via the provided link.
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
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error"> {message} </Alert>
              </Snackbar>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Reset password
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
  )}