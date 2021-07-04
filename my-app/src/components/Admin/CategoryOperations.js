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

    const handleDelete = async (e) => {
        e.preventDefault();

        const data = {
            "category": e.target.value,
        }

        const res = await handleFetch(data, '/deletecategory', 'POST', 'application/json');
        
        if(res.code)
        {
            props.setMessage(res.message);
            props.setOpen(true);
        }
        props.setCategories(props.categories.filter( cat => cat.title !== e.target.value ));
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const data = {
            "category": e.target.value,
        }

        const res = await handleFetch(data, '/addcategory', 'POST', 'application/json');

        if(res.code)
        {
            props.setMessage(res.message);
            props.setOpen(true);
        }
        else
            props.setCategories(...props.categories, e.target.value);
    }

    if(props.categories){
        return(
            <div className={classes.root}>
                <Grid container spacing={1} direction='column'>
                    <Grid item>
                        <form>
                            <Grid container spacing={1} direction='column'>
                                <Grid item>
                                    <InputLabel htmlFor="cat_group"> Category </InputLabel>
                                    <Select 
                                        native 
                                        name="categories1"
                                        id="cat_group"
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
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                        onClick={handleDelete}
                                    >
                                        Delete category
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item>
                        <form
                            onSubmit={handleAdd}
                            noValidate
                        >
                            <Grid container spacing={1} direction='column'>
                                <Grid container spacing={2} >
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
                                            id='category'
                                            label='Category'
                                            name='category'
                                            autoComplete='Category'
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Add category
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </div>
)}}