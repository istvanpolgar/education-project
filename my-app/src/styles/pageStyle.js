import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(5),
    },
    container:{
      margin: theme.spacing(4),
    },
    submit: {
      margin: theme.spacing(2),
    },
  }));