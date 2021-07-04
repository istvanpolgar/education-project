import { 
    Fab,
    Grid, 
} from "@material-ui/core"

import Exercises from "../Exercise/Exercise"

import {
    Add,
    ArrowForward,
    ArrowBack
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';

export default function Stepper2( props ) {
    const classes = useStyles();

    return (
        <div>
            <Grid container direction="column">
                <Grid 
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"
                    >
                    <Grid item>
                    { 
                        props.exercises.map((ex) => 
                            <Exercises 
                                value={ex.id}
                                key={ex.id}
                                title={ex.title}
                                nr={ex.nr}
                                exercises={props.selectableExercises}
                                categories={props.categories}
                                handleChange={props.handleChange}
                                handleDelete={props.handleDelete}
                            />
                    )}
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="flex-end"
                            alignItems="flex-start">
                            <Grid item>
                                <Fab
                                    component="button"
                                    className={classes.submit}
                                    onClick={props.handleAdd}
                                    size="small"
                                >
                                    <Add /> 
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
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