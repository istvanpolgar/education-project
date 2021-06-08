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

    const onChange = e => {
        e.persist();
        if(e.target.name === "title")
            props.handleChange(props.value, {title: e.target.value, category: activeCategories[e.target.selectedIndex]});
        if(e.target.name === "nr")
            props.handleChange(props.value, {nr : e.target.value});
    }

    let deletableExercises = [...props.exercises];
    props.categories.map( (cat) => {
        deletableExercises = deletableExercises.filter(ex => ex.title === cat.title);
    });

    let activeExercises = [...props.exercises];
    deletableExercises.map( (cat) => {
        activeExercises = activeExercises.filter(ex => ex.title === cat.title);
    });

    let activeCategories = [];
    activeExercises.map((cat) => {
        cat.tips.map(()=> {
            activeCategories.push(cat.title);
        });      
    });

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
                            onChange={onChange}
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
                            onChange={onChange}
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