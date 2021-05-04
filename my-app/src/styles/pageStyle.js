import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(5),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    title: {
      margin: theme.spacing(3),
    },
    avatar: {
      margin: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(2),
    },
  }));