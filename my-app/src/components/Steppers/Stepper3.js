import { 
    Grid,
    Fab,
} from "@material-ui/core";
import FormElement from "../FormElement/FormElement";
import {
    ArrowForward,
    ArrowBack
} from '@material-ui/icons';
import { useStyles } from '../../styles/pageStyle';

export default function Stepper3( props ) {
    const classes = useStyles();

    return (
        <div>
            <Grid 
                container
                direction="column"  
            >
                <Grid item>
                    <FormElement 
                        title='Number of tests: ' 
                        label='Number' 
                        id='number'
                        type='number'
                        handleChange={props.handleChange}
                    />
                    <FormElement 
                        title='Test title: ' 
                        label='Title' 
                        id='title'
                        handleChange={props.handleChange}
                    />
                    <FormElement 
                        title='Class: ' 
                        label='Class' 
                        id='class'
                        handleChange={props.handleChange}
                    />
                    <FormElement 
                        title='Description: ' 
                        label='Description' 
                        id='description'
                        handleChange={props.handleChange}
                    />
                    <FormElement 
                        title='Date: ' 
                        label='Date' 
                        id='date' 
                        type='date'
                        handleChange={props.handleChange}
                    />
                    <FormElement 
                        title='Begining: ' 
                        label='Begin' 
                        id='begin' 
                        type='time'
                        handleChange={props.handleChange}
                    />
                    <FormElement 
                        title='Ending: ' 
                        label='End' 
                        id='end' 
                        type='time'
                        handleChange={props.handleChange}
                    />
                </Grid>
                <Grid item>
                    <Fab
                        component="button"
                        onClick={props.handleBack} 
                        className={classes.button}
                        size="large"
                    >
                        <ArrowBack />
                    </Fab>
                    <Fab
                        component="button"
                        onClick={props.handleNext}
                        className={classes.submit}
                        size="large"
                    >
                        <ArrowForward /> 
                    </Fab>
                </Grid>
            </Grid>
    </div>
    )
}