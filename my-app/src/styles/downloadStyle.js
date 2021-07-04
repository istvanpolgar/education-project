import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(15,5,5,5),
    },
    submit: {
        margin: theme.spacing(2),
    },
}));