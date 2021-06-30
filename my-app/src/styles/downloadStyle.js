import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));