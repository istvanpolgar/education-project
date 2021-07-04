import { 
    Fab,
    Grid,
} from "@material-ui/core";

import Category from "../Category/Category";

import {
    Add,
    ArrowForward,
} from '@material-ui/icons';
import { useStyles } from '../../styles/pageStyle';

export default function Stepper1( props ) {
    const classes = useStyles();

    return (
        <div>
            <Grid 
                container 
                direction="column"
            >
                <Grid 
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"
                    >
                    <Grid item>
                    {   
                        props.categories.map( (cat) => 
                            <Category 
                                token={props.token}
                                value={cat.id}
                                title={cat.title}
                                key={cat.id}
                                categories={props.selectableCategories}
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
                                    disabled={!props.selectableCategories.length}
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