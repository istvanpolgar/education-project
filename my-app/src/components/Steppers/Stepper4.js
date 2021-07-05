import { 
    Grid,
    Fab,
    Typography 
} from "@material-ui/core";

import {
    Send,
    ArrowBack,
    Restore,
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';

export default function Stepper4( props ) {
    const classes = useStyles();

    return (
        <div>
            <Grid 
                container
                direction="column"  
            >
                <Grid item>
                    <Typography 
                        component="h1" 
                        variant="h2"
                    >
                        Your test is waiting for generation!
                    </Typography>
                </Grid>
                <Grid container spacing={2} className={classes.body}>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography 
                                component="h1" 
                                color="primary"
                                className={classes.text}
                                variant="h5"
                            >
                                Step back if you can fix something
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Fab
                                component="button"
                                onClick={props.handleBack} 
                                className={classes.submit}
                                size="large"
                            >
                                <ArrowBack />
                            </Fab>
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography 
                                component="h1" 
                                color="primary"
                                className={classes.text}
                                variant="h5"
                            >
                                Start again
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Fab
                                component="button"
                                onClick={props.handleReset} 
                                className={classes.submit}
                                size="large"
                            >
                                <Restore /> 
                            </Fab>
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography 
                                component="h1" 
                                color="primary"
                                className={classes.text}
                                variant="h5"
                            >
                                Start test generation
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Fab
                                component="button"
                                className={classes.submit}
                                onClick={props.handleSubmit}
                            >
                                <Send /> 
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}