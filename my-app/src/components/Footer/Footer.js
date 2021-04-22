import React from 'react'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { positions } from '@material-ui/system';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/polgar.istvan.33">
        Polgar Istvan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%', // Fix IE 11 issue.
  },
}));

export default function Footer(){
  const classes = useStyles();
  return (
    <Box 
      className={classes.footer}
      mt={8}
      position="fixed"
      bottom={0}
    >
        <Copyright />
    </Box>
  )
}