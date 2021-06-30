import { 
    Button,
    Fab,
    Grid
} from "@material-ui/core";

import Category from "../Category/Category";

import {
    Add
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';

export default function Stepper1( props ) {
    const classes = useStyles();

    return (
        <div>
            <Grid container component="main" >
                <Grid item  xs={12} sm={6}>
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
                    <Grid container spacing={2}>
                        <Grid item>
                            <Fab
                                component="button"
                                disabled={!props.selectableCategories.length}
                                className={classes.submit}
                                onClick={props.handleAdd}
                            >
                                <Add /> 
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={props.handleNext}
                className={classes.button}
            >
                Next
            </Button>
        </div>
    )
}