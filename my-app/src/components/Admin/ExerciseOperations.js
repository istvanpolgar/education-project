import { 
    useState 
} from 'react';
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
    const [addExercise, setAddExercise] = useState();
    const [delExercise, setDelExercise] = useState();
    const [addCategory, setAddCategory] = useState();
    const [delCategory, setDelCategory] = useState();

    const handleDelete = async (e) => {
        e.preventDefault();
        e.target.reset();
        
        const data = {
            'category': delCategory,
            'exercise': delExercise
        }

        const res = await handleFetch(data, '/deleteexercise', 'POST', 'application/json');

        if(res.code)
        {
            props.setMessage(res.message);
            props.setOpen(true);
        }

        props.setChange(!props.change);
    }

    const handleAdd = async (e, ex) => {
        e.preventDefault();
        e.target.reset();
        
        const data = {
            'category': addCategory,
            'exercise': addExercise
        }

        const res = await handleFetch(data, '/addexercise', 'POST', 'application/json');

        if(res.code)
        {
            props.setMessage(res.message);
            props.setOpen(true);
        }
        props.setChange(!props.change);
    }

    if(props.categories){
        return(
            <div className={classes.root}>
                <Grid 
                    container 
                    spacing={2} 
                    direction='column'>
                    <form 
                        onSubmit={handleAdd} 
                    >
                        <Typography
                            component="h1" 
                            variant="h5"
                            className={classes.title}
                        >
                            Add an exercise
                        </Typography>
                        <Grid item>
                            <Grid 
                            container 
                            spacing={2} 
                            direction='column'>
                                <Grid item>
                                    <InputLabel htmlFor="cat_group4"> Category </InputLabel>
                                    <Select 
                                        native 
                                        fullWidth
                                        name="categories4"
                                        id="cat_group4"
                                        onChange={e => { setAddCategory(props.categories[e.target.selectedIndex-1]) }}
                                    >
                                        <option aria-label="None" value="" />
                                        { 
                                            props.categories.map((catTip,i) => (
                                                <option key={i} value={catTip}>{catTip}</option>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid container>
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
                                            fullWidth
                                            id='exercise'
                                            label='Exercise'
                                            name='exercise'
                                            autoComplete='Exercise'
                                            onChange={e => { setAddExercise(e.target.value) }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Add exercise
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                    <form 
                        onSubmit={handleDelete} 
                    >
                        <Typography
                            component="h1" 
                            variant="h5"
                            className={classes.title}
                        >
                            Delete an exercise
                        </Typography>
                        <Grid item>
                            <Grid 
                            container 
                            direction='column'
                            spacing={2}>
                                <Grid item>
                                    <InputLabel htmlFor="cat_group3"> Category </InputLabel>
                                    <Select 
                                        native 
                                        fullWidth
                                        name="categories3"
                                        id="cat_group3"
                                        onChange={e => { 
                                            setDelCategory(e.target.value);
                                            props.handleChange(e.target.value);
                                        }}
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
                                        fullWidth
                                        name="exercises3"
                                        id="ex_group1"
                                        onChange={e => { setDelExercise(e.target.value) }}
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
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Delete exercise
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </div>
)}}