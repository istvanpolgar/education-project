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
import { handleFetch } from '../../functions/adminFetch';

export default function CategoryOperations( props ) {
    const classes = useStyles();
    const [addCategory, setAddCategory] = useState();
    const [delCategory, setDelCategory] = useState();

    const handleDelete = async (e) => {
        e.preventDefault();
        e.target.reset();

        const data = {
            'category': delCategory,
        }

        const res = await handleFetch(data, '/deletecategory', 'POST', 'application/json');
        
        if(res.code)
        {
            props.setMessage(res.message);
            props.setOpen(true);
        }
        props.setChange(!props.change);
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        e.target.reset();
        
        const data = {
            'category': addCategory
        }

        const res = await handleFetch(data, '/addcategory', 'POST', 'application/json');

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
                            Add a category 
                        </Typography>
                        <Grid item>
                            <Grid 
                                container 
                                spacing={2} 
                                direction='column'>
                                <Grid container>
                                    <Grid item>
                                        <Typography
                                            component="h1" 
                                            variant="h6"
                                            className={classes.text}
                                        >
                                            Category: 
                                        </Typography>
                                    </Grid>
                                    <Grid item>   
                                        <TextField
                                            required
                                            fullWidth
                                            id='category'
                                            label='Category'
                                            name='category'
                                            autoComplete='Category'
                                            onChange={ e => { setAddCategory(e.target.value) }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Add category
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
                            Delete a category 
                        </Typography>
                        <Grid item>
                            <Grid 
                                container 
                                direction='column'>
                                <Grid item>
                                    <InputLabel htmlFor="cat_group"> Category </InputLabel>
                                    <Select 
                                        native 
                                        fullWidth
                                        name="categories1"
                                        id="cat_group"
                                        onChange={ e => { setDelCategory(e.target.value)}}
                                    >
                                        <option aria-label="None" value="" />
                                        { 
                                            props.categories.map((catTip,i) => (
                                                <option key={i} value={catTip}>{catTip}</option>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Delete category
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </div>
)}}