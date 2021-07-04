import {  
    FormControl,
    InputLabel,
    Select,
    Grid,
    Fab,
} from '@material-ui/core';

import {
    ClearRounded,
  } from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';

export default function Category( props ) {
    const classes = useStyles();
    const onClick = () => {
        props.handleDelete(props.value);
    }   
    let selectabeOptions = props.categories;

    if(props.title)
    {
        selectabeOptions = [...props.categories, props.title];
    }

    if(props.categories){
        return(
            <div>
                <FormControl>
                    <Grid 
                        container 
                        direction="row" 
                        spacing={2}
                    >
                        <Grid item>
                            <InputLabel htmlFor="cat_group"> Category </InputLabel>
                            <Select 
                                native 
                                required
                                name="title"
                                value={props.title}
                                id="cat_group"
                                onChange={e => { props.handleChange(props.value, e.target.value) }}
                            >
                                <option aria-label="None" value="" />
                                { 
                                    selectabeOptions.map((catTip,i) => (
                                        <option key={i} value={catTip}>{catTip}</option>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item>
                            <Fab
                                component="button"
                                className={classes.submit}
                                onClick={onClick}
                                size="small"
                            >
                                <ClearRounded /> 
                            </Fab>
                        </Grid>
                    </Grid>
                </FormControl>
            </div>
)}}