import React from 'react'
import {
  Box, 
} from '@material-ui/core';
import { useStyles } from '../../styles/footerStyle';
import Copyright from '../../components/Copyright/Copyright';

export default function Footer() {
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