import { makeStyles } from '@material-ui/core/styles';
import Image from '../pictures/math.jpg';

export const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(5),
      textAlign: 'center',
      height: '100vh',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
      backgroundImage: `url(${Image})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    avatar: {
      margin: theme.spacing(2),
      backgroundColor: theme.palette.primary.grey,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    text: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  }));