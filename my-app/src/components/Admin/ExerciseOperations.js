import {  
    InputLabel,
    Grid,
    Select,
    Button,
    TextField,
    Typography
} from '@material-ui/core';

import { useStyles } from '../../styles/adminStyle';
import { handleFetch } from '../../functions/handleFetch';

export default function ExerciseOperations( props ) {
    const classes = useStyles();

    const handleDelete = async (e) => {
        e.preventDefault();
        
    }

    const handleAdd = async (e, ex) => {
        e.preventDefault();

        
    }

    if(props.categories){
        return(
            <div className={classes.root}>
                <Grid container spacing={1} direction='column'>
                    <Grid item>
                        <form>
                            <Grid container spacing={1} direction='column'>
                                <Grid item>
                                    <InputLabel htmlFor="cat_group3"> Category </InputLabel>
                                    <Select 
                                        native 
                                        name="categories3"
                                        id="cat_group3"
                                        onChange={props.handleChange}
                                    >
                                        <option aria-label="None" value="" />
                                        { 
                                            props.categories.map((catTip,i) => (
                                                <option key={i} value={catTip}>{catTip}</option>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <InputLabel htmlFor="ex_group1"> Exercise </InputLabel>
                                    <Select 
                                        native 
                                        name="exercises3"
                                        id="ex_group1"
                                    >
                                        <option aria-label="None" value="" />
                                        { 
                                            props.selectable_exercises.map((ex,i) => (
                                                <option key={i} value={ex}>{ex}</option>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                        onClick={handleDelete}
                                    >
                                        Delete exercise
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item>
                        <form>
                            <Grid container spacing={1} direction='column'>
                                <Grid item>
                                    <InputLabel htmlFor="cat_group4"> Category </InputLabel>
                                    <Select 
                                        native 
                                        name="categories4"
                                        id="cat_group4"
                                    >
                                        <option aria-label="None" value="" />
                                        { 
                                            props.categories.map((catTip,i) => (
                                                <option key={i} value={catTip}>{catTip}</option>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid container spacing={2} >
                                    <Grid item>
                                        <Typography
                                            component="h1" 
                                            variant="h6"
                                            className={classes.text}
                                        >
                                           Exercise: 
                                        </Typography>
                                    </Grid>
                                    <Grid item>   
                                        <TextField
                                            required
                                            id='exercise'
                                            label='Exercise'
                                            name='exercise'
                                            autoComplete='Exercise'
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                        onClick={handleAdd}
                                    >
                                        Add exercise
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </div>
)}}