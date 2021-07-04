import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    margin: theme.spacing(5),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    width: '30%',
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    margin: theme.spacing(2),
  },
  table: {
    minWidth: '80vh',
  },
  }));