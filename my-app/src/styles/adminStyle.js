import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    margin: theme.spacing(15,5,5,15),
  },
  title: {
    margin: theme.spacing(5,0),
  },
  submit: {
    width: '30vh',
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    margin: theme.spacing(2),
  },
  }));