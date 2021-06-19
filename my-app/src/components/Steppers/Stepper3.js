import { 
    Button,
    Grid,
} from "@material-ui/core";
import FormElement from "../FormElement/FormElement";

import { useStyles } from '../../styles/pageStyle';

export default function Stepper3( props ) {
    const classes = useStyles();

    return (
        <div>
            <Grid container component="main" >
                <Grid item xs={12} sm={6}>
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
                onClick={props.handleNext}
                className={classes.button}
            >
                Finish
            </Button>
        </div>
    </div>
    )
}