import { 
    React, 
    useState 
  } from 'react';
  import {
    Zoom,
    Paper,
    Typography,
    Container,
    CssBaseline
  } from '@material-ui/core';
  
  import { useStyles } from '../../styles/firstStyle';
  import { useHistory } from 'react-router-dom';
  
  export default function Firstpage() {
  
    const classes = useStyles();
    const history = useHistory();
  
    return (
        <div className={classes.root}>
          <CssBaseline />
          <Container>
            <Paper 
              className={classes.paper}
            >
              <Typography 
                variant="h1"
                className={classes.text}
              >
                Education App
              </Typography>
            </Paper>
          </Container>
        </div>
)}