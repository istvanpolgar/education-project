import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    text: {
        margin: theme.spacing(2.5),
    },
    input: {
        margin: theme.spacing(0.5),
    },
    datetext: {
        margin: theme.spacing(2.5),
    },
    dateinput: {
        margin: theme.spacing(2),
    },
  }));