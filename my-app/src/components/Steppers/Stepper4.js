import { 
    Button,
    Fab,
    Typography 
} from "@material-ui/core";

import {
    Send
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';

export default function Stepper4( props ) {
    const classes = useStyles();

    return (
        <div>
        <Typography 
            component="h1" 
            variant="h5"
        >
            Your test is waiting for generation! Pleas click the SEND button!
        </Typography>
        <Button 
            disabled={props.activeStep === 0} 
            onClick={props.handleBack} 
            className={classes.button}
        >
            Back
        </Button>
        <Button 
            variant="contained"
            color="primary"
            disabled={props.activeStep === 4}
            onClick={props.handleReset} 
            className={classes.button}
        >
            Reset
        </Button>
        <Fab
            component="button"
            className={classes.submit}
            onClick={props.handleSubmit}
        >
            <Send /> 
        </Fab>
    </div>
    )
}