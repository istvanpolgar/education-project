import { makeStyles } from '@material-ui/core/styles';
import Image from '../pictures/math2.jpg';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    },
    text: {
        margin: theme.spacing(4,5,4,15),
        fontFamily: [
            '"Akaya Kanadaka"',
            'cursive',
          ].join(','),
    },
    paper: {
        position: 'absolute',
        width: '80%',
        left: '10%',
        top: '20%',
    },
}));