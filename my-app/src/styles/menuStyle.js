import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      margin: '0',
    },
    icon: {
      backgroundColor: theme.palette.primary.grey,
    }
}));