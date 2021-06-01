import { useEffect, useState } from 'react';

import {  
    FormControl,
    InputLabel,
    TextField, 
    Select,
    Grid,
    Fab 
} from '@material-ui/core';

import {
    Cancel
} from '@material-ui/icons';

import { useStyles } from '../../styles/pageStyle';

export default function Exercises( props ) {
    const classes = useStyles();

    const onClick = () => {
        props.handleDelete(props.value);
    }   

    let activeExercises = [...props.exercises];
    props.categories.map( (cat) => {
        activeExercises = activeExercises.filter(ex => ex.title === cat.title);
    });
    console.log(activeExercises);

    if(!props.exercises)
        return <div> Oupsssss!!!! </div>;
    return(
        <>
            <FormControl>
                <Grid container spacing={3}>
                    <Grid item>
                        <InputLabel htmlFor="ex_group"> Exercise </InputLabel>
                        <Select 
                            native 
                            onChange={
                                e => { 
                                    props.handleChange(props.value, e.target.value);
                            }}
                            name="title"
                            value={props.title}
                            id="ex_group"
                        >
                            <option aria-label="None" value="" />
                            {
                                activeExercises.map((exTip,i) => (
                                    <optgroup key={i} label={exTip.title}> 
                                    {
                                        exTip.tips.map((ex,j) => (
                                            <option key={i*10+j} value={ex.name}>{ex.name}</option>
                                        ))
                                    }
                                    </optgroup>
                                ))
                            } 
                        </Select>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="ex_nr"
                            onChange={
                                e => { 
                                    props.handleChange(props.value, e.target.value);
                            }}
                            label="Number"
                            type="number"
                            name="nr"
                            value={props.nr}
                            inputProps= {{ min:0, max:100 }}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            component="button"
                            className={classes.submit}
                            onClick={onClick}
                            size="small"
                        >
                            <Cancel /> 
                        </Fab>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}