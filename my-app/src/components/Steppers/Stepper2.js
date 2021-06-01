import { 
    Button,
    Fab,
    Grid, 
    Typography 
} from "@material-ui/core"

import Exercises from "../Exercise/Exercise"

import {
    Add
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';

export default function Stepper2( props ) {
    const classes = useStyles();

    return (
        <div>
            <Grid container component="main" >
                <Grid item  xs={12} sm={6}>
                    <Grid container>
                        <Grid item>
                            <Typography 
                                component="h1" 
                                variant="h5"
                            >
                            Choose the exercises for your test
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                    { 
                        props.exercises.map((ex) => 
                            <Exercises 
                                value={ex.id}
                                key={ex.id}
                                category={ex.category}
                                title={ex.title}
                                nr={ex.nr}
                                exercises={props.selectableExercises}
                                categories={props.categories}
                                handleChange={props.handleChange}
                                handleDelete={props.handleDelete}
                            />
                    )}
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Fab
                                component="button"
                                className={classes.submit}
                                onClick={props.handleAdd}
                            >
                            <Add /> 
                            </Fab>
                        </Grid>
                    </Grid>
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
                    Next
                </Button>
            </div>
        </div>
    )
}