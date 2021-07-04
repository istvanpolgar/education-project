import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    text: {
        margin: theme.spacing(2,2,2,0),
    },
    input: {
        margin: theme.spacing(0),
    },
    dateinput: {
        margin: theme.spacing(2,0),
    }
  }));