import { 
    Button,
    Fab,
    Grid, 
    Typography 
} from "@material-ui/core";
import FormElement from "../FormElement/FormElement";

import {
    Send
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';

export default function Stepper3( props ) {
    const classes = useStyles();

    return (
        <div>
        <Typography 
            component="h1" 
            variant="h5"
        >
            Your test is waiting for generation! Pleas click the SEND button!
        </Typography>
        <Grid container component="main" >
            <Grid item xs={12} sm={6}>
            <FormElement 
                title='Test title: ' 
                label='Title' 
                id='title'
                parentCallback={props.handlePropsCallback}
            />
            <FormElement 
                title='Class: ' 
                label='Class' 
                id='class'
                parentCallback={props.handlePropsCallback}
            />
            <FormElement 
                title='Description: ' 
                label='Description' 
                id='description'
                parentCallback={props.handlePropsCallback}
            />
            <FormElement 
                title='Date: ' 
                label='Date' 
                id='date' 
                type='date'
                parentCallback={props.handlePropsCallback}
            />
            <FormElement 
                title='Begining: ' 
                label='Begin' 
                id='begin' 
                type='time'
                parentCallback={props.handlePropsCallback}
            />
            <FormElement 
                title='Ending: ' 
                label='End' 
                id='end' 
                type='time'
                parentCallback={props.handlePropsCallback}
            />
            </Grid>
        </Grid>
        <div>
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
                disabled={props.activeStep === 3}
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
    </div>
    )
}