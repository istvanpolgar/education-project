import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    icon: {
      backgroundColor: theme.palette.primary.grey,
    }
}));